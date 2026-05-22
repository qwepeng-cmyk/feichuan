import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db from '@/lib/db';
import {
  ComplianceContentType,
  ComplianceTier,
  getBaselineComplianceRules,
} from '@/lib/complianceTaxonomy';

const CONTENT_TYPES: ComplianceContentType[] = ['product', 'solution', 'case', 'media'];
const TIERS: ComplianceTier[] = ['normal', 'neutral_seo', 'restricted'];

export async function GET() {
  try {
    const terms = db.prepare(`
      SELECT id, term, replacement, locale, severity, is_enabled, note, updated_at
      FROM compliance_terms
      ORDER BY is_enabled DESC, severity DESC, term ASC
    `).all();

    const rules = buildRuleRows();
    const summary = rules.reduce(
      (acc: Record<string, number>, item: any) => {
        acc[item.effective_tier] = (acc[item.effective_tier] || 0) + 1;
        return acc;
      },
      { normal: 0, neutral_seo: 0, restricted: 0 }
    );

    return NextResponse.json({ success: true, data: { terms, rules, summary } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch compliance config' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.action === 'term') {
      const term = String(body.term || '').trim();
      if (!term) {
        return NextResponse.json({ success: false, error: 'Term is required' }, { status: 400 });
      }

      db.prepare(`
        INSERT INTO compliance_terms (term, replacement, locale, severity, is_enabled, note, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(term) DO UPDATE SET
          replacement = excluded.replacement,
          locale = excluded.locale,
          severity = excluded.severity,
          is_enabled = excluded.is_enabled,
          note = excluded.note,
          updated_at = CURRENT_TIMESTAMP
      `).run(
        term,
        String(body.replacement || ''),
        String(body.locale || 'all'),
        String(body.severity || 'restricted'),
        body.is_enabled === 0 || body.is_enabled === false ? 0 : 1,
        body.note ? String(body.note) : ''
      );

      revalidateComplianceTags();
      return NextResponse.json({ success: true });
    }

    if (body.action === 'rule') {
      return upsertRule(body);
    }

    return NextResponse.json({ success: false, error: 'Unsupported action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Save failed' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    if (body.action === 'term') {
      const id = Number(body.id);
      if (!id) {
        return NextResponse.json({ success: false, error: 'Term id is required' }, { status: 400 });
      }

      db.prepare(`
        UPDATE compliance_terms
        SET term = ?, replacement = ?, locale = ?, severity = ?, is_enabled = ?, note = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(
        String(body.term || '').trim(),
        String(body.replacement || ''),
        String(body.locale || 'all'),
        String(body.severity || 'restricted'),
        body.is_enabled === 0 || body.is_enabled === false ? 0 : 1,
        body.note ? String(body.note) : '',
        id
      );

      revalidateComplianceTags();
      return NextResponse.json({ success: true });
    }

    if (body.action === 'rule') {
      return upsertRule(body);
    }

    return NextResponse.json({ success: false, error: 'Unsupported action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));
    if (!id) {
      return NextResponse.json({ success: false, error: 'Term id is required' }, { status: 400 });
    }

    db.prepare('DELETE FROM compliance_terms WHERE id = ?').run(id);
    revalidateComplianceTags();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
  }
}

function upsertRule(body: any) {
  const contentType = body.content_type as ComplianceContentType;
  const handle = String(body.handle || '').trim();
  const tier = body.tier as ComplianceTier;

  if (!CONTENT_TYPES.includes(contentType) || !handle || !TIERS.includes(tier)) {
    return NextResponse.json({ success: false, error: 'Invalid rule' }, { status: 400 });
  }

  db.prepare(`
    INSERT INTO compliance_content_rules (content_type, handle, tier, note, updated_at)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(content_type, handle) DO UPDATE SET
      tier = excluded.tier,
      note = excluded.note,
      updated_at = CURRENT_TIMESTAMP
  `).run(contentType, handle, tier, body.note ? String(body.note) : '');

  revalidateComplianceTags();
  return NextResponse.json({ success: true });
}

function buildRuleRows() {
  const baseline = getBaselineComplianceRules();
  const overrides = db.prepare(`
    SELECT content_type, handle, tier, note, updated_at
    FROM compliance_content_rules
  `).all() as any[];
  const overrideMap = new Map(overrides.map(item => [`${item.content_type}:${item.handle}`, item]));

  const rows = [
    ...readContentRows('product', 'products', 'handle', 'product_name_en'),
    ...readContentRows('solution', 'solutions', 'handle', 'product_name_en'),
    ...readContentRows('case', 'cases', 'handle', 'title_en'),
    ...readContentRows('media', 'media', 'id', 'title'),
  ];

  return rows.map((item) => {
    const contentType = item.content_type as ComplianceContentType;
    const baselineTier = baseline[contentType]?.[item.handle] || 'normal';
    const override = overrideMap.get(`${item.content_type}:${item.handle}`);
    return {
      ...item,
      baseline_tier: baselineTier,
      override_tier: override?.tier || '',
      effective_tier: override?.tier || baselineTier,
      note: override?.note || '',
      updated_at: override?.updated_at || '',
    };
  });
}

function readContentRows(contentType: ComplianceContentType, table: string, handleColumn: string, titleColumn: string) {
  return db.prepare(`
    SELECT ? AS content_type, ${handleColumn} AS handle, ${titleColumn} AS title, COALESCE(is_published, 1) AS is_published
    FROM ${table}
    ORDER BY ${handleColumn} ASC
  `).all(contentType) as any[];
}

function revalidateComplianceTags() {
  revalidateTag('products');
  revalidateTag('solutions');
  revalidateTag('cases');
  revalidateTag('media');
}
