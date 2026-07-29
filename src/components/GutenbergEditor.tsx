import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Youtube } from "@tiptap/extension-youtube";
import { Link } from "@tiptap/extension-link";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { Placeholder } from "@tiptap/extension-placeholder";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code,
  Heading1, Heading2, Heading3, List, ListOrdered, Quote,
  Minus, Undo, Redo, Link as LinkIcon, Image as ImageIcon,
  Youtube as YoutubeIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Table as TableIcon, CheckSquare
} from "lucide-react";
import { MediaAsset } from "../types";

interface WordEditorProps {
  value: string;
  onChange: (html: string) => void;
  mediaAssets: MediaAsset[];
  onOpenMediaSelector: (onSelect: (url: string, altText?: string) => void) => void;
}

const MenuBar = ({ editor, onOpenMediaSelector }: { editor: any, onOpenMediaSelector: any }) => {
  if (!editor) return null;

  const addImage = () => {
    onOpenMediaSelector((url: string, altText?: string) => {
      const alt = altText || window.prompt("Enter SEO alt text for this image:") || "";
      editor.chain().focus().setImage({ src: url, alt }).run();
    });
  };

  const addYoutube = () => {
    const url = prompt("Enter YouTube URL");
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    
    if (url === null) return;
    
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    
    editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run();
  };

  const btnClass = "p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors";
  const activeBtnClass = "p-1.5 rounded bg-blue-600 text-white transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-slate-800 p-2 bg-slate-900/50 rounded-t-xl sticky top-0 z-10">
      <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={btnClass}><Undo className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={btnClass}><Redo className="w-4 h-4" /></button>
      <div className="w-px h-6 bg-slate-800 mx-1"></div>
      
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? activeBtnClass : btnClass}><Bold className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? activeBtnClass : btnClass}><Italic className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? activeBtnClass : btnClass}><UnderlineIcon className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? activeBtnClass : btnClass}><Strikethrough className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive('code') ? activeBtnClass : btnClass}><Code className="w-4 h-4" /></button>
      <button type="button" onClick={addLink} className={editor.isActive('link') ? activeBtnClass : btnClass}><LinkIcon className="w-4 h-4" /></button>
      <div className="w-px h-6 bg-slate-800 mx-1"></div>
      
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? activeBtnClass : btnClass}><Heading1 className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? activeBtnClass : btnClass}><Heading2 className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? activeBtnClass : btnClass}><Heading3 className="w-4 h-4" /></button>
      <div className="w-px h-6 bg-slate-800 mx-1"></div>

      <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? activeBtnClass : btnClass}><AlignLeft className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? activeBtnClass : btnClass}><AlignCenter className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? activeBtnClass : btnClass}><AlignRight className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? activeBtnClass : btnClass}><AlignJustify className="w-4 h-4" /></button>
      <div className="w-px h-6 bg-slate-800 mx-1"></div>

      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? activeBtnClass : btnClass}><List className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? activeBtnClass : btnClass}><ListOrdered className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleTaskList().run()} className={editor.isActive('taskList') ? activeBtnClass : btnClass}><CheckSquare className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? activeBtnClass : btnClass}><Quote className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btnClass}><Minus className="w-4 h-4" /></button>
      <div className="w-px h-6 bg-slate-800 mx-1"></div>

      <button type="button" onClick={addImage} className={btnClass}><ImageIcon className="w-4 h-4" /></button>
      <button type="button" onClick={addYoutube} className={btnClass}><YoutubeIcon className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className={btnClass}><TableIcon className="w-4 h-4" /></button>
    </div>
  );
};

export default function GutenbergEditor({ value, onChange, mediaAssets, onOpenMediaSelector }: WordEditorProps) {
  const [isReady, setIsReady] = useState(false);
  const isFirstRender = useRef(true);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        codeBlock: { HTMLAttributes: { class: "bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4" } },
        blockquote: { HTMLAttributes: { class: "border-l-4 border-blue-500 pl-4 py-1 italic text-slate-300 my-4 bg-slate-800/30 rounded-r-lg" } }
      }),
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-blue-400 underline" } }),
      Image.configure({ HTMLAttributes: { class: "max-w-full h-auto rounded-xl my-4 mx-auto" } }),
      Youtube.configure({ HTMLAttributes: { class: "w-full aspect-video rounded-xl my-4" } }),
      TaskList.configure({ HTMLAttributes: { class: "list-none p-0 my-4 space-y-2" } }),
      TaskItem.configure({ nested: true, HTMLAttributes: { class: "flex gap-2 items-start" } }),
      Table.configure({ resizable: true, HTMLAttributes: { class: "w-full border-collapse border border-slate-700 my-4 text-sm" } }),
      TableRow,
      TableHeader.configure({ HTMLAttributes: { class: "border border-slate-700 p-2 bg-slate-800 font-bold" } }),
      TableCell.configure({ HTMLAttributes: { class: "border border-slate-700 p-2" } }),
      Placeholder.configure({ placeholder: "Start typing or use the toolbar to build your article..." })
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onCreate: () => {
      setIsReady(true);
    },
    editorProps: {
      attributes: {
        class: "max-w-none focus:outline-none min-h-[400px] p-6 pb-20 leading-relaxed text-slate-200"
      },
      handleClick: (view, pos, event) => {
        if (event.target instanceof HTMLImageElement) {
          const img = event.target;
          const currentAlt = img.alt || '';
          
          // Small delay to let ProseMirror select the image first
          setTimeout(() => {
            const newAlt = window.prompt("Update SEO alt text (or leave empty):", currentAlt);
            if (newAlt !== null) {
              editor.commands.updateAttributes('image', { alt: newAlt });
            }
          }, 50);
          return false; // let ProseMirror handle the selection
        }
        return false;
      }
    }
  });

  useEffect(() => {
    if (editor && isFirstRender.current && value) {
      if (editor.getHTML() !== value) {
        editor.commands.setContent(value);
      }
      isFirstRender.current = false;
    }
  }, [value, editor]);

  if (!editor) {
    return <div className="min-h-[500px] flex items-center justify-center bg-slate-900 border border-slate-800 rounded-2xl animate-pulse">Loading Editor...</div>;
  }

  return (
    <div className="flex flex-col bg-slate-950 border border-slate-800 rounded-2xl shadow-xl overflow-hidden tiptap-container relative">
      <MenuBar editor={editor} onOpenMediaSelector={onOpenMediaSelector} />
      
      <div className="flex-1 overflow-y-auto max-h-[800px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent p-4 relative">
        <EditorContent editor={editor} />
      </div>
      
      <style>{`
        /* TipTap specific styles for list and structure */
        .tiptap-container .ProseMirror ul[data-type="taskList"] {
          list-style: none;
          padding: 0;
        }
        .tiptap-container .ProseMirror ul[data-type="taskList"] li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }
        .tiptap-container .ProseMirror ul[data-type="taskList"] li > label {
          margin-top: 0.2rem;
          user-select: none;
        }
        .tiptap-container .ProseMirror ul[data-type="taskList"] li > div {
          flex: 1;
        }
        .tiptap-container .ProseMirror p.is-editor-empty:first-child::before {
          color: #64748b;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .tiptap-container .ProseMirror ul:not([data-type="taskList"]) {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .tiptap-container .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .tiptap-container .ProseMirror h1 { font-size: 2.25rem; font-weight: 800; margin-top: 2rem; margin-bottom: 1rem; color: #f8fafc; }
        .tiptap-container .ProseMirror h2 { font-size: 1.875rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #f8fafc; }
        .tiptap-container .ProseMirror h3 { font-size: 1.5rem; font-weight: 600; margin-top: 1.25rem; margin-bottom: 0.5rem; color: #f1f5f9; }
        .tiptap-container .ProseMirror p { color: #f8fafc !important; }
        .tiptap-container .ProseMirror { color: #f8fafc !important; }
        
      
        .tiptap-container .ProseMirror * { color: #e2e8f0 !important; }
        .tiptap-container .ProseMirror h1, 
        .tiptap-container .ProseMirror h2, 
        .tiptap-container .ProseMirror h3, 
        .tiptap-container .ProseMirror h4, 
        .tiptap-container .ProseMirror h5, 
        .tiptap-container .ProseMirror h6, 
        .tiptap-container .ProseMirror p, 
        .tiptap-container .ProseMirror li, 
        .tiptap-container .ProseMirror strong, 
        .tiptap-container .ProseMirror em {
          color: #f8fafc !important;
        }
      `}</style>
    </div>
  );
}
