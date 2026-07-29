import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import CategoryLandingClient from './CategoryLandingClient';
import { getAllProducts } from '@/lib/products';
import { getAllSolutions } from '@/lib/solutions';
import categoryLandingData from '@/lib/categoryLandingData';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { buildSeoMetadata } from '@/lib/seoMetadata';
import { localizedField } from '@/lib/localization';

interface SolutionJson {
  product_name: string;
  product_name_ru: string;
  summary: string;
  summary_ru: string;
  key_parameter_1: string;
  key_parameter_1_ru: string;
  key_parameter_2: string;
  key_parameter_2_ru: string;
  main_image: string;
  handle: string;
  detail_html_ru?: string;
  parameters_ru?: Record<string, string>;
}

const VALID_CATEGORIES = [
  '02_InfrastructureProtection',
  '03_KeyAreaSecurity',
];

export function generateStaticParams() {
  return VALID_CATEGORIES.map((id) => ({ categoryId: id }));
}

export function generateMetadata({ params }: { params: { categoryId: string; locale: Locale } }): Metadata {
  const landingData = categoryLandingData[params.categoryId];
  if (!landingData) return {};
  const title = localizedField(landingData as any, 'name', params.locale) || params.categoryId.replace(/^\d+_/, '').replace(/([a-z])([A-Z])/g, '$1 $2');

  return buildSeoMetadata({
    locale: params.locale,
    path: `/solutions/category/${params.categoryId}`,
    fallbackTitle: title,
    fallbackDescription: localizedField(landingData as any, 'industryNeeds', params.locale),
    indexable: false,
  });
}

async function CategoryLandingWrapper({ categoryId, locale, dict }: { categoryId: string; locale: Locale; dict: any }) {
  // Read all JSON files from the corresponding data directory
  const dataDir = path.join(process.cwd(), 'src', 'data', 'solutionCategories', categoryId);
  let subSolutions: SolutionJson[] = [];

  try {
    const files = fs.readdirSync(dataDir).filter((f: string) => f.endsWith('.json'));
    subSolutions = files.map((file: string) => {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
      return JSON.parse(content) as SolutionJson;
    });
  } catch (e) {
    subSolutions = [];
  }

  const localizedSolutions = await getAllSolutions();
  const localizedByHandle = new Map(localizedSolutions.map((solution) => [solution.handle, solution]));
  subSolutions = subSolutions.map((solution) => {
    const localized = localizedByHandle.get(solution.handle);
    if (!localized) return solution;
    return {
      ...solution,
      product_name_ru: localized.product_name_ru || solution.product_name_ru,
      summary_ru: localized.summary_ru || solution.summary_ru,
    };
  });

  // Fetch Recommended Products
  const productsByCategory = await getAllProducts(locale);
  const allProducts = Object.values(productsByCategory).flat();
  const landingData = categoryLandingData[categoryId];
  const recommendedHandles = landingData?.recommendedProductHandles || [];
  const recommendedProducts = allProducts.filter(p => recommendedHandles.includes(p.handle));

  return (
    <CategoryLandingClient 
      categoryId={categoryId} 
      landingData={landingData}
      subSolutions={subSolutions} 
      recommendedProducts={recommendedProducts} 
      locale={locale}
      dict={dict}
    />
  );
}

export default async function CategoryLandingPage({ params }: { params: { categoryId: string; locale: Locale } }) {
  const { categoryId, locale } = params;
  if (!VALID_CATEGORIES.includes(categoryId)) notFound();
  const dict = await getDictionary(locale);

  return (
    <Suspense fallback={
        <div style={{ padding: '20px 15px' }}>
            <div style={{ height: '180px', backgroundColor: '#f0f0f0', marginBottom: '30px' }} />
            {[1, 2].map(i => (
                <div key={i} style={{ marginBottom: '30px', backgroundColor: '#fff', border: '1px solid #eee' }}>
                    <div style={{ paddingTop: '56.25%', backgroundColor: '#f5f5f5' }} />
                    <div style={{ padding: '20px' }}>
                        <div style={{ height: '24px', backgroundColor: '#f0f0f0', width: '60%', marginBottom: '15px' }} />
                        <div style={{ height: '16px', backgroundColor: '#f5f5f5', width: '90%' }} />
                    </div>
                </div>
            ))}
        </div>
    }>
        <CategoryLandingWrapper categoryId={categoryId} locale={locale} dict={dict} />
    </Suspense>
  );
}
