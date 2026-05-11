import React from 'react';
import { getAllProducts } from '@/lib/products';
import DesktopProductCenter from '@/components/pc/DesktopProductCenter';
import MobileProductCenter from '@/components/mobile/MobileProductCenter';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';

export default async function ProductCenterPage({ params }: { params: { locale: Locale } }) {
    const { locale } = params;
    const categoriesData = await getAllProducts(locale);
    const dict = await getDictionary(locale);

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
                <DesktopProductCenter categoriesData={categoriesData} locale={locale} dict={dict} />
            </div>

            <div className="mobile_only">
                <MobileProductCenter categoriesData={categoriesData} locale={locale} dict={dict} />
            </div>
        </>
    );
}
