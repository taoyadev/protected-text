'use client';

import { useState, useEffect } from 'react';
import { X, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Version {
  encrypted: string;
  iv: string;
  salt: string;
  timestamp: number;
  version: number;
  size: number;
}

interface Props {
  open: boolean;
  siteName: string;
  onClose: () => void;
  onRestore: (version: Version) => Promise<void>;
}

export function VersionHistoryDialog({ open, siteName, onClose, onRestore }: Props) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadVersions();
    }
  }, [open, siteName]);

  const loadVersions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/versions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteName }),
      });
      const data = await response.json();
      setVersions(data.versions || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load version history');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (version: Version) => {
    try {
      await onRestore(version);
      toast.success('Version restored');
      onClose();
    } catch (err) {
      toast.error('Failed to restore version');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary-400" />
            <h2 className="text-xl font-semibold text-white">Version History</h2>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-white/70">
            Loading versions...
          </div>
        ) : versions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-white/50">
            <History className="mb-3 h-12 w-12 opacity-30" />
            <p>No version history available yet</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-2">
            {versions.map((version, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-800/40 p-4 hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    Version {versions.length - index}
                  </p>
                  <p className="text-xs text-white/50">
                    {new Date(version.timestamp).toLocaleString()} · {version.size} characters
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => handleRestore(version)}
                >
                  Restore
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
