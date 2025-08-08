'use client';

import { motion } from 'framer-motion';
import { MovieDetail } from '@/types/movie';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Recommendations } from './Recommendations';
import { Star, Calendar, Clock, Globe, Award, Film } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Movie } from '@/types/movie';

interface MovieDetailModalProps {
  movie: MovieDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onMovieClick?: (movie: Movie) => void;
}

export function MovieDetailModal({ movie, isOpen, onClose, onMovieClick }: MovieDetailModalProps) {
  const { t } = useTranslation();

  if (!movie) return null;

  const imdbRating = parseFloat(movie.imdbRating);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {movie.Title}
            </DialogTitle>
          </motion.div>
        </DialogHeader>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="md:col-span-1">
            {movie.Poster && movie.Poster !== 'N/A' ? (
              <motion.img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full rounded-lg shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <div className="aspect-[2/3] bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <Film className="h-16 w-16 text-slate-400" />
              </div>
            )}
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <motion.div 
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Badge variant="outline" className="capitalize">
                {movie.Type}
              </Badge>
              <Badge variant="outline">{movie.Rated}</Badge>
              {movie.Genre.split(', ').map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 gap-4 text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                <span>{movie.Released}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-500" />
                <span>{movie.Runtime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-slate-500" />
                <span>{movie.Language}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-slate-500" />
                <span>{movie.Country}</span>
              </div>
            </motion.div>

            {movie.imdbRating !== 'N/A' && (
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-semibold text-lg">{movie.imdbRating}</span>
                  <span className="text-slate-500">/10</span>
                </div>
                {movie.Metascore !== 'N/A' && (
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-slate-500">Metascore:</span>
                    <span className="font-medium">{movie.Metascore}</span>
                  </div>
                )}
              </motion.div>
            )}

            <Separator />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <h4 className="font-semibold mb-2">{t('details.plot')}</h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {movie.Plot}
              </p>
            </motion.div>

            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <div>
                <span className="font-medium">{t('details.director')}:</span>
                <span className="ml-2 text-slate-700 dark:text-slate-300">
                  {movie.Director}
                </span>
              </div>
              <div>
                <span className="font-medium">{t('details.writer')}:</span>
                <span className="ml-2 text-slate-700 dark:text-slate-300">
                  {movie.Writer}
                </span>
              </div>
              <div>
                <span className="font-medium">{t('details.actors')}:</span>
                <span className="ml-2 text-slate-700 dark:text-slate-300">
                  {movie.Actors}
                </span>
              </div>
            </motion.div>

            {movie.Awards !== 'N/A' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <span className="font-medium">{t('details.awards')}:</span>
                <span className="ml-2 text-slate-700 dark:text-slate-300">
                  {movie.Awards}
                </span>
              </motion.div>
            )}

            {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
              >
                <span className="font-medium">{t('details.boxOffice')}:</span>
                <span className="ml-2 text-slate-700 dark:text-slate-300">
                  {movie.BoxOffice}
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {onMovieClick && (
          <Recommendations 
            currentMovie={movie as Movie} 
            onMovieClick={onMovieClick}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}