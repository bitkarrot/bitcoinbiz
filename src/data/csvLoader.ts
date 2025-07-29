import { parseCSVData } from '../utils/csvImport';
import type { Business } from '../types/business';

export async function loadBusinessesFromCSV(): Promise<Business[]> {
  try {
    console.log('Fetching CSV file from /bitcoinlinks.csv');
    const response = await fetch('/bitcoinlinks.csv');
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status}`);
    }
    
    const csvText = await response.text();
    console.log('CSV data loaded, first 100 chars:', csvText.substring(0, 100));
    
    const businesses = parseCSVData(csvText);
    console.log(`Parsed ${businesses.length} businesses from CSV`);
    return businesses;
  } catch (error) {
    console.error('Error loading CSV data:', error);
    return [];
  }
}

export async function getCountries(businesses: Business[]): Promise<string[]> {
  return Array.from(new Set(businesses.map(b => b.country))).sort();
}
