'use client';

import React from 'react';
import DesktopHeader from './pc/DesktopHeader';
import MobileHeader from './mobile/MobileHeader';

export default function Header({ locale, dict }: { locale: string; dict: any }) {
    return (
        <>
            {/* 这里的样式会直接注入 HTML，比任何外部 CSS 都快 */}
            <style dangerouslySetInnerHTML={{ __html: `
                .pc_only_container { display: block !important; }
                .mobile_only_container { display: none !important; }

                @media (max-width: 991px) {
                    .pc_only_container { display: none !important; }
                    .mobile_only_container { display: block !important; }
                }
            `}} />

            <div className="pc_only_container">
                <DesktopHeader locale={locale} dict={dict} />
            </div>

            <div className="mobile_only_container">
                <MobileHeader locale={locale} dict={dict} />
            </div>
        </>
    );
}
