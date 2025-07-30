export interface Business {
  id: string;
  name: string;
  website: string;
  country: string;
  countryCode: string;
  description: string;
  metaDescription?: string; // Website metadata description
  lightning: boolean;
  category?: string;
  image?: string;
}

export type SortDirection = 'asc' | 'desc' | '';

export interface SearchFilters {
  country: string;
  lightning: boolean | null;
  searchTerm: string;
  sortDirection: SortDirection;
}
