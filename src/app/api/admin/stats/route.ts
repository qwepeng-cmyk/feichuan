import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const productsCount = await db.prepare('SELECT COUNT(*) as count FROM products').get() as any;
        const solutionsCount = await db.prepare('SELECT COUNT(*) as count FROM solutions').get() as any;
        const casesCount = await db.prepare('SELECT COUNT(*) as count FROM cases').get() as any;
        const mediaCount = await db.prepare('SELECT COUNT(*) as count FROM media').get() as any;
        const inquiriesCount = await db.prepare('SELECT COUNT(*) as count FROM inquiries').get() as any;
        const unreadInquiriesCount = await db.prepare('SELECT COUNT(*) as count FROM inquiries WHERE is_read = 0').get() as any;

        return NextResponse.json({
            success: true,
            data: {
                products: Number(productsCount.count),
                solutions: Number(solutionsCount.count),
                cases: Number(casesCount.count),
                media: Number(mediaCount.count),
                inquiries: Number(inquiriesCount.count),
                unreadInquiries: Number(unreadInquiriesCount.count)
            }
        }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
            },
        });
    } catch (e) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch stats' },
            {
                status: 500,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                },
            }
        );
    }
}
