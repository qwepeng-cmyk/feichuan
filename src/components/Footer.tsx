'use client';

import React from 'react';
import DesktopFooter from './pc/DesktopFooter';
import MobileFooter from './mobile/MobileFooter';

export default function Footer() {
    return (
        <>
            <div className="pc_only">
                <DesktopFooter />
            </div>

            <div className="mobile_only">
                <MobileFooter />
            </div>
        </>
    );
}
