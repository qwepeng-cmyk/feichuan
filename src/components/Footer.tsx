'use client';

import React from 'react';
import DesktopFooter from './pc/DesktopFooter';
import MobileFooter from './mobile/MobileFooter';
import type { ProductCategoryId } from '@/lib/productCategoryVisibility';

export default function Footer({
    locale,
    dict,
    visibleProductCategoryIds
}: {
    locale: string;
    dict: any;
    visibleProductCategoryIds?: ProductCategoryId[];
}) {
    return (
        <>
            <div className="pc_only">
                <DesktopFooter locale={locale} dict={dict} visibleProductCategoryIds={visibleProductCategoryIds} />
            </div>

            <div className="mobile_only">
                <MobileFooter locale={locale} dict={dict} visibleProductCategoryIds={visibleProductCategoryIds} />
            </div>
        </>
    );
}
