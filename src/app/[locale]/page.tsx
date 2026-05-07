'use client';

import React from 'react';
import DesktopHome from '@/components/pc/DesktopHome';
import MobileHome from '@/components/mobile/MobileHome';

export default function Page() {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                .pc_only { display: block !important; }
                .mobile_only { display: none !important; }

                @media (max-width: 991px) {
                    .pc_only { display: none !important; }
                    .mobile_only { display: block !important; }
                }
            `}} />

            <div className="pc_only">
                <DesktopHome />
            </div>

            <div className="mobile_only">
                <MobileHome />
            </div>
        </>
    );
}
