import fs from 'fs';
import path from 'path';
import CategoryLandingClient from './CategoryLandingClient';
import { getAllProducts } from '@/lib/products';
import categoryLandingData from '@/lib/categoryLandingData';

interface SolutionJson {
  product_name: string;
  product_name_en: string;
  summary: string;
  summary_en: string;
  key_parameter_1: string;
  key_parameter_1_en: string;
  key_parameter_2: string;
  key_parameter_2_en: string;
  main_image: string;
  handle: string;
  detail_html_en?: string;
  parameters_en?: Record<string, string>;
}

// Valid category IDs for static generation
const VALID_CATEGORIES = [
  '01_BorderPatrol',
  '02_InfrastructureProtection',
  '03_KeyAreaSecurity',
  '04_EmergencyRescue',
];

export function generateStaticParams() {
  return VALID_CATEGORIES.map((id) => ({ categoryId: id }));
}

export default async function CategoryLandingPage({ params }: { params: { categoryId: string } }) {
  const { categoryId } = params;

  // Read all JSON files from the corresponding data directory
  const dataDir = path.join(process.cwd(), '网站资料', '08方案概括', categoryId);
  let subSolutions: SolutionJson[] = [];

  try {
    const files = fs.readdirSync(dataDir).filter((f: string) => f.endsWith('.json'));
    subSolutions = files.map((file: string) => {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
      return JSON.parse(content) as SolutionJson;
    });
  } catch (e) {
    console.error(`Failed to read solutions for category ${categoryId}:`, e);
  }

  // Fetch Recommended Products
  const productsByCategory = await getAllProducts();
  const allProducts = Object.values(productsByCategory).flat();
  const landingData = categoryLandingData[categoryId];
  const recommendedHandles = landingData?.recommendedProductHandles || [];

  const recommendedProducts = allProducts.filter(p => recommendedHandles.includes(p.handle));

  return (
    <CategoryLandingClient 
      categoryId={categoryId} 
      subSolutions={subSolutions} 
      recommendedProducts={recommendedProducts} 
    />
  );
}
