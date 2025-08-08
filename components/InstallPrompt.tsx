'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWA } from '@/hooks/usePWA';
import { useTranslation } from '@/hooks/useTranslation';
import { useState } from 'react';

export function InstallPrompt() {
  const { isInstallable, installApp } = usePWA();
  const { t } = useTranslation();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isInstallable || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-4 max-w-sm"
      >
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
              {t('installApp')}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Install Movie Explorer for quick access and offline viewing.
            </p>
            <div className="flex gap-2">
              <Button onClick={installApp} size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Install
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsDismissed(true)}
              >
                Later
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setIsDismissed(true)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}