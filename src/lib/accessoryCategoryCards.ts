export interface AccessoryCategoryCardMeta {
  id: string;
  fallbackName: string;
  image: string;
}

export const ACCESSORY_CATEGORY_CARDS: AccessoryCategoryCardMeta[] = [
  {
    id: 'flight-controllers',
    fallbackName: 'Flight Controllers',
    image: '/products/uav-accessories/flight-controllers/fc-u10-pro/fc-u10-pro-flight-controller.webp',
  },
  {
    id: 'uav-motors',
    fallbackName: 'UAV Motors',
    image: '/products/uav-accessories/uav-motors/fc-max-5330/fc-max-5330-uav-motor.webp',
  },
  {
    id: 'uav-propellers',
    fallbackName: 'UAV Propellers',
    image: '/products/uav-accessories/uav-propellers/fc-c2d-propeller/fc-c2d-uav-propeller.webp',
  },
  {
    id: 'uav-batteries',
    fallbackName: 'UAV Batteries',
    image: '/products/uav-accessories/uav-batteries/fc-bt1/fc-bt1-uav-battery.webp',
  },
  {
    id: 'electro-optical-gimbals',
    fallbackName: 'Electro-Optical Gimbals',
    image: '/products/uav-accessories/electro-optical-gimbals/fc-l10tr-three-light-gimbal/fc-l10tr-electro-optical-gimbal.webp',
  },
  {
    id: 'uav-engines',
    fallbackName: 'UAV Engines',
    image: '/products/uav-accessories/uav-engines/fc-fdj-111/fc-fdj-111-uav-engine.webp',
  },
  {
    id: 'uav-data-links',
    fallbackName: 'UAV Data Links',
    image: '/products/uav-accessories/uav-data-links/fc-mesh-100/fc-mesh-100-uav-data-link.webp',
  },
  {
    id: 'uav-remote-controllers',
    fallbackName: 'UAV Remote Controllers',
    image: '/products/uav-accessories/uav-remote-controllers/fc-yk15-remote-controller/fc-yk15-uav-remote-controller.webp',
  },
];

export function getAccessoryCategoryName(dict: any, category: AccessoryCategoryCardMeta) {
  return dict?.accessories?.categories?.[category.id] || category.fallbackName;
}
