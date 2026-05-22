import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import db from '@/lib/db';
import { getComplianceLayer, getComplianceTier } from '@/lib/complianceTaxonomy';

export default function AdminMediaPreview({ params }: { params: { id: string } }) {
  const article = db.prepare('SELECT * FROM media WHERE id = ?').get(params.id) as any;
  if (!article) notFound();

  const tier = getComplianceTier('media', article.id);
  const layer = getComplianceLayer(tier);

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '32px 20px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ color: '#64748b', fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>后台内部预览 · {layer.label}</div>
          <h1 style={{ margin: 0, color: '#0f172a', fontSize: '2.6rem', lineHeight: 1.2 }}>{article.title}</h1>
          <div style={{ marginTop: '10px', color: '#64748b', fontSize: '1.25rem' }}>{article.category} · {article.date}</div>
        </div>
        <Link href={`/admin/media/${article.id}`} style={{ padding: '10px 16px', borderRadius: '8px', background: '#2563eb', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>Edit</Link>
      </div>
      <article style={{ background: '#fff', border: '1px solid #e8ecf1', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
        {article.image && <img src={article.image} alt={article.title} style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', borderRadius: '10px', marginBottom: '24px' }} />}
        <div style={{ color: '#334155', fontSize: '1.35rem', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: article.content || '<p>-</p>' }} />
      </article>
    </div>
  );
}
