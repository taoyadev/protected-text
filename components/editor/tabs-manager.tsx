'use client';

import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { EncryptedEditor } from './encrypted-editor';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n-provider';

interface Tab {
  id: string;
  siteName: string;
  title: string;
}

interface Props {
  initialSiteName?: string;
}

const STORAGE_KEY = 'protected-text-tabs';
const MAX_TABS = 10;

export function TabsManager({ initialSiteName }: Props) {
  const { t } = useTranslation();
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [showNewTabInput, setShowNewTabInput] = useState(false);
  const [newTabName, setNewTabName] = useState('');

  // Initialize tabs from localStorage or create initial tab
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.tabs && Array.isArray(parsed.tabs) && parsed.tabs.length > 0) {
          setTabs(parsed.tabs);
          setActiveTabId(parsed.activeTabId || parsed.tabs[0].id);
          return;
        }
      } catch (e) {
        console.error('Failed to parse stored tabs', e);
      }
    }

    // Create initial tab
    if (initialSiteName) {
      const initialTab: Tab = {
        id: `tab-${Date.now()}`,
        siteName: initialSiteName,
        title: initialSiteName,
      };
      setTabs([initialTab]);
      setActiveTabId(initialTab.id);
    }
  }, [initialSiteName]);

  // Persist tabs to localStorage
  useEffect(() => {
    if (tabs.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ tabs, activeTabId }));
    }
  }, [tabs, activeTabId]);

  const addNewTab = (siteName: string) => {
    if (!siteName.trim()) return;
    if (tabs.length >= MAX_TABS) {
      return;
    }

    // Check if tab already exists
    const existingTab = tabs.find(t => t.siteName === siteName);
    if (existingTab) {
      setActiveTabId(existingTab.id);
      setShowNewTabInput(false);
      setNewTabName('');
      return;
    }

    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      siteName,
      title: siteName,
    };

    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setShowNewTabInput(false);
    setNewTabName('');
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const tabIndex = tabs.findIndex(t => t.id === tabId);
    const newTabs = tabs.filter(t => t.id !== tabId);

    if (newTabs.length === 0) {
      setTabs([]);
      setActiveTabId(null);
      return;
    }

    setTabs(newTabs);

    // If closing active tab, switch to adjacent tab
    if (activeTabId === tabId) {
      const newActiveIndex = Math.min(tabIndex, newTabs.length - 1);
      setActiveTabId(newTabs[newActiveIndex].id);
    }
  };

  const activeTab = tabs.find(t => t.id === activeTabId);

  if (tabs.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-600 dark:text-white/70">{t('common.states.noTabsOpen')}</p>
          <Button onClick={() => setShowNewTabInput(true)}>
            <Plus className="h-4 w-4 mr-2" />
            {t('common.actions.createNewTab')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Tab Bar */}
      <div className="sticky top-0 z-30 border-b border-gray-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-lg">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`group relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 min-w-[120px] max-w-[200px] ${
                  activeTabId === tab.id
                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 ring-1 ring-primary-400/30'
                    : 'text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <span className="truncate flex-1">{tab.title}</span>
                <button
                  onClick={(e) => closeTab(tab.id, e)}
                  className="rounded p-0.5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                  aria-label={t('common.actions.closeTab')}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </button>
            ))}

            {/* Add Tab Button */}
            {tabs.length < MAX_TABS && (
              <div className="relative">
                {showNewTabInput ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newTabName}
                      onChange={(e) => setNewTabName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addNewTab(newTabName);
                        if (e.key === 'Escape') {
                          setShowNewTabInput(false);
                          setNewTabName('');
                        }
                      }}
                      placeholder={t('common.placeholders.enterSiteName')}
                      className="rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-gray-900 dark:text-white focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 w-40"
                      autoFocus
                    />
                    <Button size="sm" onClick={() => addNewTab(newTabName)}>
                      {t('common.actions.add')}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setShowNewTabInput(false);
                        setNewTabName('');
                      }}
                    >
                      {t('common.actions.cancel')}
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowNewTabInput(true)}
                    className="rounded-lg p-2 text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                    title={t('common.actions.createNewTab')}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Tab Content */}
      <div className="flex-1">
        {activeTab && (
          <main className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12">
            <EncryptedEditor key={activeTab.id} siteName={activeTab.siteName} />
          </main>
        )}
      </div>
    </div>
  );
}
