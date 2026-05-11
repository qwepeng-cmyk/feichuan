import React from 'react';
import Image from 'next/image';

const solutions = [
  {
    title: "Border Patrol & Security",
    titleCn: "边境巡逻",
    mainImg: "/images/prod_04应急侦查无人机_10.png",
    parts: ["/images/solution/01/01_parts_01.png", "/images/solution/01/01_parts_02.png"],
    composition: "FC-YJZC UAV platform, multi-spectral gimbals, surveillance radars, and ground stations.",
    functions: "24/7 autonomous patrol, long-range thermal detection, and integrated risk assessment.",
    scenes: ["/images/sol_边境巡逻_8.png", "/images/solution/01/01_scene_01.png"]
  },
  {
    title: "Critical Infrastructure",
    titleCn: "关键设施防护",
    mainImg: "/images/solution/02/02_main.png",
    parts: ["/images/solution/02/02_parts_01.png", "/images/solution/02/02_parts_02.png"],
    composition: "RF detection arrays, phased array radars, high-speed EO trackers, and jamming modules.",
    functions: "Multi-layer defense for oil plants and dams. Unauthorized drone identification and defeat.",
    scenes: ["/images/sol_关键设施防护_1.png", "/images/solution/02/02_scene_01.png"]
  },
  {
    title: "Key Area Security",
    titleCn: "要地安保",
    mainImg: "/images/prod_17携式察打一体反无人机设备_11.png",
    parts: ["/images/prod_FCDMS10系列智能电子哨兵_13.jpeg", "/images/solution/01/01_parts_05.png"],
    composition: "Mobile smart sentinels, X-ray baggage scanners, and intelligent metal detection gates.",
    functions: "High-throughput screening for govt sites. Contraband detection and perimeter monitoring.",
    scenes: ["/images/sol_要地安保_5.png", "/images/prod_17携式察打一体反无人机设备_11.png"]
  },
  {
    title: "Emergency & Rescue",
    titleCn: "应急救灾",
    mainImg: "/images/prod_02智能化可移动式多功能方舱医院_12.jpeg",
    parts: ["/images/sol_应急救灾_3.png", "/images/solution/01/01_parts_04.png"],
    composition: "Tethered communication drones, mobile field hospitals, and prefabricated steel bridges.",
    functions: "Rapid network restoration and medical deployment in disaster zones. 24/7 site lighting.",
    scenes: ["/images/sol_应急救灾_3.png", "/images/solution/01/01_scene_02.png"]
  }
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
