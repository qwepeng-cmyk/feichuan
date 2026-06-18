'use client';

import Image from 'next/image';
import {
  BatteryCharging,
  Building2,
  CloudCog,
  Factory,
  Fuel,
  Home,
  PlugZap,
  ShoppingBag,
  Sun,
  UtilityPole,
  Zap,
} from 'lucide-react';
import { withStaticAssetVersion } from '@/lib/assetVersion';

const ASSET_BASE = '/solutions/n-tet-pv-storage-diesel-microgrid-solution';

const sourceNodes = [
  {
    label: 'Utility Grid',
    spec: 'AC400V / 50-60Hz',
    Icon: UtilityPole,
  },
  {
    label: 'Diesel Generator',
    spec: '150kW / 187.5kVA',
    Icon: Fuel,
  },
  {
    label: 'PV System',
    spec: '120kW PV input',
    Icon: Sun,
  },
];

const loadNodes = [
  { label: 'Charging Station', Icon: PlugZap },
  { label: 'Commercial Buildings', Icon: ShoppingBag },
  { label: 'Manufacturing', Icon: Factory },
  { label: 'Home Loads', Icon: Home },
];

export default function MicrogridEnergyFlow({ compact = false }: { compact?: boolean }) {
  return (
    <section className="microgrid-flow-section" aria-labelledby="microgrid-flow-title">
      <style jsx>{`
        .microgrid-flow-section {
          padding: ${compact ? '34px 15px' : '92px 0'};
          background: #fff;
          scroll-margin-top: ${compact ? '150px' : '190px'};
        }

        .microgrid-flow-shell {
          width: min(1180px, calc(100% - 30px));
          margin: 0 auto;
        }

        .flow-header {
          display: flex;
          justify-content: space-between;
          gap: 32px;
          align-items: flex-end;
          margin-bottom: 34px;
        }

        .flow-kicker {
          color: #315ba4;
          font-size: 1.4rem;
          font-weight: 850;
          letter-spacing: 0;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .flow-title {
          color: #1f2937;
          font-size: ${compact ? '2.4rem' : '4.2rem'};
          line-height: 1.14;
          font-weight: 900;
          margin: 0;
          letter-spacing: 0;
        }

        .flow-summary {
          max-width: 430px;
          margin: 0;
          color: #5b6777;
          font-size: ${compact ? '1.5rem' : '1.72rem'};
          line-height: 1.72;
        }

        .flow-board {
          position: relative;
          border: 1px solid #dfe8f4;
          background:
            linear-gradient(90deg, rgba(49, 91, 164, 0.055) 1px, transparent 1px),
            linear-gradient(180deg, rgba(49, 91, 164, 0.045) 1px, transparent 1px),
            #f8fbff;
          background-size: 36px 36px;
          padding: ${compact ? '22px' : '34px'};
          overflow: hidden;
        }

        .flow-board::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-top: 4px solid #315ba4;
        }

        .flow-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 250px minmax(320px, 1fr) 410px;
          gap: 30px;
          align-items: center;
        }

        .source-stack,
        .load-grid {
          display: grid;
          gap: 14px;
        }

        .load-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .node-card {
          min-height: 92px;
          display: grid;
          grid-template-columns: 46px minmax(0, 1fr);
          gap: 14px;
          align-items: center;
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid #dce7f5;
          padding: 16px;
          box-shadow: 0 10px 26px rgba(20, 36, 64, 0.06);
        }

        .node-icon {
          width: 46px;
          height: 46px;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #315ba4;
          background: #e9f1fb;
        }

        .node-title {
          margin: 0 0 4px;
          color: #223041;
          font-size: ${compact ? '1.38rem' : '1.58rem'};
          font-weight: 850;
          line-height: 1.24;
        }

        .node-spec {
          margin: 0;
          color: #697586;
          font-size: ${compact ? '1.2rem' : '1.32rem'};
          line-height: 1.4;
        }

        .hub-zone {
          position: relative;
          min-height: 438px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flow-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          color: #315ba4;
          opacity: 0.42;
        }

        .hub-card {
          position: relative;
          z-index: 1;
          width: min(360px, 100%);
          background: #fff;
          border: 1px solid #d6e3f3;
          box-shadow: 0 24px 56px rgba(22, 38, 66, 0.13);
        }

        .ems-card {
          position: absolute;
          z-index: 2;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 10px;
          background: #223041;
          color: #fff;
          padding: 10px 16px;
          border-radius: 4px;
          box-shadow: 0 14px 30px rgba(22, 38, 66, 0.16);
          white-space: nowrap;
        }

        .ems-card span {
          font-size: 1.35rem;
          font-weight: 800;
        }

        .hub-media {
          position: relative;
          aspect-ratio: 1.23 / 1;
          background: #eef4fb;
        }

        .hub-body {
          padding: 20px 22px 22px;
        }

        .hub-label {
          color: #315ba4;
          font-size: 1.25rem;
          font-weight: 850;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .hub-title {
          color: #1f2937;
          font-size: ${compact ? '1.9rem' : '2.36rem'};
          line-height: 1.18;
          font-weight: 900;
          margin: 0 0 12px;
        }

        .hub-text {
          color: #5b6777;
          font-size: ${compact ? '1.35rem' : '1.5rem'};
          line-height: 1.65;
          margin: 0;
        }

        .metric-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border: 1px solid #dfe8f4;
          border-top: 0;
          background: #fff;
        }

        .metric {
          padding: 18px 20px;
          border-right: 1px solid #e7eef8;
        }

        .metric:last-child {
          border-right: 0;
        }

        .metric strong {
          display: block;
          color: #315ba4;
          font-size: ${compact ? '1.7rem' : '2.15rem'};
          line-height: 1;
          margin-bottom: 8px;
          font-weight: 900;
        }

        .metric span {
          color: #607086;
          font-size: ${compact ? '1.2rem' : '1.32rem'};
          line-height: 1.35;
        }

        @media (max-width: 1100px) {
          .flow-grid {
            grid-template-columns: 1fr;
          }

          .source-stack,
          .load-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .load-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          .hub-zone {
            min-height: 390px;
          }

          .flow-lines {
            display: none;
          }
        }

        @media (max-width: 760px) {
          .microgrid-flow-shell {
            width: 100%;
          }

          .flow-header {
            display: block;
            margin-bottom: 22px;
          }

          .flow-summary {
            margin-top: 12px;
          }

          .flow-board {
            padding: 16px;
          }

          .source-stack,
          .load-grid {
            grid-template-columns: 1fr;
          }

          .hub-zone {
            min-height: auto;
            padding: 58px 0 0;
          }

          .ems-card {
            top: 0;
          }

          .metric-row {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .metric:nth-child(2) {
            border-right: 0;
          }

          .metric:nth-child(-n + 2) {
            border-bottom: 1px solid #e7eef8;
          }
        }
      `}</style>

      <div className="microgrid-flow-shell">
        <div className="flow-header">
          <div>
            <div className="flow-kicker">Microgrid Architecture</div>
            <h2 id="microgrid-flow-title" className="flow-title">
              PV, Storage, Diesel and EMS in One Operating Chain
            </h2>
          </div>
          <p className="flow-summary">
            A concise power path: utility grid, diesel generation and PV feed the storage cabinet, while EMS schedules output to commercial and industrial loads.
          </p>
        </div>

        <div className="flow-board">
          <div className="flow-grid">
            <div className="source-stack" aria-label="Power sources">
              {sourceNodes.map(({ label, spec, Icon }) => (
                <article className="node-card" key={label}>
                  <span className="node-icon"><Icon size={25} strokeWidth={1.8} /></span>
                  <div>
                    <h3 className="node-title">{label}</h3>
                    <p className="node-spec">{spec}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="hub-zone">
              <svg className="flow-lines" viewBox="0 0 520 438" preserveAspectRatio="none" aria-hidden="true">
                <path d="M8 92 H180 C222 92 220 219 260 219" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M8 219 H260" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M8 346 H180 C222 346 220 219 260 219" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M260 219 H512" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M260 56 V145" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="8 8" />
                <path d="M505 219 l-12 -8 v16 z" fill="currentColor" />
              </svg>

              <div className="ems-card">
                <CloudCog size={20} strokeWidth={1.8} />
                <span>EMS Cloud Dispatch</span>
              </div>

              <article className="hub-card">
                <div className="hub-media">
                  <Image
                    src={withStaticAssetVersion(`${ASSET_BASE}/energy-storage-cabinet.webp`)}
                    alt="FC-261K-FPA-DM energy storage cabinet"
                    fill
                    style={{ objectFit: 'contain', padding: '14px' }}
                    sizes="(max-width: 760px) 80vw, 360px"
                  />
                </div>
                <div className="hub-body">
                  <div className="hub-label">Core Cabinet</div>
                  <h3 className="hub-title">FC-261K-FPA-DM Energy Storage Cabinet</h3>
                  <p className="hub-text">
                    Handles PV input, grid/off-grid conversion, diesel access and fast switching for critical loads.
                  </p>
                </div>
              </article>
            </div>

            <div className="load-grid" aria-label="Load scenarios">
              {loadNodes.map(({ label, Icon }) => (
                <article className="node-card" key={label}>
                  <span className="node-icon"><Icon size={25} strokeWidth={1.8} /></span>
                  <div>
                    <h3 className="node-title">{label}</h3>
                    <p className="node-spec">Managed load output</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="metric-row" aria-label="Key microgrid specifications">
          <div className="metric"><strong>261.248kWh</strong><span>LFP storage capacity</span></div>
          <div className="metric"><strong>170kW</strong><span>Grid-connected rated power</span></div>
          <div className="metric"><strong>125kW</strong><span>Off-grid rated power</span></div>
          <div className="metric"><strong>&lt;10ms</strong><span>Grid/off-grid switching</span></div>
        </div>
      </div>
    </section>
  );
}
