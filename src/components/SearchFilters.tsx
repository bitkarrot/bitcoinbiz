import { Search, Filter, Zap, X, ArrowUpDown } from 'lucide-react';
import type { SearchFilters } from '../types/business';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  countries?: string[];
}

export function SearchFilters({ filters, onFiltersChange, countries = [] }: SearchFiltersProps) {
  const updateFilters = (updates: Partial<SearchFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const clearFilters = () => {
    onFiltersChange({
      country: '',
      lightning: null,
      searchTerm: '',
      sortDirection: '',
    });
  };

  const hasActiveFilters = filters.country || filters.lightning !== null || filters.searchTerm;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search businesses..."
          value={filters.searchTerm}
          onChange={(e) => updateFilters({ searchTerm: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-10 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
        {filters.searchTerm && (
          <button
            onClick={() => updateFilters({ searchTerm: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Country Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={filters.country}
            onChange={(e) => updateFilters({ country: e.target.value })}
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">All Countries</option>
            {countries.map((country: string) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Lightning Filter */}
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-yellow-600" />
          <select
            value={filters.lightning === null ? '' : filters.lightning.toString()}
            onChange={(e) => {
              const value = e.target.value;
              updateFilters({ 
                lightning: value === '' ? null : value === 'true' 
              });
            }}
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">All Businesses</option>
            <option value="true">Lightning Enabled</option>
            <option value="false">No Lightning</option>
          </select>
        </div>

        {/* Sort Direction */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <select
            value={filters.sortDirection}
            onChange={(e) => updateFilters({ sortDirection: e.target.value as '' | 'asc' | 'desc' })}
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Default Order</option>
            <option value="asc">Sort A-Z</option>
            <option value="desc">Sort Z-A</option>
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
