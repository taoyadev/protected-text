'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

interface Props {
  content: string;
}

export function MarkdownPreview({ content }: Props) {
  return (
    <div className="prose prose-invert prose-sm max-w-none rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-inner shadow-black/40 min-h-[60vh] overflow-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline" />
          ),
          code: ({ node, inline, ...props }) =>
            inline ? (
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-primary-300" {...props} />
            ) : (
              <code className="block rounded-lg bg-white/5 p-4 overflow-x-auto" {...props} />
            ),
        }}
      >
        {content || '*Start typing to see preview...*'}
      </ReactMarkdown>
    </div>
  );
}
