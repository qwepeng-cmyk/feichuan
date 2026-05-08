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

export default async function SolutionDetailPage({ params }: { params: { id: string; locale: Locale } }) {
  const { id, locale } = params;
  const solution = await getSolutionById(id);
  const dict = await getDictionary(locale);

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
      <style dangerouslySetInnerHTML={{ __html: `
        .mobile_only { display: none !important; }
        .pc_only { display: block !important; }
        @media (max-width: 991px) {
          .mobile_only { display: block !important; }
          .pc_only { display: none !important; }
        }
      `}} />

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

