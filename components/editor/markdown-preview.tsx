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
    <div className="prose prose-sm min-h-[60vh] max-w-none overflow-auto rounded-3xl border border-gray-200 bg-white p-6 shadow-inner shadow-black/5 dark:prose-invert dark:border-white/10 dark:bg-slate-950/70 dark:shadow-black/40">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          a: ({ ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 underline hover:text-primary-300"
            />
          ),
          code: ({ className, children, ...props }: any) => {
            const isInline = !className || !className.includes('language-');
            return isInline ? (
              <code
                className="rounded bg-gray-100 px-1.5 py-0.5 text-primary-300 dark:bg-white/10"
                {...props}
              >
                {children}
              </code>
            ) : (
              <code
                className="block overflow-x-auto rounded-lg bg-gray-50 p-4 dark:bg-white/5"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content || t('editor.markdownPreview.emptyPlaceholder')}
      </ReactMarkdown>
    </div>
  );
}
