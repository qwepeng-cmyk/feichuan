import { notFound } from 'next/navigation';
import { getSolutionById, getAllSolutionHandles } from '@/lib/solutions';
import SolutionDetailClient from './SolutionDetailClient';

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

  return <SolutionDetailClient solution={solution} />;
}
