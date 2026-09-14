import { handleContactLeadPost } from '@/lib/contactLeadSubmission';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
  return handleContactLeadPost(request);
}
