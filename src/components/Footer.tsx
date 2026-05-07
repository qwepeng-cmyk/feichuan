'use client';

import React from 'react';
import DesktopFooter from './pc/DesktopFooter';
import MobileFooter from './mobile/MobileFooter';

export default function Footer({ locale }: { locale: string }) {
    return (
        <>
            <div className="pc_only">
                <DesktopFooter locale={locale} />
            </div>

            <div className="mobile_only">
                <MobileFooter locale={locale} />
            </div>
        </>
    );
}
