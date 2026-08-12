'use client';

import { useState, useTransition, useEffect } from 'react';
import { saveChapter } from '@/app/actions/handbook';
import { Save, ArrowLeft, PanelRightClose, PanelRightOpen, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Editor({
  slug,
  initialContent,
}: {
  slug: string;
  initialContent: string;
}) {
  const [content, setContent] = useState(initialContent);
  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');
  const [previewKey, setPreviewKey] = useState(Date.now());
  const [showPreview, setShowPreview] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [content]);

  const handleSave = () => {
    startTransition(async () => {
      await saveChapter(slug, content);
      setSaveStatus('saved');
      setPreviewKey(Date.now()); // force iframe refresh
      setTimeout(() => setSaveStatus('idle'), 2000);
      router.refresh();
    });
  };

  return (
    <div className="h-screen flex flex-col bg-paper">
      {/* Global Header */}
      <header className="flex-none h-14 border-b border-rule flex items-center justify-between px-4 bg-white/50">
        <div className="flex items-center gap-4">
          <Link href="/write" className="text-muted hover:text-ink transition-colors p-2 -ml-2 rounded-none hover:bg-black/5">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-mono text-sm font-semibold">{slug}.mdx</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted font-mono">
            {saveStatus === 'saved' ? 'Saved!' : 'Cmd + S to save'}
          </span>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="flex items-center gap-2 bg-ink text-paper px-4 py-1.5 rounded-none text-sm font-medium hover:bg-ink/90 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isPending ? 'Saving...' : 'Save'}
          </button>
        </div>
      </header>

      {/* Editor & Preview Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Code Editor Pane */}
        <div className={`flex flex-col ${showPreview ? 'w-1/2 border-r border-rule' : 'w-full items-center bg-white/30'}`}>
          
          {/* Pane Toolbar */}
          <div className={`h-8 border-b border-rule bg-paper flex items-center justify-between px-4 ${showPreview ? 'w-full' : 'w-full max-w-4xl border-l border-r'}`}>
            <span className="font-mono text-xs text-muted uppercase tracking-widest">Markdown Editor</span>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="text-muted hover:text-ink flex items-center gap-1.5 transition-colors"
              title={showPreview ? "Hide Preview" : "Show Preview"}
            >
              {showPreview ? (
                <><EyeOff className="w-3.5 h-3.5" /><span className="text-xs font-mono">Hide Preview</span></>
              ) : (
                <><Eye className="w-3.5 h-3.5" /><span className="text-xs font-mono">Show Preview</span></>
              )}
            </button>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`flex-1 p-6 lg:p-12 bg-transparent font-mono text-sm leading-relaxed focus:outline-none resize-none whitespace-pre ${showPreview ? 'w-full' : 'w-full max-w-4xl border-l border-r border-rule bg-white'}`}
            spellCheck="false"
            placeholder="Write your markdown here..."
          />
        </div>

        {/* Live Preview Pane (iframe) */}
        {showPreview && (
          <div className="w-1/2 bg-white flex flex-col">
            <div className="h-8 border-b border-rule bg-paper flex items-center px-4">
              <span className="font-mono text-xs text-muted uppercase tracking-widest">Live Preview</span>
            </div>
            <iframe
              key={previewKey}
              src={`/preview/${slug}`}
              className="flex-1 w-full h-full border-none"
              title="Live Preview"
            />
          </div>
        )}
      </div>
    </div>
  );
}
