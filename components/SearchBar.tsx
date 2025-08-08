'use client';

import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchSuggestions } from './SearchSuggestions';
import { Movie } from '@/types/movie';
import { useTranslation } from '@/hooks/useTranslation';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onMovieSelect?: (movie: Movie) => void;
}

export function SearchBar({ onSearch, onMovieSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch(query);
  };

  const handleMovieSelect = (movie: Movie) => {
    setQuery(movie.Title);
    onMovieSelect?.(movie);
  };
  return (
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          type="text"
            placeholder={t('searchPlaceholder')}
          value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          className="pl-10 h-12 text-base bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
        />
        </div>
      <Button 
        type="submit" 
        size="lg"
        className="h-12 px-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
          {t('searchButton')}
      </Button>
      </form>
      
      <SearchSuggestions
        query={query}
        onSelect={handleMovieSelect}
        isVisible={showSuggestions}
        onClose={() => setShowSuggestions(false)}
      />
    </div>
  );
}