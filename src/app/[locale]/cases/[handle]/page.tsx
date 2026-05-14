import { notFound } from 'next/navigation';
import Link from 'next/link';
import React, { Suspense } from 'react';
export const revalidate = 3600;
import { getCaseByHandle, getAllCaseHandles } from '@/lib/cases';
import MobileCaseDetail from '@/components/mobile/MobileCaseDetail';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import OptimizedRichText from '@/components/common/OptimizedRichText';

export async function generateStaticParams() {
  const handles = await getAllCaseHandles();
  return handles.map((handle) => ({
    handle,
  }));
}

// 1. Data Fetching Component (Streaming)
async function CaseDetailContent({ handle, locale }: { handle: string; locale: Locale }) {
  const dict = await getDictionary(locale);
  const caseData = await getCaseByHandle(handle);

  if (!caseData) {
    notFound();
  }

  const name = caseData[`title_${locale}`] || caseData.title_en || caseData.title;
  const description = caseData[`description_${locale}`] || caseData.description_en || caseData.description;
  const detailHtml = caseData[`detail_html_${locale}`] || caseData.detail_html_en || caseData.detail_html;
  const descriptionParagraphs = typeof description === 'string'
    ? description.split('\n').filter((paragraph: string) => paragraph.trim())
    : [];

  return (
    <>
      <div className="pc_only">
        <div className="case-detail-page" style={{ paddingTop: '112px' }}>
          <main>
            <div className="product-breadcrumb-nav" style={{ borderBottom: '1px solid #f0f0f0', padding: '15px 0' }}>
              <div className="container">
                <div className="breadcrumb-path" style={{ fontSize: '1.4rem', color: '#666' }}>
                  <Link href={`/${locale}`} style={{ color: '#315ba4', textDecoration: 'none' }}>{dict.nav.home}</Link> &gt; <Link href={`/${locale}/cases`} style={{ color: '#315ba4', textDecoration: 'none' }}>{dict.nav.cases}</Link> &gt; {name}
                </div>
              </div>
            </div>

            <section className="case-hero" style={{ padding: '60px 0', background: '#fff' }}>
              <div className="container">
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                  <h1 style={{ fontSize: '4.2rem', fontWeight: 900, color: '#333', marginBottom: '30px', lineHeight: 1.2 }}>{name}</h1>
                  <div style={{ fontSize: '1.8rem', color: '#666', lineHeight: 1.8, marginBottom: '40px', paddingLeft: '20px', borderLeft: '4px solid #315ba4' }}>
                    {descriptionParagraphs.length > 0
                      ? descriptionParagraphs.map((paragraph: string, idx: number) => (
                          <p key={idx} style={{ margin: idx === descriptionParagraphs.length - 1 ? 0 : '0 0 12px' }}>{paragraph}</p>
                        ))
                      : description}
                  </div>

                  {caseData.image && (
                    <div style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                      <img src={caseData.image} alt={name} style={{ width: '100%', display: 'block' }} />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {detailHtml && (
              <section className="case-content" style={{ padding: '80px 0', background: '#f8fafc' }}>
                <div className="container">
                  <div style={{ maxWidth: '1000px', margin: '0 auto', background: '#fff', padding: '60px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <OptimizedRichText className="rich-content" html={detailHtml} />
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      <div className="mobile_only">
        <MobileCaseDetail caseData={caseData} recommendedProducts={[]} locale={locale} dict={dict} />
      </div>
    </>
  );
}

// 2. Entry Page Component (Instant Navigation)
export default async function CaseDetailPage({ params }: { params: { handle: string; locale: Locale } }) {
  const { handle, locale } = params;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .mobile_only { display: none !important; }
        .pc_only { display: block !important; }
        @media (max-width: 991px) {
          .mobile_only { display: block !important; }
          .pc_only { display: none !important; }
        }
      `}} />

      <Suspense fallback={
        <div style={{ paddingTop: '112px', minHeight: '100vh', backgroundColor: '#fff' }}>
          <div className="container" style={{ padding: '60px 15px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              {/* Title Skeleton */}
              <div style={{ height: '50px', backgroundColor: '#f0f0f0', width: '80%', marginBottom: '30px' }} />
              {/* Desc Skeleton */}
              <div style={{ height: '24px', backgroundColor: '#f5f5f5', width: '100%', marginBottom: '15px' }} />
              <div style={{ height: '24px', backgroundColor: '#f5f5f5', width: '90%', marginBottom: '40px' }} />
              {/* Image Skeleton */}
              <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#f5f5f5', borderRadius: '8px' }} />
            </div>
          </div>
        </div>
      }>
        <CaseDetailContent handle={handle} locale={locale} />
      </Suspense>
    </>
  );
}
