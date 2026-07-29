import React from 'react';
import Image from 'next/image';

const solutions = [
  {
    title: 'Border Patrol & Security',
    titleCn: 'Border Patrol',
    mainImg: '/solutions/index_solution/border-patrol-coastal-monitoring.webp',
    parts: ['/products/aerial-systems/FC-YJZC-01-Emergency-Reconnaissance-Platform.webp', '/images/solution/01/01_parts_02.png'],
    composition: 'FC-YJZC Aerial Platform platform, multi-spectral gimbals, surveillance radars, and ground stations.',
    functions: '24/7 autonomous patrol, long-range thermal detection, and integrated risk assessment.',
    scenes: ['/images/solution/01/01_scene_01.png', '/images/solution/01/01_scene_02.png'],
  },
  {
    title: 'Critical Infrastructure',
    titleCn: 'Infrastructure Monitoring',
    mainImg: '/solutions/index_solution/critical-infrastructure-protection.webp',
    parts: ['/images/solution/02/02_parts_01.png', '/images/solution/02/02_parts_02.png'],
    composition: 'RF detection arrays, phased array radars, high-speed EO trackers, and event logging modules.',
    functions: 'Multi-layer monitoring for energy plants, dams, and industrial airspace event management.',
    scenes: ['/images/solution/02/02_scene_01.png', '/images/solution/02/02_scene_02.png'],
  },
  {
    title: 'Key Area Security',
    titleCn: 'Key Area Security',
    mainImg: '/solutions/index_solution/key-area-security.webp',
    parts: ['/products/security/FC-H-Smart-Phone-Detection-Gate.webp', '/products/security/FC-3000-Intelligent-Ferromagnetic-Detection-System.webp'],
    composition: 'Mobile smart sentinels, X-ray baggage scanners, and intelligent metal detection gates.',
    functions: 'High-throughput screening for public-sector sites, contraband detection, and perimeter monitoring.',
    scenes: ['/solutions/index_solution/key-area-security.webp', '/products/security/FC-H-Smart-Phone-Detection-Gate.webp'],
  },
  {
    title: 'Emergency & Rescue',
    titleCn: 'Emergency Response',
    mainImg: '/solutions/index_solution/disaster-site-search-rescue-reconnaissance.webp',
    parts: ['/products/aerial-systems/FC-YJTX-01-Emergency-Communication-Platform.webp', '/images/solution/01/01_parts_04.png'],
    composition: 'Tethered communication platforms, mobile field hospitals, and prefabricated steel bridges.',
    functions: 'Rapid network restoration and medical deployment in disaster zones with site lighting support.',
    scenes: ['/solutions/index_solution/night-emergency-lighting-support.webp', '/images/solution/01/01_scene_02.png'],
  },
];

const Solutions = () => {
  return (
    <section className="section-solutions py-[100px]" id="solutions">
      <div className="container">
        <div className="section-header text-center mb-[50px]">
          <h2>Solutions Panorama</h2>
          <p className="text-[1.8rem] max-w-[1000px] mx-auto text-[#666]">
            Comprehensive security solutions across land, sea, and air.
          </p>
        </div>

        <div className="solutions-panorama">
          {solutions.map((item, idx) => (
            <div key={idx} className="sol-card">
              <div className="sol-card-header">
                <h3>{item.title} <span>{item.titleCn}</span></h3>
              </div>
              <div className="sol-card-top">
                <div className="sol-main-img-box" style={{ position: 'relative', width: '100%', height: '300px' }}>
                  <Image src={item.mainImg} fill style={{ objectFit: 'cover' }} alt={item.title} />
                </div>
                <div className="sol-accessories">
                  {item.parts.map((p, pidx) => (
                    <div key={pidx} className="sol-acc-img-box" style={{ position: 'relative', width: '60px', height: '60px' }}>
                      <Image src={p} fill style={{ objectFit: 'contain' }} alt="Part" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="sol-card-mid">
                <div className="sol-text-block">
                  <h4>System Composition</h4>
                  <p>{item.composition}</p>
                </div>
                <div className="sol-text-block">
                  <h4>System Functions</h4>
                  <p>{item.functions}</p>
                </div>
              </div>
              <div className="sol-card-bot">
                {item.scenes.map((s, sidx) => (
                  <div key={sidx} className="sol-scene-img-box" style={{ position: 'relative', width: '50%', height: '120px' }}>
                    <Image src={s} fill style={{ objectFit: 'cover' }} alt="Scene" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
