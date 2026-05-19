'use client';

import React, { useMemo, useRef, useState } from 'react';
import { Image as ImageIcon, Loader2, Upload } from 'lucide-react';

type ResourceType = 'products' | 'solutions' | 'cases';

type MainImageUploaderProps = {
    resourceType: ResourceType;
    value: string;
    onChange: (url: string) => void;
    entityHandle?: string;
    entityName?: string;
    previewFit?: 'cover' | 'contain';
    placeholder?: string;
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #dde3eb',
    fontSize: '1.35rem',
    outline: 'none',
    color: '#334155',
    boxSizing: 'border-box',
};

function fallbackHandle(value?: string) {
    return (value || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export default function MainImageUploader({
    resourceType,
    value,
    onChange,
    entityHandle,
    entityName,
    previewFit = 'contain',
    placeholder = '/products/category/image.webp',
}: MainImageUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const seoHandle = useMemo(
        () => fallbackHandle(entityHandle) || fallbackHandle(entityName),
        [entityHandle, entityName]
    );

    const uploadFile = async (file: File) => {
        setUploading(true);
        setError('');
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('resourceType', resourceType);
            formData.append('entityHandle', seoHandle);
            formData.append('entityName', entityName || seoHandle || 'main image');

            const response = await fetch('/api/admin/upload-main-image', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Upload failed');
            }

            onChange(data.url);
            setMessage(`Uploaded as ${data.fileName}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <input
                        style={inputStyle}
                        value={value || ''}
                        onChange={(event) => onChange(event.target.value)}
                        placeholder={placeholder}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '7px',
                                padding: '9px 14px',
                                borderRadius: '8px',
                                border: '1px solid #bfdbfe',
                                background: uploading ? '#eff6ff' : '#f8fbff',
                                color: '#315ba4',
                                cursor: uploading ? 'wait' : 'pointer',
                                fontWeight: 700,
                                fontSize: '1.25rem',
                            }}
                        >
                            {uploading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={16} />}
                            {uploading ? 'Uploading...' : 'Upload main image'}
                        </button>
                        <span style={{ color: '#64748b', fontSize: '1.18rem', lineHeight: 1.5 }}>
                            WebP, readable path, cache-safe filename. Alt text uses the page title.
                        </span>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/avif"
                        onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) uploadFile(file);
                        }}
                        style={{ display: 'none' }}
                    />
                    {seoHandle && (
                        <div style={{ marginTop: '8px', color: '#64748b', fontSize: '1.15rem' }}>
                            SEO path handle: <code style={{ color: '#334155' }}>{seoHandle}</code>
                        </div>
                    )}
                    {message && <div style={{ marginTop: '8px', color: '#15803d', fontSize: '1.15rem', fontWeight: 600 }}>{message}</div>}
                    {error && <div style={{ marginTop: '8px', color: '#b91c1c', fontSize: '1.15rem', fontWeight: 600 }}>{error}</div>}
                </div>
                {value ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={value}
                        alt="Main image preview"
                        style={{
                            width: '120px',
                            height: '90px',
                            objectFit: previewFit,
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: '#f8fafc',
                        }}
                    />
                ) : (
                    <div style={{
                        width: '120px',
                        height: '90px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        border: '1px dashed #cbd5e1',
                        color: '#94a3b8',
                        backgroundColor: '#f8fafc',
                    }}>
                        <ImageIcon size={28} />
                    </div>
                )}
            </div>
            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
