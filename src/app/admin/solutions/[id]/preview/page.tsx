import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import db from '@/lib/db';

export default async function AdminSolutionPreview({ params }: { params: { id: string } }) {
  const solution = await db.prepare('SELECT * FROM solutions WHERE handle = ?').get(params.id) as any;
  if (!solution) notFound();

  const parameters = parseJson(solution.parameters_en, {});

  return (
    <PreviewShell title={solution.product_name_en} editHref={`/admin/solutions/${solution.handle}`} layer="Preview">
      <PreviewImage src={solution.main_image} alt={solution.product_name_en} />
      <PreviewSection title="Category">{solution.category_name || '-'}</PreviewSection>
      <PreviewSection title="Summary">{solution.summary_en || '-'}</PreviewSection>
      <PreviewSection title="Key Application">{solution.key_application_en || '-'}</PreviewSection>
      <PreviewSection title="Technical Parameters">
        <pre style={preStyle}>{JSON.stringify(parameters, null, 2)}</pre>
      </PreviewSection>
      <PreviewSection title="Detail HTML">
        <div style={richStyle} dangerouslySetInnerHTML={{ __html: solution.detail_html_en || '<p>-</p>' }} />
      </PreviewSection>
    </PreviewShell>
  );
}

function parseJson(value: string, fallback: any) {
  try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
}

function PreviewShell({ title, editHref, layer, children }: { title: string; editHref: string; layer: string; children: React.ReactNode }) {
  return <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '32px 20px 80px' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px' }}><div><div style={{ color: '#64748b', fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>后台内部预览 · {layer}</div><h1 style={{ margin: 0, color: '#0f172a', fontSize: '2.6rem', lineHeight: 1.2 }}>{title}</h1></div><Link href={editHref} style={{ padding: '10px 16px', borderRadius: '8px', background: '#2563eb', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>Edit</Link></div><div style={{ background: '#fff', border: '1px solid #e8ecf1', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>{children}</div></div>;
}

function PreviewImage({ src, alt }: { src?: string; alt: string }) {
  if (!src) return null;
  return <img src={src} alt={alt} style={{ width: '100%', maxHeight: '420px', objectFit: 'contain', background: '#f8fafc', borderRadius: '10px', marginBottom: '24px' }} />;
}

function PreviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section style={{ borderTop: '1px solid #eef2f7', paddingTop: '18px', marginTop: '18px' }}><h2 style={{ margin: '0 0 10px', color: '#1e293b', fontSize: '1.6rem' }}>{title}</h2><div style={{ color: '#334155', fontSize: '1.35rem', lineHeight: 1.7 }}>{children}</div></section>;
}

const preStyle: React.CSSProperties = { whiteSpace: 'pre-wrap', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' };
const richStyle: React.CSSProperties = { color: '#334155', lineHeight: 1.7 };
