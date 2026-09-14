import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import db from '@/lib/db';

export default async function AdminCasePreview({ params }: { params: { handle: string } }) {
  const item = await db.prepare('SELECT * FROM cases WHERE handle = ?').get(params.handle) as any;
  if (!item) notFound();

  const images = parseJson(item.case_images, []);

  return (
    <PreviewShell title={item.title_en} editHref={`/admin/cases/${item.handle}`} layer="Preview">
      <PreviewImage src={item.main_image} alt={item.title_en} />
      <PreviewSection title="Region">{[item.region_en, item.country_en].filter(Boolean).join(' / ') || '-'}</PreviewSection>
      <PreviewSection title="Description"><div style={{ whiteSpace: 'pre-wrap' }}>{item.description_en || '-'}</div></PreviewSection>
      <PreviewSection title="Devices"><div style={{ whiteSpace: 'pre-wrap' }}>{item.devices_en || '-'}</div></PreviewSection>
      <PreviewSection title="Gallery">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
          {images.map((src: string) => <img key={src} src={src} alt="" style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '8px' }} />)}
        </div>
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
