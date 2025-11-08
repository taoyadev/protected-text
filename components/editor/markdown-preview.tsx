'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { useTranslation } from '@/lib/i18n-provider';

interface Props {
  content: string;
}

export function MarkdownPreview({ content }: Props) {
  const { t } = useTranslation();

  return (
    <div className="prose dark:prose-invert prose-sm max-w-none rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/70 p-6 shadow-inner shadow-black/5 dark:shadow-black/40 min-h-[60vh] overflow-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          a: ({ ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline" />
          ),
          code: ({ className, children, ...props }: any) => {
            const isInline = !className || !className.includes('language-');
            return isInline ? (
              <code className="rounded bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 text-primary-300" {...props}>{children}</code>
            ) : (
              <code className="block rounded-lg bg-gray-50 dark:bg-white/5 p-4 overflow-x-auto" {...props}>{children}</code>
            );
          },
        }}
      >
        {content || t('editor.markdownPreview.emptyPlaceholder')}
      </ReactMarkdown>
    </div>
  );
}
