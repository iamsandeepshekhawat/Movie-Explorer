'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MovieCard } from './MovieCard';
import { Movie } from '@/types/movie';
import { searchMovies } from '@/lib/omdbApi';
import { useTranslation } from '@/hooks/useTranslation';

interface RecommendationsProps {
  currentMovie: Movie;
  onMovieClick: (movie: Movie) => void;
}

export function Recommendations({ currentMovie, onMovieClick }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        const searchTerms = ['action', 'drama', 'comedy', 'thriller', 'adventure'];
        const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
        
        const response = await searchMovies(randomTerm, { type: currentMovie.Type, year: '' }, 1);
        if (response.Response === 'True') {
          const filtered = response.Search
            .filter(movie => movie.imdbID !== currentMovie.imdbID)
            .slice(0, 4);
          setRecommendations(filtered);
        }
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentMovie]);

  if (isLoading || recommendations.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-8"
    >
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
        {t('recommendations')}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.map((movie, index) => (
          <motion.div
            key={movie.imdbID}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <MovieCard movie={movie} onClick={() => onMovieClick(movie)} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}