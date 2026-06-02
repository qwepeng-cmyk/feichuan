'use client';

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Gapcursor from '@tiptap/extension-gapcursor';
import Dropcursor from '@tiptap/extension-dropcursor';
import { 
    Bold, Italic, List, ListOrdered, Link as LinkIcon, 
    Image as ImageIcon, Code, Type, Heading1, Heading2, 
    Undo, Redo, Quote, Minus
} from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    height?: number;
}

const MenuButton = ({ onClick, isActive, disabled, children, title }: any) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        title={title}
        style={{
            padding: '6px',
            borderRadius: '4px',
            border: 'none',
            background: isActive ? '#e2e8f0' : 'transparent',
            color: isActive ? '#2563eb' : '#475569',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            outline: 'none'
        }}
    >
        {children}
    </button>
);

export default function RichTextEditor({ value, onChange, placeholder, height = 400 }: RichTextEditorProps) {
    const [mode, setMode] = useState<'visual' | 'html'>('visual');
    const [htmlValue, setHtmlValue] = useState(value);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                link: false,
                gapcursor: false,
                dropcursor: false,
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'editor-image',
                },
            }),
            Link.configure({
                openOnClick: false,
            }),
            Gapcursor,
            Dropcursor.configure({
                color: '#3b82f6',
                width: 2,
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Start writing...',
            }),
        ],
        content: value,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setHtmlValue(html);
            onChange(html);
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value, { emitUpdate: false });
        }
        if (value !== htmlValue) {
            setHtmlValue(value);
        }
    }, [value, editor, htmlValue]);

    if (!editor) return null;

    const addImage = () => {
        const url = window.prompt('Enter image URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const url = window.prompt('Enter URL');
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div style={{ marginBottom: '40px', position: 'relative' }} className="rich-text-editor-container">
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
                {mode === 'visual' ? (
                    <><Code size={16} /> 切换至 HTML 代码</>
                ) : (
                    <><Type size={16} /> 切换至可视化</>
                )}
            </button>

            <div style={{
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {mode === 'visual' && (
                    <div style={{
                        padding: '8px',
                        background: '#f8fafc',
                        borderBottom: '1px solid #cbd5e1',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4px'
                    }}>
                        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })}><Heading1 size={18} /></MenuButton>
                        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}><Heading2 size={18} /></MenuButton>
                        <div style={{ width: '1px', background: '#cbd5e1', margin: '0 4px' }} />
                        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}><Bold size={18} /></MenuButton>
                        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}><Italic size={18} /></MenuButton>
                        <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')}><Quote size={18} /></MenuButton>
                        <div style={{ width: '1px', background: '#cbd5e1', margin: '0 4px' }} />
                        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}><List size={18} /></MenuButton>
                        <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}><ListOrdered size={18} /></MenuButton>
                        <div style={{ width: '1px', background: '#cbd5e1', margin: '0 4px' }} />
                        <MenuButton onClick={setLink} isActive={editor.isActive('link')}><LinkIcon size={18} /></MenuButton>
                        <MenuButton onClick={addImage}><ImageIcon size={18} /></MenuButton>
                        <MenuButton onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus size={18} /></MenuButton>
                        <div style={{ flex: 1 }} />
                        <MenuButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}><Undo size={18} /></MenuButton>
                        <MenuButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}><Redo size={18} /></MenuButton>
                    </div>
                )}

                {mode === 'visual' ? (
                    <div style={{ height: `${height}px`, overflowY: 'auto' }} className="tiptap-wrapper">
                        <EditorContent editor={editor} />
                    </div>
                ) : (
                    <textarea
                        value={htmlValue}
                        onChange={(e) => {
                            const val = e.target.value;
                            setHtmlValue(val);
                            onChange(val);
                            editor.commands.setContent(val, { emitUpdate: false });
                        }}
                        style={{
                            width: '100%',
                            height: `${height}px`,
                            padding: '16px',
                            fontFamily: 'monospace',
                            fontSize: '1rem',
                            lineHeight: '1.6',
                            border: 'none',
                            backgroundColor: '#f8fafc',
                            color: '#1e293b',
                            resize: 'none',
                            boxSizing: 'border-box',
                            outline: 'none'
                        }}
                        spellCheck={false}
                    />
                )}
            </div>

            <style jsx global>{`
                .tiptap-wrapper .ProseMirror {
                    min-height: 100%;
                    padding: 20px;
                    outline: none;
                    font-size: 1.05rem;
                    line-height: 1.7;
                    color: #1e293b;
                }
                .tiptap-wrapper .ProseMirror p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #adb5bd;
                    pointer-events: none;
                    height: 0;
                }
                .tiptap-wrapper .ProseMirror img {
                    max-width: 100%;
                    height: auto;
                    display: block;
                    margin: 1.5rem 0;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 2px solid transparent;
                }
                .tiptap-wrapper .ProseMirror img.ProseMirror-selectednode {
                    outline: 3px solid #3b82f6;
                    box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.1);
                }
                .tiptap-wrapper .ProseMirror .ProseMirror-gapcursor {
                    position: relative;
                    pointer-events: none;
                }
                .tiptap-wrapper .ProseMirror .ProseMirror-gapcursor:after {
                    content: "";
                    display: block;
                    position: absolute;
                    top: -2px;
                    width: 2px;
                    background: #3b82f6;
                    height: 24px;
                    animation: tiptap-cursor-blink 1.1s steps(2, start) infinite;
                }
                @keyframes tiptap-cursor-blink {
                    to { visibility: hidden; }
                }
                .tiptap-wrapper .ProseMirror blockquote {
                    border-left: 4px solid #cbd5e1;
                    padding-left: 1rem;
                    margin-left: 0;
                    color: #64748b;
                    font-style: italic;
                }
                .tiptap-wrapper .ProseMirror ul, 
                .tiptap-wrapper .ProseMirror ol {
                    padding-left: 1.5rem;
                }
                .tiptap-wrapper .ProseMirror h1 { font-size: 2.2rem; margin-bottom: 1rem; font-weight: 800; }
                .tiptap-wrapper .ProseMirror h2 { font-size: 1.8rem; margin-bottom: 0.8rem; font-weight: 700; }
            `}</style>
        </div>
    );
}
