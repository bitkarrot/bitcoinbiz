import { useState, useMemo, useEffect } from 'react';
import { Bitcoin, Zap, PlusCircle, Eye } from 'lucide-react';
import { BusinessCard } from './components/BusinessCard';
import { SearchFilters } from './components/SearchFilters';
import { loadBusinessesFromCSV } from './data/csvLoader';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import type { SearchFilters as SearchFiltersType, Business } from './types/business';

function AppContent() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFiltersType>({
    country: '',
    lightning: null,
    searchTerm: '',
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await loadBusinessesFromCSV();
      setBusinesses(data);
      
      // Extract unique countries from the loaded data
      const uniqueCountries = Array.from(new Set(data.map(b => b.country))).sort();
      setCountries(uniqueCountries);
      
      setLoading(false);
    }
    
    fetchData();
  }, []);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          business.name.toLowerCase().includes(searchLower) ||
          business.description.toLowerCase().includes(searchLower) ||
          business.category?.toLowerCase().includes(searchLower) ||
          business.country.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Country filter
      if (filters.country && business.country !== filters.country) {
        return false;
      }

      // Lightning filter
      if (filters.lightning !== null && business.lightning !== filters.lightning) {
        return false;
      }

      return true;
    });
  }, [filters, businesses]);

  const lightningCount = businesses.filter((b: Business) => b.lightning).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Bitcoin className="h-8 w-8 text-orange-500" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Bitcoin Business Directory
              </h1>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <a 
                href="https://formstr.app/f/naddr1qvzqqqr4mqpzqwuesmkx5v6lwfsmsqcgvxamg2n7x9l2094jnqr4p786j6k63u4mqy2hwumn8ghj7un9d3shjtnyv9kh2uewd9hj7qqx29thsempxsg77cqc?viewKey=65fe57f356a8495090f2c2dcd6152af25f81844cbe7c62d93b0aeee436d66282" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add an Entry</span>
              </a>
              <a 
                href="https://formstr.app/s/ad3e91eaa8ceca734f1c01a26e62cae718ddf11da7e0f444ecf33cdc562c936f/QWxga4?relay=wss%3A%2F%2Frelay.damus.io%2F&viewKey=65fe57f356a8495090f2c2dcd6152af25f81844cbe7c62d93b0aeee436d66282" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>View Responses</span>
              </a>
              <ThemeToggle />
            </div>
          </div>
          <p className="text-muted-foreground mb-6">
            Discover Bitcoin-accepting businesses worldwide. Find companies that support Lightning Network payments.
          </p>
          
          <SearchFilters filters={filters} onFiltersChange={setFilters} countries={countries} />
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-2 shadow-sm">
                <span className="text-2xl font-bold text-primary">{filteredBusinesses.length}</span>
                <span className="text-sm text-muted-foreground">businesses found</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-2 shadow-sm">
                <Zap className="h-4 w-4 text-yellow-500" fill="currentColor" />
                <span className="text-2xl font-bold text-yellow-600">{lightningCount}</span>
                <span className="text-sm text-muted-foreground">Lightning enabled</span>
              </div>
            </div>

            {/* Business Grid */}
            {filteredBusinesses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBusinesses.map((business: Business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No businesses found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Discover and support Bitcoin businesses worldwide 🧡</p>
          <p> Vibe coded by Bitkarrot - <a href="https://github.com/bitkarrot/bitcoinbiz">Source</a></p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
