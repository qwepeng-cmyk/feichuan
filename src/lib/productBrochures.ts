import 'server-only';

import path from 'path';

export interface ProductBrochure {
  productName: string;
  fileName: string;
  downloadName: string;
  pageCount: number;
}

const PRODUCT_BROCHURES: Record<string, ProductBrochure> = {
  'stationary-rf-detection-system': {
    productName: 'Stationary RF Identification System',
    fileName: 'stationary-rf-detection-system.pdf',
    downloadName: 'stationary-rf-identification-system-product-brochure.pdf',
    pageCount: 3,
  },
  'directional-rf-interference-device': {
    productName: 'Directional RF Jammer',
    fileName: 'directional-rf-jammer.pdf',
    downloadName: 'directional-rf-jammer-product-brochure.pdf',
    pageCount: 2,
  },
  'portable-rf-detection-case': {
    productName: 'Portable RF Identification System',
    fileName: 'portable-rf-detection-system.pdf',
    downloadName: 'portable-rf-identification-system-product-brochure.pdf',
    pageCount: 3,
  },
  'omni-directional-rf-interference-device': {
    productName: 'Omni-directional RF Jammer',
    fileName: 'omni-directional-rf-jammer.pdf',
    downloadName: 'omni-directional-rf-jammer-product-brochure.pdf',
    pageCount: 3,
  },
  'portable-low-altitude-monitoring-event-logging-shield': {
    productName: 'Portable C-UAS Field Shield',
    fileName: 'portable-c-uas-field-shield.pdf',
    downloadName: 'portable-c-uas-field-shield-product-brochure.pdf',
    pageCount: 3,
  },
  'portable-low-altitude-monitoring-event-logging-shield-pro': {
    productName: 'Portable C-UAS Field Shield (Pro)',
    fileName: 'portable-c-uas-field-shield-pro.pdf',
    downloadName: 'portable-c-uas-field-shield-pro-product-brochure.pdf',
    pageCount: 3,
  },
  'portable-integrated-detection-event-logging-pro-low-altitude-monitoring': {
    productName: 'Integrated C-UAS Field Kit (Pro)',
    fileName: 'integrated-c-uas-field-kit-pro.pdf',
    downloadName: 'integrated-c-uas-field-kit-pro-product-brochure.pdf',
    pageCount: 4,
  },
  'portable-integrated-detection-event-logging-low-altitude-monitoring-basic': {
    productName: 'Integrated C-UAS Field Kit',
    fileName: 'integrated-c-uas-field-kit.pdf',
    downloadName: 'integrated-c-uas-field-kit-product-brochure.pdf',
    pageCount: 4,
  },
  'stationary-active-rf-defense-system': {
    productName: 'Fixed C-UAS Site Unit',
    fileName: 'fixed-c-uas-site-unit.pdf',
    downloadName: 'fixed-c-uas-site-unit-product-brochure.pdf',
    pageCount: 2,
  },
  'uav-navigation-airspace-data-verification-system': {
    productName: 'C-UAS Signal Verification System',
    fileName: 'c-uas-signal-verification-system.pdf',
    downloadName: 'c-uas-signal-verification-system-product-brochure.pdf',
    pageCount: 3,
  },
  'portable-active-rf-defense-system': {
    productName: 'Portable C-UAS Field Unit',
    fileName: 'portable-c-uas-field-unit.pdf',
    downloadName: 'portable-c-uas-field-unit-product-brochure.pdf',
    pageCount: 2,
  },
  'composite-electro-optical-tracking-system': {
    productName: 'Electro-Optical (EO) Tracking System',
    fileName: 'electro-optical-tracking-system.pdf',
    downloadName: 'electro-optical-tracking-system-product-brochure.pdf',
    pageCount: 4,
  },
  'uav-remote-id-monitoring-system': {
    productName: 'UAV Remote ID Recognition System',
    fileName: 'uav-remote-id-recognition-system.pdf',
    downloadName: 'uav-remote-id-recognition-system-product-brochure.pdf',
    pageCount: 4,
  },
  'handheld-rf-detection-system-mini': {
    productName: 'PL280H Handheld RF Detection System',
    fileName: 'pl280h-handheld-rf-detection-system.pdf',
    downloadName: 'pl280h-handheld-rf-detection-system-product-brochure.pdf',
    pageCount: 2,
  },
  'low-altitude-detection-radar-ku-band': {
    productName: 'Low-Altitude Early-Warning Radar (Ku-Band)',
    fileName: 'ku-band-low-altitude-radar.pdf',
    downloadName: 'ku-band-low-altitude-radar-product-brochure.pdf',
    pageCount: 3,
  },
  'low-altitude-3d-pulse-doppler-radar': {
    productName: 'Low-Altitude Early-Warning Radar (X-Band)',
    fileName: 'x-band-low-altitude-radar.pdf',
    downloadName: 'x-band-low-altitude-radar-product-brochure.pdf',
    pageCount: 3,
  },
};

export function getProductBrochure(handle: string) {
  return PRODUCT_BROCHURES[handle] || null;
}

export function getProductBrochurePath(brochure: ProductBrochure) {
  return path.join(process.cwd(), 'private', 'product-brochures', brochure.fileName);
}
