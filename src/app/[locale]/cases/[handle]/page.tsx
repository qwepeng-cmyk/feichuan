import { notFound } from 'next/navigation';
import Link from 'next/link';
export const revalidate = 3600;
import { getCaseByHandle, getAllCaseHandles } from '@/lib/cases';
import { getProductByHandle } from '@/lib/products';
import UniversalGallery from '@/components/common/UniversalGallery';
import InPageNav from '@/components/products/InPageNav';
import ProductGridCard from '@/components/products/ProductGridCard';
import MobileCaseDetail from '@/components/mobile/MobileCaseDetail';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import dynamic from 'next/dynamic';

const InquiryForm = dynamic(() => import('@/components/products/InquiryForm'), {
  ssr: true,
  loading: () => <div style={{ minHeight: '400px', background: '#f8fafc' }} />
});

export async function generateStaticParams() {
  const handles = await getAllCaseHandles();
  return handles.map((handle) => ({
    handle,
  }));
}

export default async function CaseDetailPage({ params }: { params: { handle: string; locale: Locale } }) {
  const { handle, locale } = params;
  const caseData = await getCaseByHandle(handle);
  const dict = await getDictionary(locale);

  if (!caseData) {
    notFound();
  }

  // Localized field selection
  const title = caseData[`title_${locale}`] || caseData.title_en;
  const description = caseData[`description_${locale}`] || caseData.description_en;
  
  let devices = [];
  try {
      const rawDevices = caseData[`devices_${locale}`] || caseData.devices_en;
      devices = typeof rawDevices === 'string' ? JSON.parse(rawDevices) : (rawDevices || []);
  } catch (e) {
      devices = [];
  }

  let recommendedProductHandles = [];
  try {
      recommendedProductHandles = typeof caseData.recommended_product_handles === 'string' 
        ? JSON.parse(caseData.recommended_product_handles) 
        : (caseData.recommendedProductHandles || []);
  } catch(e) {
      recommendedProductHandles = [];
  }

  // 获取关联产品数据
  const recommendedProducts = [];
  if (recommendedProductHandles) {
    for (const h of recommendedProductHandles) {
      const prod = await getProductByHandle(h);
      if (prod) {
        recommendedProducts.push({
          ...prod,
          name: locale === 'ru' && prod.product_name_ru ? prod.product_name_ru : (prod.product_name_en || prod.product_name),
          handle: prod.handle || h,
          image: prod.main_image || '/images/placeholder.jpg'
        });
      }
    }
  }

  // 解析并合并所有图片传给画廊组件
  let extraImages = [];
  try {
      if (typeof caseData.case_images === 'string' && caseData.case_images.startsWith('[')) {
          extraImages = JSON.parse(caseData.case_images);
      } else if (Array.isArray(caseData.case_images)) {
          extraImages = caseData.case_images;
      } else if (caseData.case_images) {
          extraImages = [caseData.case_images];
      }
  } catch (e) {
      console.error("Failed to parse case_images:", e);
      extraImages = [];
  }
  
  // Option A: If we have extra images, use them as the gallery. 
  // Otherwise fall back to the main_image.
  const galleryImages = (extraImages && extraImages.length > 0) 
    ? extraImages.filter(Boolean)
    : [caseData.main_image].filter(Boolean);

  // 次级导航
  const navItems = [
    { id: 'overview', label: dict.products.overview },
    { id: 'products', label: dict.products.relatedEquipment || 'Related Equipment' },
    { id: 'inquiry', label: dict.nav.contact },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .mobile_only { display: none !important; }
        .pc_only { display: block !important; }
        @media (max-width: 991px) {
          .mobile_only { display: block !important; }
          .pc_only { display: none !important; }
        }
      `}} />

      <div className="pc_only">
        <div className="product-detail-page" style={{ paddingTop: '112px' }}>
          <main>
            {/* 1. 面包屑导航 */}
            <div className="product-breadcrumb-nav">
              <div className="container">
                <div className="breadcrumb-path">
                  <Link href={`/${locale}`}>{dict.nav.home}</Link> &gt; <Link href={`/${locale}/cases`}>{dict.nav.cases}</Link> &gt; {title}
                </div>
              </div>
            </div>

            {/* 2. 主图与右侧文字 */}
            <section id="overview" className="product-hero" style={{ padding: '40px 0 20px', background: '#fff' }}>
              <div className="container">
                <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
                  
                  <div className="gallery-main-area">
                    <UniversalGallery images={galleryImages} />
                  </div>

                  <div className="product-info">
                    <h1 style={{ fontSize: '4.8rem', fontWeight: '900', marginBottom: '20px', lineHeight: '1.1', color: '#333' }}>
                      {title}
                    </h1>

                    {/* Equipment (设备清单) */}
                    <div className="drone-specs" style={{ marginBottom: '40px' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#315ba4', marginBottom: '15px' }}>
                        {dict.cases?.equipmentUsed || 'Equipment Used'}:
                      </div>
                      {devices && devices.map((device: string, idx: number) => (
                        <div key={idx} style={{ fontSize: '1.8rem', color: '#525a66', marginBottom: '8px', lineHeight: '1.4', display: 'flex', alignItems: 'center' }}>
                          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#ff9800', marginRight: '10px' }}></span>
                          {device}
                        </div>
                      ))}
                    </div>

                    {/* 操作按钮 */}
                    <div className="cta-group" style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                      <a href="#inquiry" className="btn-cta" style={{ background: '#ff9800', color: '#fff', borderRadius: '4px', textTransform: 'none', fontSize: '2rem', flex: 1, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', fontWeight: '700', textDecoration: 'none' }}>
                        {dict.products.getQuotation}
                      </a>
                      <a href="https://wa.me/+8613761974616" className="btn-cta" style={{ background: '#ff9800', color: '#fff', borderRadius: '4px', textTransform: 'none', fontSize: '2rem', flex: 1, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', fontWeight: '700', textDecoration: 'none' }}>
                        {dict.products.whatsapp}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. 正文段落 (案例详细描述) */}
            <section className="product-intro-section" style={{ padding: '60px 0', background: '#fff' }}>
              <div className="container">
                <div className="product-intro-text" style={{ fontSize: '1.8rem', color: '#444', lineHeight: '1.8', borderTop: '1px solid #eee', paddingTop: '40px' }}>
                  {description && description.split('\n').map((paragraph: string, idx: number) => (
                    paragraph.trim() ? <p key={idx} style={{ marginBottom: '20px' }}>{paragraph}</p> : null
                  ))}
                </div>
              </div>
            </section>

            {/* 3.5 次导航 */}
            <InPageNav items={navItems} />

            {/* 4. 关联产品 */}
            {recommendedProducts.length > 0 && (
              <section id="products" className="detail-section" style={{ padding: '100px 0', backgroundColor: '#f4f7fa' }}>
                <div className="container">
                  <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }}>{dict.products.relatedEquipment || 'Related Equipment'}</h2>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                    gap: '30px' 
                  }}>
                    {recommendedProducts.map((product, idx) => (
                      <ProductGridCard key={idx} product={product} locale={locale} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 5. 公用表单模块 */}
            <section id="inquiry" className="detail-section alt">
              <div className="container" style={{ maxWidth: '1200px' }}>
                <InquiryForm dict={dict} />
              </div>
            </section>
          </main>
        </div>
      </div>

      <div className="mobile_only">
        <MobileCaseDetail 
            caseData={caseData} 
            recommendedProducts={recommendedProducts} 
            locale={locale}
            dict={dict}
        />
      </div>
    </>
  );
}
