import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getSolutionById, getAllSolutionHandles } from '@/lib/solutions';
import { getAllProducts } from '@/lib/products';
import SolutionDetailClient from './SolutionDetailClient';
import MobileSolutionDetail from '@/components/mobile/MobileSolutionDetail';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';

export async function generateStaticParams() {
  const handles = await getAllSolutionHandles();
  return handles.map((id) => ({
    id,
  }));
}

async function SolutionDetailContent({ id, locale, dict }: { id: string; locale: Locale; dict: any }) {
  const solution = await getSolutionById(id);
  if (!solution) {
    notFound();
  }

  // Fetch Recommended Products
  const productsByCategory = await getAllProducts(locale);
  const allProducts = Object.values(productsByCategory).flat();
  
  let recommendedHandles = [];
  try {
      recommendedHandles = typeof solution.recommended_products === 'string' 
        ? JSON.parse(solution.recommended_products) 
        : (solution.recommended_products || []);
  } catch(e) {
      recommendedHandles = [];
  }

  const recommendedProducts = allProducts.filter(p => recommendedHandles.includes(p.handle));

  return (
    <>
      <div className="pc_only">
        <SolutionDetailClient 
            solution={solution} 
            recommendedProducts={recommendedProducts} 
            locale={locale}
            dict={dict}
        />
      </div>

      <div className="mobile_only">
        <MobileSolutionDetail 
            solution={solution} 
            recommendedProducts={recommendedProducts} 
            locale={locale}
            dict={dict}
        />
      </div>
    </>
  );
}

export default async function SolutionDetailPage({ params }: { params: { id: string; locale: Locale } }) {
  const { id, locale } = params;
  const dict = await getDictionary(locale);

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
        <div style={{ padding: '150px 0', textAlign: 'center', opacity: 0.5 }}>
          <div style={{ width: '50px', height: '50px', border: '3px solid #f3f3f3', borderTop: '3px solid #315ba4', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
          <style dangerouslySetInnerHTML={{ __html: '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }' }} />
        </div>
      }>
        <SolutionDetailContent id={id} locale={locale} dict={dict} />
      </Suspense>
    </>
  );
}

