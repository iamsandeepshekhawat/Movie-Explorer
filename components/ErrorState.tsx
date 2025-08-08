'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <motion.div 
      className="text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="mx-auto w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6"
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <AlertTriangle className="h-12 w-12 text-red-500" />
      </motion.div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
        {t('results.error')}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
        {message}
      </p>
      {onRetry && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={onRetry} variant="outline">
            {t('results.tryAgain')}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}