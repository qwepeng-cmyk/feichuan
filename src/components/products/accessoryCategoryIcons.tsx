import React from 'react';

const iconProps = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function AccessoryCategoryIcon({ id }: { id: string }) {
  if (id.includes('flight-controller')) {
    return (
      <svg {...iconProps}>
        <rect x="14" y="10" width="20" height="28" rx="3" />
        <rect x="19" y="16" width="10" height="10" rx="1.5" fill="currentColor" opacity="0.1" />
        <path d="M22 38v4M28 38v4M22 6v4M28 6v4M10 18h4M10 24h4M10 30h4M34 18h4M34 24h4M34 30h4" />
        <path d="M20 31h4M28 31h2" />
        <circle cx="18" cy="13.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="31" cy="13.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (id.includes('motor')) {
    return (
      <svg {...iconProps}>
        <circle cx="24" cy="23" r="14" fill="currentColor" opacity="0.06" />
        <circle cx="24" cy="23" r="10.5" />
        <circle cx="24" cy="23" r="3.5" fill="currentColor" opacity="0.16" />
        <path d="M24 12.5v6M24 27.5v6M13.5 23h6M28.5 23h6M16.6 15.6l4.2 4.2M31.4 30.4l-4.2-4.2M31.4 15.6l-4.2 4.2M16.6 30.4l4.2-4.2" />
        <path d="M17 37h14M20 40h8" />
      </svg>
    );
  }

  if (id.includes('engine')) {
    return (
      <svg {...iconProps}>
        <path d="M17 12h16v8H17z" fill="currentColor" opacity="0.08" />
        <path d="M14 20h22v16H14z" />
        <path d="M19 20v-5M31 20v-5M19 26h12M19 31h12" />
        <path d="M36 25h4v7h-4M14 28H9l-3 4M22 36v5h8v-5" />
        <circle cx="24" cy="9" r="2" />
        <path d="M24 11v4" />
      </svg>
    );
  }

  if (id.includes('propeller')) {
    return (
      <svg {...iconProps}>
        <circle cx="24" cy="24" r="3.4" fill="currentColor" opacity="0.18" />
        <path d="M22.4 21.7C14.5 11.4 8.2 11 5.5 15.6c3.1 4.7 9.1 6.7 18.2 6.7" />
        <path d="M25.6 26.3c7.9 10.3 14.2 10.7 16.9 6.1-3.1-4.7-9.1-6.7-18.2-6.7" />
        <path d="M26.3 22.4c10.3-7.9 10.7-14.2 6.1-16.9-4.7 3.1-6.7 9.1-6.7 18.2" />
        <path d="M21.7 25.6c-10.3 7.9-10.7 14.2-6.1 16.9 4.7-3.1 6.7-9.1 6.7-18.2" />
      </svg>
    );
  }

  if (id.includes('batter')) {
    return (
      <svg {...iconProps}>
        <rect x="9" y="15" width="30" height="20" rx="2.5" />
        <path d="M39 21h3v8h-3M15 20v10M21 20v10M27 20v10M33 20v10" />
        <path d="M14 24h4M30 24h5M32.5 21.5v5" />
        <rect x="11.5" y="17.5" width="25" height="15" rx="1.5" fill="currentColor" opacity="0.06" stroke="none" />
      </svg>
    );
  }

  if (id.includes('gimbal')) {
    return (
      <svg {...iconProps}>
        <path d="M15 12h18M18 12v8M30 12v8" />
        <path d="M16 20h16a4 4 0 0 1 4 4v5a11 11 0 0 1-22 0v-5a4 4 0 0 1 4-4z" />
        <circle cx="25" cy="29" r="6.2" fill="currentColor" opacity="0.08" />
        <circle cx="25" cy="29" r="3.2" />
        <path d="M8 29h6M36 29h4M25 8V5" />
      </svg>
    );
  }

  if (id.includes('data')) {
    return (
      <svg {...iconProps}>
        <rect x="12" y="17" width="24" height="16" rx="2.5" />
        <path d="M18 25h12M18 29h7M24 17v-5M20 12h8" />
        <path d="M14 13c5-5 15-5 20 0M10 38c8 5 20 5 28 0" />
        <circle cx="34" cy="24" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="34" cy="29" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (id.includes('remote')) {
    return (
      <svg {...iconProps}>
        <rect x="10" y="14" width="28" height="24" rx="4" fill="currentColor" opacity="0.05" />
        <rect x="10" y="14" width="28" height="24" rx="4" />
        <path d="M20 11h8M24 11V6M17 25h7M20.5 21.5v7" />
        <circle cx="31" cy="24" r="2.2" />
        <circle cx="27" cy="30" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="34" cy="30" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <rect x="12" y="12" width="24" height="24" rx="3" />
      <path d="M18 18h12v12H18zM8 18h4m-4 12h4m36-12h-4m4 12h-4M18 8v4m12-4v4m-12 36v-4m12 4v-4" />
    </svg>
  );
}
