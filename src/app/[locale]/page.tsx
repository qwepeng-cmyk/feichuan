import React from 'react';
import DesktopHome from '@/components/pc/DesktopHome';
import MobileHome from '@/components/mobile/MobileHome';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';

export default async function Page({ params }: { params: { locale: Locale } }) {
    const { locale } = params;
    const dict = await getDictionary(locale);

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
                <DesktopHome locale={locale} dict={dict} />
            </div>

            <div className="mobile_only">
                <MobileHome locale={locale} dict={dict} />
            </div>
        </>
    );
}
