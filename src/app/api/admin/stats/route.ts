import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const productsCount = db.prepare('SELECT COUNT(*) as count FROM products').get() as any;
        const solutionsCount = db.prepare('SELECT COUNT(*) as count FROM solutions').get() as any;
        const casesCount = db.prepare('SELECT COUNT(*) as count FROM cases').get() as any;
        const mediaCount = db.prepare('SELECT COUNT(*) as count FROM media').get() as any;
        const inquiriesCount = db.prepare('SELECT COUNT(*) as count FROM inquiries').get() as any;
        const unreadInquiriesCount = db.prepare('SELECT COUNT(*) as count FROM inquiries WHERE is_read = 0').get() as any;

        return NextResponse.json({
            success: true,
            data: {
                products: productsCount.count,
                solutions: solutionsCount.count,
                cases: casesCount.count,
                media: mediaCount.count,
                inquiries: inquiriesCount.count,
                unreadInquiries: unreadInquiriesCount.count
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
