export interface Business {
  id: string;
  name: string;
  website: string;
  country: string;
  countryCode: string;
  description: string;
  lightning: boolean;
  category?: string;
  image?: string;
}

export interface SearchFilters {
  country: string;
  lightning: boolean | null;
  searchTerm: string;
}
