export const STATIC_ASSET_VERSION = '2026060102';

export function withStaticAssetVersion(src?: string | null) {
  if (!src) return '';
  if (!src.startsWith('/')) return src;

  const separator = src.includes('?') ? '&' : '?';
  return `${src}${separator}v=${STATIC_ASSET_VERSION}`;
}
