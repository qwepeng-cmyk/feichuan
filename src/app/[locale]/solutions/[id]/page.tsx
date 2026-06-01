import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSolutionById, getAllSolutionHandles } from '@/lib/solutions';
import { getAllProducts } from '@/lib/products';
import { getCaseByHandle } from '@/lib/cases';
import SolutionDetailClient from './SolutionDetailClient';
import MobileSolutionDetail from '@/components/mobile/MobileSolutionDetail';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import JsonLd from '@/components/seo/JsonLd';
import { pageUrl, serviceJsonLd } from '@/lib/structuredData';
import { solutionCenterImageByHandle } from '@/lib/solutionCenterGroups';

export async function generateStaticParams() {
  const handles = await getAllSolutionHandles();
  return handles.map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string; locale: Locale } }): Promise<Metadata> {
  const solution = await getSolutionById(params.id);
  if (!solution) return {};

  const title = solution[`product_name_${params.locale}`] || solution.product_name_en || solution.title_en;
  const description = solution[`summary_${params.locale}`] || solution.summary_en || undefined;
  const canonical = params.locale === 'en' ? `/solutions/${params.id}` : `/${params.locale}/solutions/${params.id}`;
  const mainImage = solutionCenterImageByHandle[solution.handle || params.id] || solution.main_image;
  const image = mainImage ? new URL(mainImage, 'https://n-tet.com').toString() : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: image ? [{ url: image, alt: title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

// 1. Data Fetching Component (Streaming)
async function SolutionDetailContent({ id, locale }: { id: string; locale: Locale }) {
  const dict = await getDictionary(locale);
  const solution = await getSolutionById(id);
  if (!solution) {
    notFound();
  }

  const displaySolution = {
    ...solution,
    main_image: solutionCenterImageByHandle[solution.handle || id] || solution.main_image,
  };

  // Fetch Recommended Products
  const productsByCategory = await getAllProducts(locale);
  const allProducts = Object.values(productsByCategory).flat();
  const title = solution[`product_name_${locale}`] || solution.product_name_en || solution.title_en;
  const summary = solution[`summary_${locale}`] || solution.summary_en;
  const jsonLd = serviceJsonLd({
    locale,
    handle: id,
    name: title,
    description: summary,
    image: solution.main_image,
    serviceType: solution.category_name || solution.category_id,
    breadcrumbs: [
      { name: dict.nav.home, url: pageUrl(locale, '/') },
      { name: dict.nav.solutions, url: pageUrl(locale, '/solutions') },
      { name: title, url: pageUrl(locale, `/solutions/${id}`) },
    ],
  });
  
  let recommendedHandles = [];
  try {
      recommendedHandles = typeof solution.recommended_products === 'string' 
        ? JSON.parse(solution.recommended_products) 
        : (solution.recommended_products || []);
  } catch(e) {
      recommendedHandles = [];
  }

  const recommendedProducts = allProducts.filter(p => recommendedHandles.includes(p.handle));

  let recommendedCaseHandles: string[] = [];
  try {
      const rawJson = typeof solution.raw_json === 'string' ? JSON.parse(solution.raw_json) : (solution.raw_json || {});
      const rawCases = solution.recommended_cases || rawJson.recommended_cases || rawJson.detail_sections?.related_cases || [];
      recommendedCaseHandles = Array.isArray(rawCases)
        ? rawCases.filter((item: unknown): item is string => typeof item === 'string')
        : [];
  } catch(e) {
      recommendedCaseHandles = [];
  }

  const recommendedCases = [];
  for (const caseHandle of Array.from(new Set(recommendedCaseHandles))) {
    const item = await getCaseByHandle(caseHandle);
    if (item) {
      recommendedCases.push({
        ...item,
        title: item[`title_${locale}`] || item.title_en || item.title || caseHandle,
        image: item.main_image || item.image || '/images/solutions/placeholder.jpg',
      });
    }
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="pc_only">
            <SolutionDetailClient
            solution={displaySolution}
            recommendedProducts={recommendedProducts} 
            recommendedCases={recommendedCases}
            locale={locale}
            dict={dict}
        />
      </div>

      <div className="mobile_only">
        <MobileSolutionDetail
            solution={displaySolution}
            recommendedProducts={recommendedProducts} 
            recommendedCases={recommendedCases}
            locale={locale}
            dict={dict}
        />
      </div>
    </>
  );
}

// 2. Entry Page Component (Instant Navigation)
export default async function SolutionDetailPage({ params }: { params: { id: string; locale: Locale } }) {
  const { id, locale } = params;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .mobile_only { display: none !important; }
        .pc_only { display: block !important; }
        @media (max-width: 991px) {
          .mobile_only { display: block !important; }
          .pc_only { display: none !important; }
        }
      `}} />

      <Suspense fallback={
        <div style={{ paddingTop: '112px', minHeight: '100vh', backgroundColor: '#fff' }}>
            <div className="container" style={{ padding: '40px 15px' }}>
                <div style={{ height: '50px', backgroundColor: '#f0f0f0', width: '60%', marginBottom: '30px' }} />
                <div style={{ width: '100%', height: '300px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '40px' }} />
                <div style={{ height: '20px', backgroundColor: '#f5f5f5', width: '90%', marginBottom: '15px' }} />
                <div style={{ height: '20px', backgroundColor: '#f5f5f5', width: '80%', marginBottom: '15px' }} />
            </div>
        </div>
      }>
        <SolutionDetailContent id={id} locale={locale} />
      </Suspense>
    </>
  );
}
