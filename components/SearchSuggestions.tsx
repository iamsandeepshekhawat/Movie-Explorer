'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useDebounce } from 'use-debounce';
import { searchMovies } from '@/lib/omdbApi';
import { Movie } from '@/types/movie';
import { Film, Calendar } from 'lucide-react';

interface SearchSuggestionsProps {
  query: string;
  onSelect: (movie: Movie) => void;
  isVisible: boolean;
  onClose: () => void;
}

export function SearchSuggestions({ query, onSelect, isVisible, onClose }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim() || !isVisible) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const response = await searchMovies(debouncedQuery, { type: '', year: '' }, 1);
        if (response.Response === 'True') {
          setSuggestions(response.Search.slice(0, 5));
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery, isVisible]);

  if (!isVisible || (!isLoading && suggestions.length === 0)) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 right-0 z-50 mt-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl overflow-hidden"
      >
        {isLoading ? (
          <div className="p-4 text-center text-slate-500">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            {suggestions.map((movie, index) => (
              <motion.div
                key={movie.imdbID}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                onClick={() => {
                  onSelect(movie);
                  onClose();
                }}
              >
                <div className="w-12 h-16 flex-shrink-0 rounded overflow-hidden bg-slate-200 dark:bg-slate-700">
                  {movie.Poster && movie.Poster !== 'N/A' ? (
                    <Image
                      src={movie.Poster}
                      alt={movie.Title}
                      width={48}
                      height={64}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Film className="h-4 w-4 text-slate-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 truncate">
                    {movie.Title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Calendar className="h-3 w-3" />
                    <span>{movie.Year}</span>
                    <span className="capitalize">• {movie.Type}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}