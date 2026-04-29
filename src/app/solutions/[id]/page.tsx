import { notFound } from 'next/navigation';
import { getSolutionById, getAllSolutionHandles } from '@/lib/solutions';
import { getAllProducts } from '@/lib/products';
import SolutionDetailClient from './SolutionDetailClient';
import MobileSolutionDetail from '@/components/mobile/MobileSolutionDetail';

export async function generateStaticParams() {
  const handles = await getAllSolutionHandles();
  return handles.map((id) => ({
    id,
  }));
}

export default async function SolutionDetailPage({ params }: { params: { id: string } }) {
  const solution = await getSolutionById(params.id);

  if (!solution) {
    notFound();
  }

  // Fetch Recommended Products
  const productsByCategory = await getAllProducts();
  const allProducts = Object.values(productsByCategory).flat();
  const recommendedHandles = solution.recommended_products || [];

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
        <SolutionDetailClient solution={solution} recommendedProducts={recommendedProducts} />
      </div>

      <div className="mobile_only">
        <MobileSolutionDetail solution={solution} recommendedProducts={recommendedProducts} />
      </div>
    </>
  );
}

