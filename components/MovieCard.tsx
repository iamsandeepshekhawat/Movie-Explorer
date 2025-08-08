'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Movie } from '@/types/movie';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Film } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card 
        className="group cursor-pointer transition-all duration-300 hover:shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 overflow-hidden"
      onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        {movie.Poster && movie.Poster !== 'N/A' ? (
            <motion.img
            src={movie.Poster}
            alt={movie.Title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
          />
        ) : (
          <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <Film className="h-12 w-12 text-slate-400" />
          </div>
        )}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          className="absolute inset-0 bg-white/10 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <CardContent className="p-4">
        <motion.h3 
          className="font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 transition-colors"
          animate={{ color: isHovered ? '#2563eb' : undefined }}
        >
          {movie.Title}
        </motion.h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
            <Calendar className="h-3 w-3" />
            <span>{movie.Year}</span>
          </div>
          
          <Badge 
            variant="secondary" 
            className="text-xs capitalize bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
          >
            {movie.Type}
          </Badge>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}