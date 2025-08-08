'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from '@/components/SearchBar';
import { MovieGrid } from '@/components/MovieGrid';
import { FilterControls } from '@/components/FilterControls';
import { Pagination } from '@/components/Pagination';
import { MovieDetailModal } from '@/components/MovieDetailModal';
import { Recommendations } from '@/components/Recommendations';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSelector } from '@/components/LanguageSelector';
import { InstallPrompt } from '@/components/InstallPrompt';
import { LoadingGrid } from '@/components/LoadingGrid';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { searchMovies, getMovieDetails } from '@/lib/omdbApi';
import { Movie, MovieDetail, SearchFilters } from '@/types/movie';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    type: '',
    year: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { t } = useTranslation();
  const itemsPerPage = 10;

  const handleSearch = useCallback(async (query: string, newFilters: SearchFilters, page: number = 1) => {
    if (!query.trim()) {
      setMovies([]);
      setTotalResults(0);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentPage(page);

    try {
      const response = await searchMovies(query, newFilters, page);
      
      if (response.Response === 'True') {
        setMovies(response.Search || []);
        setTotalResults(parseInt(response.totalResults) || 0);
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(response.Error || 'No results found');
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
      setTotalResults(0);
      toast.error('Failed to fetch movies');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleMovieClick = async (movie: Movie) => {
    try {
      setIsLoading(true);
      const details = await getMovieDetails(movie.imdbID);
      
      if (details.Response === 'True') {
        setSelectedMovie(details);
        setIsDetailModalOpen(true);
      } else {
        toast.error('Failed to load movie details');
      }
    } catch (err) {
      toast.error('Failed to load movie details');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    handleSearch(searchQuery, filters, page);
  };

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    if (searchQuery.trim()) {
      handleSearch(searchQuery, newFilters, 1);
    }
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    handleSearch(query, filters, 1);
  };

  const handleMovieSelect = (movie: Movie) => {
    handleMovieClick(movie);
  };

  useEffect(() => {
    // Initial search with popular term
    handleSearch('batman', filters, 1);
  }, [filters, handleSearch]);

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-900 dark:via-blue-900/10 dark:to-slate-800">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div></div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>

        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('title')}
          </motion.h1>
          <motion.p 
            className="text-slate-600 dark:text-slate-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <SearchBar onSearch={handleSearchSubmit} onMovieSelect={handleMovieSelect} />
        </motion.div>

        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <FilterControls 
            filters={filters} 
            onFilterChange={handleFilterChange}
          />
        </motion.div>

        {isLoading ? (
          <LoadingGrid />
        ) : error ? (
          <ErrorState 
            message={error} 
            onRetry={() => handleSearch(searchQuery, filters, currentPage)}
          />
        ) : movies.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="mb-6">
              <motion.p 
                className="text-sm text-slate-600 dark:text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {t('results.found')} {totalResults.toLocaleString()} {t('results.results')}
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MovieGrid 
                movies={movies} 
                onMovieClick={handleMovieClick}
              />
            </motion.div>
            
            {totalPages > 1 && (
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </motion.div>
            )}
          </>
        )}

        <MovieDetailModal
          movie={selectedMovie}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          onMovieClick={handleMovieClick}
        />

        <InstallPrompt />
        <Toaster richColors position="top-right" />
      </div>
    </div>
  );
}