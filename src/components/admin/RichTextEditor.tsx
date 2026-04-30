'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Code, Type } from 'lucide-react';

// ReactQuill MUST be loaded dynamically to avoid SSR document is not defined errors
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    height?: number;
}

export default function RichTextEditor({ value, onChange, placeholder, height = 300 }: RichTextEditorProps) {
    const [mode, setMode] = useState<'visual' | 'html'>('visual');
    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    }), []);

    return (
        <div style={{ height: `${height}px`, marginBottom: '40px', position: 'relative' }} className="rich-text-editor-container">
            <button
                type="button"
                onClick={() => setMode(m => m === 'visual' ? 'html' : 'visual')}
                style={{
                    position: 'absolute',
                    top: '-32px',
                    right: '0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'none',
                    border: 'none',
                    color: '#3b82f6',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    zIndex: 10
                }}
            >
                {mode === 'visual' ? <><Code size={16} /> 切换至 HTML 代码</> : <><Type size={16} /> 切换至可视化</>}
            </button>

            {mode === 'visual' ? (
                <ReactQuill 
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    placeholder={placeholder}
                    style={{ height: `${height - 42}px` }} // account for toolbar height
                />
            ) : (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    style={{
                        width: '100%',
                        height: `${height}px`,
                        padding: '16px',
                        fontFamily: 'monospace',
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        backgroundColor: '#f8fafc',
                        color: '#1e293b',
                        resize: 'none',
                        boxSizing: 'border-box'
                    }}
                    spellCheck={false}
                />
            )}
            <style jsx global>{`
                .rich-text-editor-container .ql-editor {
                    font-family: inherit;
                    font-size: 1.05rem;
                    line-height: 1.6;
                    color: #1e293b;
                }
                .rich-text-editor-container .ql-toolbar {
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    border-color: #cbd5e1;
                    background-color: #f8fafc;
                }
                .rich-text-editor-container .ql-container {
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                    border-color: #cbd5e1;
                }
                /* Fix for giant arrows caused by global SVG resets */
                .rich-text-editor-container .ql-picker-label svg {
                    width: 18px !important;
                    height: 18px !important;
                    vertical-align: middle;
                }
            `}</style>
        </div>
    );
}
