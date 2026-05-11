'use client';

import React from 'react';
import DesktopFooter from './pc/DesktopFooter';
import MobileFooter from './mobile/MobileFooter';

export default function Footer({ locale, dict }: { locale: string; dict: any }) {
    return (
        <>
            <div className="pc_only">
                <DesktopFooter locale={locale} dict={dict} />
            </div>

            <div className="mobile_only">
                <MobileFooter locale={locale} dict={dict} />
            </div>
        </>
    );
}
