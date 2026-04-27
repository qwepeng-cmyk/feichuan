import React from 'react';
import { notFound } from 'next/navigation';
import { getCaseByHandle, getAllCaseHandles } from '@/lib/cases';
import { getProductByHandle } from '@/lib/products';
import UniversalGallery from '@/components/common/UniversalGallery';
import InPageNav from '@/components/products/InPageNav';
import InquiryForm from '@/components/products/InquiryForm';
import ProductGridCard from '@/components/products/ProductGridCard';

export async function generateStaticParams() {
  const handles = await getAllCaseHandles();
  return handles.map((handle) => ({
    handle,
  }));
}

export default async function CaseDetailPage({ params }: { params: { handle: string } }) {
  const caseData = await getCaseByHandle(params.handle);

  if (!caseData) {
    notFound();
  }

  // 获取关联产品数据
  const recommendedProducts = [];
  if (caseData.recommendedProductHandles) {
    for (const handle of caseData.recommendedProductHandles) {
      const prod = await getProductByHandle(handle);
      if (prod) {
        recommendedProducts.push({
          name: prod.product_name_en || prod.product_name,
          handle: prod.handle || handle,
          image: prod.main_image || '/images/placeholder.jpg'
        });
      }
    }
  }

  // 合并所有图片传给画廊组件（主图 + 其他图片）
  const galleryImages = [caseData.main_image, ...(caseData.case_images || [])].filter(Boolean);

  // 次级导航
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'products', label: 'Related Equipment' },
    { id: 'inquiry', label: 'Get Quotation' },
  ];

  return (
    <div className="product-detail-page" style={{ paddingTop: '112px' }}>
      <main>
        {/* 1. 面包屑导航 */}
        <div className="product-breadcrumb-nav">
          <div className="container">
            <div className="breadcrumb-path">
              <a href="/">Home</a> &gt; <a href="/cases">Cases</a> &gt; {caseData.title_en}
            </div>
          </div>
        </div>

        {/* 2. 主图与右侧文字 (对齐 Product 和 Solution) */}
        <section id="overview" className="product-hero" style={{ padding: '40px 0 20px', background: '#fff' }}>
          <div className="container">
            <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
              
              <div className="gallery-main-area">
                <UniversalGallery images={galleryImages} />
              </div>

              <div className="product-info">
                <h1 style={{ fontSize: '4.8rem', fontWeight: '900', marginBottom: '20px', lineHeight: '1.1', color: '#333' }}>
                  {caseData.title_en}
                </h1>

                {/* Equipment (设备清单) */}
                <div className="drone-specs" style={{ marginBottom: '40px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#315ba4', marginBottom: '15px' }}>
                    Equipment Used:
                  </div>
                  {caseData.devices_en && caseData.devices_en.map((device: string, idx: number) => (
                    <div key={idx} style={{ fontSize: '1.8rem', color: '#525a66', marginBottom: '8px', lineHeight: '1.4', display: 'flex', alignItems: 'center' }}>
                      <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#ff9800', marginRight: '10px' }}></span>
                      {device}
                    </div>
                  ))}
                </div>

                {/* 操作按钮 */}
                <div className="cta-group" style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                  <a href="#inquiry" className="btn-cta" style={{ background: '#ff9800', color: '#fff', borderRadius: '4px', textTransform: 'none', fontSize: '2rem', flex: 1, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', fontWeight: '700', textDecoration: 'none' }}>
                    Get quotation
                  </a>
                  <a href="https://wa.me/+8613761974616" className="btn-cta" style={{ background: '#ff9800', color: '#fff', borderRadius: '4px', textTransform: 'none', fontSize: '2rem', flex: 1, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', fontWeight: '700', textDecoration: 'none' }}>
                    WhatsApp
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
              {caseData.description_en && caseData.description_en.split('\n').map((paragraph: string, idx: number) => (
                paragraph.trim() ? <p key={idx} style={{ marginBottom: '20px' }}>{paragraph}</p> : null
              ))}
            </div>
          </div>
        </section>

        {/* 3.5 次导航 (与产品页一致) */}
        <InPageNav items={navItems} />

        {/* 4. 关联产品 (与 Solution 页面样式完全一致) */}
        {recommendedProducts.length > 0 && (
          <section id="products" className="detail-section" style={{ padding: '100px 0', backgroundColor: '#f4f7fa' }}>
            <div className="container">
              <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }}>Related Equipment</h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '30px' 
              }}>
                {recommendedProducts.map((product, idx) => (
                  <ProductGridCard key={idx} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. 公用表单模块 */}
        <section id="inquiry" className="detail-section alt">
          <div className="container" style={{ maxWidth: '1200px' }}>
            <InquiryForm />
          </div>
        </section>

      </main>
    </div>
  );
}
