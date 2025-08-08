'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SearchFilters } from '@/types/movie';
import { useTranslation } from '@/hooks/useTranslation';

interface FilterControlsProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

export function FilterControls({ filters, onFilterChange }: FilterControlsProps) {
  const { t } = useTranslation();

  const handleTypeChange = (value: string) => {
    onFilterChange({
      ...filters,
      type: value === 'all' ? '' : value,
    });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      year: e.target.value,
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex-1">
        <Label htmlFor="type-filter" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
          {t('filters.type')}
        </Label>
        <Select value={filters.type || 'all'} onValueChange={handleTypeChange}>
          <SelectTrigger id="type-filter">
            <SelectValue placeholder={t('filters.allTypes')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('filters.allTypes')}</SelectItem>
            <SelectItem value="movie">{t('filters.movies')}</SelectItem>
            <SelectItem value="series">{t('filters.series')}</SelectItem>
            <SelectItem value="episode">{t('filters.episodes')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <Label htmlFor="year-filter" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
          {t('filters.year')}
        </Label>
        <Input
          id="year-filter"
          type="number"
          placeholder="e.g. 2023"
          value={filters.year}
          onChange={handleYearChange}
          min="1900"
          max={currentYear}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700"
        />
      </div>
    </div>
  );
}