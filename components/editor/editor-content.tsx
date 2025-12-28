'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { MarkdownPreview } from '@/components/editor/markdown-preview';
import { useTranslation } from '@/lib/i18n-provider';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClear: () => void;
}

export const SearchBar = React.memo(function SearchBar({
  searchQuery,
  onSearchChange,
  onClear,
}: SearchBarProps) {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in-down rounded-2xl border border-primary-400/30 bg-gradient-to-r from-gray-50 to-white px-6 py-4 shadow-lg shadow-primary-500/10 backdrop-blur-xl dark:border-primary-500/40 dark:from-slate-900/80 dark:to-slate-950/80 dark:shadow-primary-900/20">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary-500/10 p-2 ring-1 ring-primary-400/20">
          <Search className="h-4 w-4 text-primary-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('editor.search.placeholder')}
          className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-white dark:placeholder:text-white/50"
          autoFocus
        />
        {searchQuery && (
          <button
            onClick={onClear}
            className="rounded-lg bg-primary-500/10 px-3 py-1.5 text-xs font-medium text-primary-600 transition-all duration-200 hover:bg-primary-500/20 hover:text-primary-500 dark:text-primary-300 dark:hover:text-primary-200"
          >
            {t('common.actions.clear')}
          </button>
        )}
      </div>
    </div>
  );
});

interface EditorContentProps {
  content: string;
  showMarkdownPreview: boolean;
  onChange: (value: string) => void;
  textareaRef?: React.Ref<HTMLTextAreaElement>;
}

export const EditorContent = React.memo(function EditorContent({
  content,
  showMarkdownPreview,
  onChange,
  textareaRef,
}: EditorContentProps) {
  const { t } = useTranslation();

  if (showMarkdownPreview) {
    return <MarkdownPreview content={content} />;
  }

  return (
    <Textarea
      ref={textareaRef}
      value={content}
      onChange={(event) => onChange(event.target.value)}
      placeholder={t('editor.editor.placeholder')}
      className="min-h-[60vh] resize-none rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 text-base leading-relaxed text-gray-900 shadow-2xl shadow-black/10 backdrop-blur-sm transition-all duration-300 focus:border-primary-400/40 focus:ring-2 focus:ring-primary-400/20 dark:border-white/20 dark:from-slate-950/90 dark:via-slate-950/80 dark:to-slate-900/90 dark:text-white dark:shadow-black/40"
    />
  );
});

interface FileImportInputProps {
  inputRef: React.Ref<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileImportInput = React.memo(function FileImportInput({
  inputRef,
  onFileChange,
}: FileImportInputProps) {
  return (
    <input
      ref={inputRef}
      type="file"
      accept=".txt,.md,.text"
      onChange={onFileChange}
      className="hidden"
    />
  );
});
