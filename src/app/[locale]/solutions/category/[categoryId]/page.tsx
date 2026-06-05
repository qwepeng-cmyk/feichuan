import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import CategoryLandingClient from './CategoryLandingClient';
import { getAllProducts } from '@/lib/products';
import categoryLandingData from '@/lib/categoryLandingData';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import {
  getComplianceTier,
  isPublicComplianceContent,
  sanitizeRecordForTier,
  sanitizeComplianceValue,
} from '@/lib/complianceTaxonomy';
import { buildSeoMetadata } from '@/lib/seoMetadata';
import { localizedField } from '@/lib/localization';

interface SolutionJson {
  product_name: string;
  product_name_en: string;
  product_name_ru: string;
  product_name_es?: string;
  summary: string;
  summary_en: string;
  summary_ru: string;
  summary_es?: string;
  key_parameter_1: string;
  key_parameter_1_en: string;
  key_parameter_1_ru: string;
  key_parameter_2: string;
  key_parameter_2_en: string;
  key_parameter_2_ru: string;
  main_image: string;
  handle: string;
  detail_html_en?: string;
  detail_html_ru?: string;
  detail_html_es?: string;
  parameters_en?: Record<string, string>;
  parameters_ru?: Record<string, string>;
  parameters_es?: Record<string, string>;
}

const VALID_CATEGORIES = [
  '01_BorderPatrol',
  '02_InfrastructureProtection',
  '03_KeyAreaSecurity',
  '04_EmergencyRescue',
];

export function generateStaticParams() {
  return VALID_CATEGORIES.map((id) => ({ categoryId: id }));
}

export function generateMetadata({ params }: { params: { categoryId: string; locale: Locale } }): Metadata {
  const landingData = categoryLandingData[params.categoryId];
  const title = localizedField(landingData as any, 'name', params.locale) || params.categoryId.replace(/^\d+_/, '').replace(/([a-z])([A-Z])/g, '$1 $2');

  return buildSeoMetadata({
    locale: params.locale,
    path: `/solutions/category/${params.categoryId}`,
    fallbackTitle: title,
    fallbackDescription: localizedField(landingData as any, 'industryNeeds', params.locale),
  });
}

async function CategoryLandingWrapper({ categoryId, locale, dict }: { categoryId: string; locale: Locale; dict: any }) {
  // Read all JSON files from the corresponding data directory
  const dataDir = path.join(process.cwd(), '网站资料', '08方案概括', categoryId);
  let subSolutions: SolutionJson[] = [];

  try {
    const files = fs.readdirSync(dataDir).filter((f: string) => f.endsWith('.json'));
    subSolutions = files.map((file: string) => {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
      return JSON.parse(content) as SolutionJson;
    })
      .filter((solution) => isPublicComplianceContent('solution', solution.handle))
      .map((solution) => sanitizeRecordForTier(solution, getComplianceTier('solution', solution.handle)));
  } catch (e) {
    subSolutions = [];
  }

  // Fetch Recommended Products
  const productsByCategory = await getAllProducts(locale);
  const allProducts = Object.values(productsByCategory).flat();
  const landingData = categoryLandingData[categoryId];
  const sanitizedLandingData = landingData ? sanitizeComplianceValue(landingData) : undefined;
  const recommendedHandles = landingData?.recommendedProductHandles || [];
  const recommendedProducts = allProducts.filter(p => recommendedHandles.includes(p.handle));

  return (
    <CategoryLandingClient 
      categoryId={categoryId} 
      landingData={sanitizedLandingData}
      subSolutions={subSolutions} 
      recommendedProducts={recommendedProducts} 
      locale={locale}
      dict={dict}
    />
  );
}

export default async function CategoryLandingPage({ params }: { params: { categoryId: string; locale: Locale } }) {
  const { categoryId, locale } = params;
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
