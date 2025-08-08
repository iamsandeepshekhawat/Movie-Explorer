'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <Skeleton className="aspect-[2/3] w-full" />
          <CardContent className="p-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-12" />
            </div>
          </CardContent>
        </Card>
        </motion.div>
      ))}
    </div>
  );
}