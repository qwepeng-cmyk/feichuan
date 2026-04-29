import React from 'react';
import { getAllProducts } from '@/lib/products';
import DesktopProductCenter from '@/components/pc/DesktopProductCenter';
import MobileProductCenter from '@/components/mobile/MobileProductCenter';

export default async function ProductCenterPage() {
    const categoriesData = await getAllProducts();

    return (
        <>
            {/* Critical CSS for flickering prevention */}
            <style dangerouslySetInnerHTML={{ __html: `
                .mobile_only { display: none !important; }
                .pc_only { display: block !important; }
                @media (max-width: 991px) {
                    .mobile_only { display: block !important; }
                    .pc_only { display: none !important; }
                }
            `}} />

            <div className="pc_only">
                <DesktopProductCenter categoriesData={categoriesData} />
            </div>

            <div className="mobile_only">
                <MobileProductCenter categoriesData={categoriesData} />
            </div>
        </>
    );
}
