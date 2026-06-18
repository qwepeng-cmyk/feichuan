'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  Factory,
  Fuel,
  PlugZap,
  Sun,
  UtilityPole,
  type LucideIcon,
} from 'lucide-react';
import InquiryForm from '@/components/products/InquiryForm';
import { localePath } from '@/lib/localePath';
import { withStaticAssetVersion } from '@/lib/assetVersion';

const ASSET_BASE = '/solutions/n-tet-pv-storage-diesel-microgrid-solution';

type MicrogridSolutionPageProps = {
  solution: any;
  locale: string;
  dict: any;
};

type NodeItem = {
  title: string;
  spec: string;
  Icon: LucideIcon;
};

const sourceNodes: NodeItem[] = [
  { title: 'Utility Grid', spec: 'AC400V / 50-60Hz input', Icon: UtilityPole },
  { title: 'Diesel Generator', spec: '150kW / 187.5kVA backup power', Icon: Fuel },
  { title: 'Solar PV System', spec: 'Up to 120kW PV input', Icon: Sun },
];

const loadNodes: NodeItem[] = [
  { title: 'PV-Storage-Charging Site', spec: 'Charging load buffering and PV consumption', Icon: PlugZap },
  { title: 'Commercial Building', spec: 'Peak shaving and emergency power', Icon: Building2 },
  { title: 'Factory Load', spec: 'Production backup power and demand control', Icon: Factory },
];

const modes = [
  ['01', 'PV Priority', 'PV generation serves site loads first, while surplus energy charges the battery.'],
  ['02', 'Peak Shaving', 'Storage discharges during peak-tariff or high-demand periods to lower operating cost.'],
  ['03', 'Diesel Backup', 'Diesel generation starts when PV and battery output are insufficient or the site is off-grid.'],
  ['04', 'Emergency Power', 'Fast switching supports critical loads when grid power is unstable or unavailable.'],
];

const equipment = [
  {
    title: 'FC-261K-FPA-DM Energy Storage Converter Cabinet',
    text: 'Nominal system capacity is 261.248kWh, supporting PV input, grid-connected conversion, off-grid power supply, diesel generator access and fast switching.',
    image: `${ASSET_BASE}/energy-storage-cabinet.webp`,
    alt: 'energy storage converter integrated cabinet',
  },
  {
    title: '150kW Low-Noise Diesel Generator Set',
    text: 'Works as backup and off-grid power supply, coordinating with the storage system to improve resilience in weak-grid and emergency scenarios.',
    image: `${ASSET_BASE}/diesel-generator-set.webp`,
    alt: 'diesel generator set',
  },
  {
    title: 'EMS Energy Storage Cloud Platform',
    text: 'Supports 24/7 monitoring, equipment status assessment, power coordination, remote control, strategy optimization and revenue management.',
    image: `${ASSET_BASE}/ems-energy-storage-cloud-platform.png`,
    alt: 'EMS energy storage cloud platform dashboard on laptop',
  },
];

const scenarios = [
  ['Factory Site', 'Production backup, demand control and local microgrid operation.', `${ASSET_BASE}/factory-site.webp`],
  ['Commercial Building', 'Peak shaving, load smoothing and emergency backup power.', `${ASSET_BASE}/commercial-building.webp`],
  ['Industrial Park', 'PV consumption, storage dispatch and low-carbon energy management.', `${ASSET_BASE}/industrial-park.webp`],
  ['PV-Storage-Charging Station', 'PV input, storage buffering and charging-load support.', `${ASSET_BASE}/pv-storage-charging.webp`],
];

function SectionHead({ title, text }: { title: string; text: string }) {
  return (
    <div className="mg-section-head">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export default function MicrogridSolutionPage({ solution, locale, dict }: MicrogridSolutionPageProps) {
  return (
    <div className="microgrid-page">
      <style jsx>{`
        .microgrid-page {
          padding-top: 112px;
          width: 100%;
          max-width: 100vw;
          color: #1f2937;
          background: #f6f9fd;
          overflow-x: hidden;
        }

        .microgrid-page *,
        .microgrid-page *::before,
        .microgrid-page *::after {
          box-sizing: border-box;
        }

        .microgrid-main {
          background: linear-gradient(180deg, #fff 0, #f6f9fd 42%, #eef4fb 100%);
        }

        .mg-container {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
        }

        .mg-hero {
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(90deg, rgba(49, 91, 164, 0.06) 1px, transparent 1px),
            linear-gradient(180deg, rgba(49, 91, 164, 0.05) 1px, transparent 1px),
            #f8fbff;
          background-size: 42px 42px;
          border-bottom: 1px solid #dfe8f4;
        }

        .mg-hero-inner {
          min-height: min(650px, calc(100vh - 164px));
          display: grid;
          grid-template-columns: 0.76fr 1.24fr;
          gap: 36px;
          align-items: center;
          padding: 44px 0 46px;
        }

        .mg-eyebrow {
          color: #315ba4;
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .mg-hero h1 {
          margin: 0 0 24px;
          color: #111827;
          font-size: clamp(38px, 4vw, 56px);
          line-height: 1.08;
          font-weight: 950;
          letter-spacing: 0;
          overflow-wrap: anywhere;
        }

        .mg-hero-copy {
          margin: 0 0 30px;
          color: #405166;
          font-size: 18px;
          line-height: 1.85;
          max-width: 560px;
        }

        .mg-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }

        .mg-btn-primary,
        .mg-btn-secondary {
          height: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          border-radius: 4px;
          font-size: 15px;
          font-weight: 850;
          text-decoration: none;
        }

        .mg-btn-primary {
          background: #ff9800;
          color: #fff;
          box-shadow: 0 10px 24px rgba(255, 152, 0, 0.2);
        }

        .mg-btn-secondary {
          color: #315ba4;
          border: 1px solid #315ba4;
          background: rgba(255, 255, 255, 0.72);
        }

        .mg-points {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          max-width: 560px;
        }

        .mg-point {
          min-height: 78px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.78);
          border: 1px solid #dce7f5;
        }

        .mg-point strong {
          display: block;
          color: #315ba4;
          font-size: 18px;
          margin-bottom: 6px;
          line-height: 1;
        }

        .mg-point span {
          color: #627188;
          font-size: 13px;
          line-height: 1.35;
        }

        .mg-architecture {
          position: relative;
          min-height: 0;
          padding: 24px 28px 26px;
          background: #fff;
          border: 1px solid #d6e3f3;
          box-shadow: 0 18px 45px rgba(23, 45, 82, 0.12);
          overflow: hidden;
        }

        .mg-architecture::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(49, 91, 164, 0.05) 1px, transparent 1px),
            linear-gradient(180deg, rgba(49, 91, 164, 0.05) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        .mg-arch-title,
        .mg-diagram {
          position: relative;
          z-index: 1;
        }

        .mg-arch-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 18px;
        }

        .mg-arch-title strong {
          color: #172033;
          font-size: 22px;
          font-weight: 950;
        }

        .mg-arch-title span {
          color: #315ba4;
          font-size: 13px;
          font-weight: 900;
        }

        .mg-diagram {
          display: grid;
          grid-template-columns: 160px minmax(220px, 1fr) 170px;
          gap: 18px;
          align-items: center;
        }

        .mg-node-stack {
          display: grid;
          gap: 13px;
          position: relative;
          z-index: 4;
        }

        .mg-node {
          min-height: 76px;
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 11px;
          align-items: center;
          padding: 13px;
          background: #fff;
          border: 1px solid #dce7f5;
          box-shadow: 0 10px 24px rgba(19, 37, 67, 0.06);
        }

        .mg-node-icon {
          width: 42px;
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          background: #e9f1fb;
          color: #315ba4;
        }

        .mg-node b {
          display: block;
          color: #1f2937;
          font-size: 15px;
          line-height: 1.25;
          margin-bottom: 4px;
        }

        .mg-node small {
          display: block;
          color: #6c7a8c;
          font-size: 12px;
          line-height: 1.35;
        }

        .mg-center-stack {
          position: relative;
          z-index: 5;
          display: grid;
          gap: 12px;
          justify-items: center;
        }

        .mg-ems {
          width: min(260px, 100%);
          padding: 10px 14px 12px;
          color: #172033;
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid #d5e1f1;
          border-top: 3px solid #315ba4;
          box-shadow: 0 10px 24px rgba(49, 91, 164, 0.08);
          text-align: center;
        }

        .mg-ems b {
          display: block;
          font-size: 15px;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .mg-ems-media {
          position: relative;
          width: min(118px, 100%);
          aspect-ratio: 16 / 9;
          margin: 0 auto 7px;
          background: #edf4ff;
          border: 1px solid #d5e4f7;
          overflow: hidden;
        }

        .mg-ems span {
          display: block;
          color: #657287;
          font-size: 11px;
          line-height: 1.35;
        }

        .mg-tags {
          display: flex;
          justify-content: center;
          gap: 5px;
          flex-wrap: wrap;
          margin-top: 8px;
        }

        .mg-tags small {
          padding: 4px 6px;
          color: #315ba4;
          background: #edf4ff;
          border: 1px solid #d5e4f7;
          font-size: 10px;
          font-weight: 800;
          line-height: 1;
        }

        .mg-down-line {
          position: relative;
          width: 2px;
          height: 18px;
          background: #315ba4;
          opacity: 0.34;
        }

        .mg-down-line::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -1px;
          width: 8px;
          height: 8px;
          border-right: 2px solid #315ba4;
          border-bottom: 2px solid #315ba4;
          transform: translateX(-50%) rotate(45deg);
        }

        .mg-storage {
          position: relative;
          z-index: 3;
          width: min(340px, 100%);
          padding: 18px 18px 20px;
          background: #fff;
          border: 2px solid rgba(49, 91, 164, 0.42);
          border-top: 4px solid #ff9800;
          box-shadow: 0 20px 48px rgba(49, 91, 164, 0.18);
        }

        .mg-storage::before,
        .mg-storage::after {
          content: '';
          position: absolute;
          top: 13px;
          z-index: 4;
          width: 22px;
          height: 7px;
          background: #315ba4;
          clip-path: polygon(0 36%, calc(100% - 7px) 36%, calc(100% - 7px) 0, 100% 50%, calc(100% - 7px) 100%, calc(100% - 7px) 64%, 0 64%);
        }

        .mg-storage::before {
          left: 10px;
        }

        .mg-storage::after {
          right: 10px;
        }

        .mg-storage-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 8;
          background: #eef4fb;
          margin-bottom: 12px;
          overflow: hidden;
        }

        .mg-storage b {
          display: block;
          color: #101827;
          font-size: 18px;
          line-height: 1.25;
          margin-bottom: 8px;
        }

        .mg-storage span {
          color: #5f6d7e;
          font-size: 13px;
          line-height: 1.55;
        }

        .mg-section,
        .mg-cta {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 82px 0;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.94) 0%, rgba(248, 251, 255, 0.96) 100%);
        }

        .mg-section.alt {
          background: linear-gradient(180deg, #eef4fb 0%, #f8fbff 100%);
        }

        .mg-section::before,
        .mg-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(49, 91, 164, 0.045) 1px, transparent 1px),
            linear-gradient(180deg, rgba(49, 91, 164, 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .mg-section::after,
        .mg-cta::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background:
            linear-gradient(135deg, transparent 0 58%, rgba(49, 91, 164, 0.055) 58% 64%, transparent 64% 100%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.58), rgba(255, 255, 255, 0));
        }

        .mg-section-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 32px;
          margin-bottom: 34px;
        }

        .mg-section-head h2 {
          margin: 0;
          color: #111827;
          font-size: 36px;
          line-height: 1.18;
          font-weight: 950;
        }

        .mg-section-head p {
          max-width: 520px;
          margin: 0;
          color: #5f6d7e;
          font-size: 16px;
          line-height: 1.8;
        }

        .mg-operation-card {
          position: relative;
          padding: 34px;
          background: #fff;
          border: 1px solid #d6e3f3;
          box-shadow: 0 18px 45px rgba(23, 45, 82, 0.12);
        }

        .mg-operation-title {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .mg-operation-title strong {
          display: block;
          color: #172033;
          font-size: 24px;
          font-weight: 950;
          line-height: 1.25;
          margin-bottom: 8px;
        }

        .mg-operation-title span {
          color: #5d6b80;
          font-size: 14px;
          line-height: 1.6;
        }

        .mg-badge {
          min-width: 112px;
          padding: 9px 12px;
          color: #315ba4;
          background: #edf4ff;
          border: 1px solid #d5e4f7;
          text-align: center;
          font-size: 12px;
          font-weight: 900;
        }

        .mg-flow-map {
          display: grid;
          gap: 12px;
        }

        .mg-flow-step {
          display: grid;
          grid-template-columns: 50px 1fr;
          gap: 14px;
          align-items: center;
          min-height: 74px;
          padding: 14px 16px 14px 0;
          background: rgba(255, 255, 255, 0.84);
          border: 1px solid #dce7f5;
          box-shadow: 0 10px 24px rgba(19, 37, 67, 0.055);
        }

        .mg-flow-num {
          width: 50px;
          height: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          background: #315ba4;
          font-size: 13px;
          font-weight: 950;
        }

        .mg-flow-step.control {
          border-color: rgba(255, 152, 0, 0.45);
          box-shadow: 0 14px 30px rgba(255, 152, 0, 0.12);
        }

        .mg-flow-step.control .mg-flow-num {
          background: #ff9800;
        }

        .mg-flow-step b {
          display: block;
          color: #162033;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .mg-flow-step small {
          color: #617086;
          font-size: 12px;
          line-height: 1.45;
        }

        .mg-economy {
          display: grid;
          grid-template-columns: 0.86fr 1.14fr;
          gap: 28px;
          align-items: stretch;
        }

        .mg-saving {
          padding: 30px;
          color: #fff;
          background: #1f2937;
          border-top: 4px solid #ff9800;
          box-shadow: 0 18px 45px rgba(31, 41, 55, 0.16);
        }

        .mg-saving span {
          display: block;
          color: rgba(255, 255, 255, 0.66);
          font-size: 13px;
          font-weight: 850;
          margin-bottom: 12px;
        }

        .mg-saving strong {
          display: block;
          font-size: 42px;
          line-height: 1;
          margin-bottom: 14px;
          font-weight: 950;
        }

        .mg-saving p {
          margin: 0;
          color: rgba(255, 255, 255, 0.74);
          font-size: 14px;
          line-height: 1.75;
        }

        .mg-economy-table {
          background: #fff;
          border: 1px solid #dfe8f4;
          overflow: hidden;
        }

        .mg-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          min-height: 54px;
          border-bottom: 1px solid #e7eef8;
        }

        .mg-row:last-child {
          border-bottom: 0;
        }

        .mg-row span {
          display: flex;
          align-items: center;
          padding: 13px 16px;
          color: #415066;
          font-size: 13px;
          line-height: 1.45;
          border-right: 1px solid #e7eef8;
        }

        .mg-row span:last-child {
          border-right: 0;
        }

        .mg-row.head span {
          color: #172033;
          background: #eef4fb;
          font-weight: 900;
        }

        .mg-highlight {
          color: #315ba4 !important;
          font-weight: 900;
        }

        .mg-note {
          margin: 16px 0 0;
          color: #6a7789;
          font-size: 12px;
          line-height: 1.7;
        }

        .mg-mode-grid,
        .mg-equipment-grid,
        .mg-scenario-grid {
          display: grid;
          gap: 22px;
        }

        .mg-mode-grid {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .mg-mode-card {
          min-height: 210px;
          padding: 26px;
          background: #fff;
          border: 1px solid #dfe8f4;
        }

        .mg-mode-card .index {
          color: #315ba4;
          font-size: 13px;
          font-weight: 950;
          margin-bottom: 18px;
        }

        .mg-mode-card h3 {
          margin: 0 0 12px;
          color: #111827;
          font-size: 22px;
          line-height: 1.2;
        }

        .mg-mode-card p {
          margin: 0;
          color: #5f6d7e;
          font-size: 14px;
          line-height: 1.7;
        }

        .mg-equipment-grid {
          grid-template-columns: 1.1fr 0.9fr 0.9fr;
        }

        .mg-equipment-card,
        .mg-scenario-card {
          overflow: hidden;
          background: #fff;
          border: 1px solid #dfe8f4;
          box-shadow: 0 12px 30px rgba(23, 45, 82, 0.08);
        }

        .mg-equipment-media {
          position: relative;
          height: 260px;
          background: #eef4fb;
        }

        .mg-equipment-body {
          padding: 24px;
        }

        .mg-equipment-body h3 {
          margin: 0 0 10px;
          color: #111827;
          font-size: 22px;
          line-height: 1.25;
        }

        .mg-equipment-body p {
          margin: 0;
          color: #5f6d7e;
          font-size: 14px;
          line-height: 1.75;
        }

        .mg-scenario-grid {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .mg-scenario-media {
          position: relative;
          height: 150px;
          background: #eef4fb;
        }

        .mg-scenario-card h3 {
          margin: 0;
          padding: 18px 18px 4px;
          color: #111827;
          font-size: 18px;
        }

        .mg-scenario-card p {
          min-height: 76px;
          margin: 0;
          padding: 0 18px 18px;
          color: #64748b;
          font-size: 13px;
          line-height: 1.6;
        }

        .mg-cta {
          background: linear-gradient(180deg, #f8fbff 0%, #edf4fb 100%);
        }

        @media (max-width: 1100px) {
          .mg-hero-inner,
          .mg-diagram,
          .mg-equipment-grid {
            grid-template-columns: 1fr;
          }

          .mg-hero-inner {
            min-height: auto;
          }

          .mg-storage::before,
          .mg-storage::after {
            display: none;
          }

          .mg-mode-grid,
          .mg-scenario-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .mg-economy {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .microgrid-page {
            padding-top: 68px;
            width: 100%;
            max-width: 100vw;
          }

          .mg-container {
            width: calc(100vw - 32px);
            max-width: none;
            margin-left: 16px;
            margin-right: 16px;
          }

          .mg-hero-inner {
            padding: 38px 0 48px;
            gap: 26px;
          }

          .mg-hero h1 {
            font-size: 30px;
            line-height: 1.08;
          }

          .mg-hero-copy {
            font-size: 16px;
            line-height: 1.75;
          }

          .mg-btn-primary,
          .mg-btn-secondary {
            width: 100%;
          }

          .mg-points {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
          }

          .mg-point {
            min-height: 116px;
            padding: 14px 12px;
          }

          .mg-point strong {
            font-size: 18px;
          }

          .mg-architecture {
            padding: 18px;
          }

          .mg-arch-title {
            display: block;
          }

          .mg-arch-title strong {
            display: block;
            margin-bottom: 6px;
          }

          .mg-node-stack {
            gap: 12px;
            padding: 42px 14px 34px;
            border: 1px dashed rgba(49, 91, 164, 0.35);
            background:
              linear-gradient(90deg, transparent 0 25px, rgba(49, 91, 164, 0.32) 25px 27px, transparent 27px),
              rgba(255, 255, 255, 0.76);
          }

          .mg-node-stack::before {
            content: attr(aria-label);
            position: absolute;
            top: 12px;
            left: 14px;
            height: 22px;
            display: inline-flex;
            align-items: center;
            padding: 0 9px;
            color: #fff;
            background: #315ba4;
            font-size: 12px;
            font-weight: 900;
          }

          .mg-node {
            min-height: 78px;
            width: 100%;
            border-left: 3px solid #315ba4;
          }

          .mg-center-stack {
            gap: 0;
          }

          .mg-ems,
          .mg-storage {
            width: 100%;
          }

          .mg-ems {
            padding: 18px;
          }

          .mg-storage-media {
            aspect-ratio: 16 / 10;
          }

          .mg-down-line {
            height: 50px;
            opacity: 1;
          }

          .mg-section,
          .mg-cta {
            padding: 56px 0;
          }

          .mg-section-head {
            display: block;
          }

          .mg-section-head h2 {
            font-size: 28px;
            margin-bottom: 12px;
          }

          .mg-operation-card {
            padding: 20px;
          }

          .mg-operation-title {
            display: block;
          }

          .mg-badge {
            display: inline-block;
            margin-top: 14px;
          }

          .mg-row {
            grid-template-columns: 1fr;
            background: #fff;
            border: 1px solid #dfe8f4;
            margin-bottom: 10px;
          }

          .mg-row.head {
            display: none;
          }

          .mg-row span {
            border-right: 0;
            border-bottom: 1px solid #e7eef8;
          }

          .mg-row span:last-child {
            border-bottom: 0;
          }

          .mg-mode-grid,
          .mg-scenario-grid {
            grid-template-columns: 1fr;
          }

          .mg-equipment-media {
            height: 220px;
          }
        }

        @media (max-width: 480px) {
          .mg-container {
            width: 358px;
            max-width: calc(100vw - 32px);
            margin-left: 16px;
            margin-right: 16px;
          }
        }
      `}</style>

      <main className="microgrid-main">
        <div className="product-breadcrumb-nav">
          <div className="container">
            <div className="breadcrumb-path">
              <Link href={localePath(locale)}>{dict.nav.home}</Link>
              <span>&gt;</span>
              <Link href={localePath(locale, '/solutions')}>{dict.nav.solutions}</Link>
              <span>&gt;</span>
              <span>N-TET PV-Storage-Diesel Microgrid System Solution</span>
            </div>
          </div>
        </div>

        <section className="mg-hero">
          <div className="mg-container mg-hero-inner">
            <div>
              <div className="mg-eyebrow">Energy & Microgrid Solution</div>
              <h1>N-TET PV-Storage-Diesel Microgrid System Solution</h1>
              <p className="mg-hero-copy">
                Integrates solar PV generation, lithium iron phosphate energy storage, diesel generation and EMS energy management for factories, parks, commercial buildings and PV-storage-charging sites.
              </p>
              <div className="mg-actions">
                <a className="mg-btn-primary" href="#inquiry">Request a Solution Quote</a>
                <a className="mg-btn-secondary" href="#operation">View Operating Flow</a>
              </div>
              <div className="mg-points" aria-label="Key values">
                <div className="mg-point"><strong>PV + ESS + Diesel</strong><span>Coordinated multi-source power</span></div>
                <div className="mg-point"><strong>EMS</strong><span>Unified dispatch and remote O&amp;M</span></div>
                <div className="mg-point"><strong>&lt;10ms</strong><span>Fast grid / off-grid switching</span></div>
              </div>
            </div>

            <div className="mg-architecture" id="architecture">
              <div className="mg-arch-title">
                <strong>What Does the System Include?</strong>
                <span>Energy Input, EMS, Storage, Loads</span>
              </div>

              <div className="mg-diagram">
                <div className="mg-node-stack" aria-label="Energy Input">
                  {sourceNodes.map(({ title, spec, Icon }) => (
                    <div className="mg-node" key={title}>
                      <span className="mg-node-icon" aria-hidden="true"><Icon size={27} strokeWidth={1.9} /></span>
                      <span><b>{title}</b><small>{spec}</small></span>
                    </div>
                  ))}
                </div>

                <div className="mg-center-stack">
                  <div className="mg-ems">
                    <b>EMS Energy Management Platform</b>
                    <div className="mg-ems-media">
                      <Image
                        src={withStaticAssetVersion(`${ASSET_BASE}/ems-energy-storage-cloud-platform.png`)}
                        alt="EMS dispatch dashboard interface"
                        fill
                        style={{ objectFit: 'contain', padding: 4 }}
                        sizes="118px"
                      />
                    </div>
                    <span>Monitors equipment status and coordinates PV, storage, diesel generation and load power for peak shaving, demand control and emergency strategies.</span>
                    <div className="mg-tags" aria-label="EMS platform capabilities">
                      <small>Monitoring</small>
                      <small>Dispatch</small>
                      <small>Emergency Control</small>
                    </div>
                  </div>
                  <div className="mg-down-line" />
                  <div className="mg-storage">
                    <div className="mg-storage-media">
                      <Image
                        src={withStaticAssetVersion(`${ASSET_BASE}/energy-storage-cabinet.webp`)}
                        alt="FC-261K-FPA-DM energy storage converter integrated cabinet"
                        fill
                        style={{ objectFit: 'contain', padding: 12 }}
                        sizes="340px"
                      />
                    </div>
                    <b>FC-261K-FPA-DM Energy Storage Converter Cabinet</b>
                    <span>Supports PV access, grid / off-grid conversion, diesel generator access, storage dispatch and fast switching for critical loads.</span>
                  </div>
                </div>

                <div className="mg-node-stack" aria-label="Load Output">
                  {loadNodes.map(({ title, spec, Icon }) => (
                    <div className="mg-node" key={title}>
                      <span className="mg-node-icon" aria-hidden="true"><Icon size={27} strokeWidth={1.9} /></span>
                      <span><b>{title}</b><small>{spec}</small></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mg-section alt" id="operation">
          <div className="mg-container">
            <SectionHead
              title="How Does the Microgrid Operate?"
              text="The system allocates energy based on solar conditions, load demand, electricity prices and grid status, switching between economical operation and reliable backup power."
            />
            <div className="mg-operation-card">
              <div className="mg-operation-title">
                <div>
                  <strong>Operating Path from Generation to Load</strong>
                  <span>PV, storage, utility grid and diesel generation work together according to site load demand.</span>
                </div>
                <div className="mg-badge">Automatic Dispatch<br />Continuous Power</div>
              </div>
              <div className="mg-flow-map">
                {[
                  ['01', 'PV Priority Supply', 'During daytime, PV power serves site loads first to reduce grid electricity purchases.'],
                  ['02', 'Storage Charging and Discharging', 'Surplus PV charges the battery; stored energy is released during peak load or high-tariff periods.'],
                  ['03', 'EMS Selects the Strategy', 'Operating modes are switched based on load, tariff, battery status and grid condition.'],
                  ['04', 'Grid / Diesel Backup', 'When PV is insufficient or the site is off-grid, utility power and diesel generation provide backup supply.'],
                  ['05', 'Critical Loads Stay Online', 'Fast grid/off-grid switching helps maintain power for critical production and commercial loads.'],
                ].map(([num, title, text]) => (
                  <div className={`mg-flow-step ${num === '03' ? 'control' : ''}`} key={num}>
                    <span className="mg-flow-num">{num}</span>
                    <span><b>{title}</b><small>{text}</small></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mg-section">
          <div className="mg-container">
            <SectionHead
              title="Economic Benefit Analysis"
              text="Based on a typical Brazilian site with average daily consumption of 1200kWh, the main value of the PV-storage-diesel microgrid comes from lower diesel consumption and higher PV self-use."
            />
            <div className="mg-economy">
              <div className="mg-saving">
                <span>Estimated Annual Fuel Saving</span>
                <strong>$86,800</strong>
                <p>Diesel consumption is reduced from approx. 300L/day to approx. 80L/day. Static payback is estimated at about 4-6 years, depending on local fuel price, electricity tariff and system configuration.</p>
              </div>
              <div>
                <div className="mg-economy-table" aria-label="Economic comparison between diesel-only and PV-storage-diesel microgrid options">
                  {[
                    ['Item', 'Diesel-Only Option', 'PV-Storage-Diesel Microgrid'],
                    ['Average daily energy use', 'Approx. 1200kWh', 'Approx. 1200kWh'],
                    ['Daily PV generation', '0', 'Approx. 900kWh'],
                    ['Daily storage discharge', '0', 'Approx. 400kWh'],
                    ['Daily diesel consumption', 'Approx. 300L', 'Approx. 80L'],
                    ['Daily fuel cost', 'Approx. $324', 'Approx. $86'],
                    ['Daily fuel saving', '-', 'Approx. $238'],
                    ['Annual fuel saving', '-', 'Approx. $86,800'],
                    ['Static payback period', '-', 'Approx. 4-6 years'],
                  ].map((row, idx) => (
                    <div className={`mg-row ${idx === 0 ? 'head' : ''}`} key={row[0]}>
                      <span>{row[0]}</span>
                      <span>{row[1]}</span>
                      <span className={idx >= 6 ? 'mg-highlight' : undefined}>{row[2]}</span>
                    </div>
                  ))}
                </div>
                <p className="mg-note">Basis: diesel price approx. 5.5 BRL/L; diesel-only daily fuel cost approx. 1,650 BRL; PV-storage-diesel option approx. 440 BRL. USD figures are rounded estimates.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mg-section">
          <div className="mg-container">
            <SectionHead title="Four Typical Operating Modes" text="The same system can support grid-connected savings, diesel coordination and emergency backup according to local power conditions." />
            <div className="mg-mode-grid">
              {modes.map(([index, title, text]) => (
                <article className="mg-mode-card" key={index}>
                  <div className="index">{index}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mg-section alt">
          <div className="mg-container">
            <SectionHead title="Core Equipment" text="The storage cabinet, diesel generator set and EMS platform work together for energy conversion, backup supply and remote dispatch." />
            <div className="mg-equipment-grid">
              {equipment.map((item) => (
                <article className="mg-equipment-card" key={item.title}>
                  <div className="mg-equipment-media">
                    <Image
                      src={withStaticAssetVersion(item.image)}
                      alt={item.alt}
                      fill
                      style={{ objectFit: 'contain', padding: 16 }}
                      sizes="(max-width: 720px) 90vw, 380px"
                    />
                  </div>
                  <div className="mg-equipment-body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mg-section">
          <div className="mg-container">
            <SectionHead title="Applicable Scenarios" text="Use the scenario cards as a quick match between the system architecture and the customer's real power site." />
            <div className="mg-scenario-grid">
              {scenarios.map(([title, text, image]) => (
                <article className="mg-scenario-card" key={title}>
                  <div className="mg-scenario-media">
                    <Image src={withStaticAssetVersion(image)} alt={title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 720px) 90vw, 280px" />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mg-cta" id="inquiry">
          <div className="mg-container">
            <InquiryForm dict={dict} />
          </div>
        </section>
      </main>
    </div>
  );
}
