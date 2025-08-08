'use client';

import { motion } from 'framer-motion';
import { Search, Film } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function EmptyState() {
  const { t } = useTranslation();

  return (
    <motion.div 
      className="text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="mx-auto w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Search className="h-12 w-12 text-slate-400" />
      </motion.div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
        {t('results.startSearch')}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
        {t('results.startSearchDesc')}
      </p>
    </motion.div>
  );
}