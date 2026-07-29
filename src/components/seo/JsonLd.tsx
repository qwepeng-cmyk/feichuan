type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export default function JsonLd({ data }: JsonLdProps) {
  const sanitizedData = sanitizePublicStructuredData(data);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(sanitizedData).replace(/</g, '\\u003c'),
      }}
    />
  );
}
import { sanitizePublicStructuredData } from '@/lib/publicCopy';
