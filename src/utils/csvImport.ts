import type { Business } from '../types/business';
import { getWebsiteDescription } from './metadataFetcher';

export function parseCSVData(csvText: string): Business[] {
  const lines = csvText.trim().split('\n');
  // Skip the header line (Name,Country,Link,Lightning)
  
  const businesses: Business[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    
    if (values.length < 3) continue; // Need at least name, country, and link
    
    const name = values[0] || 'Unknown Business';
    const country = values[1] || 'Unknown';
    const website = values[2] || '';
    const lightning = values.length > 3 ? parseLightningSupport(values[3]) : false;
    
    // Get website metadata description
    const metaDescription = website ? getWebsiteDescription(website) : null;
    
    const business: Business = {
      id: i.toString(),
      name: name,
      website: website,
      country: country,
      countryCode: getCountryCode(country),
      description: `Bitcoin-accepting business in ${country}`,
      metaDescription: metaDescription || undefined,
      lightning: lightning,
      category: 'Bitcoin Business',
      image: website ? `${website.replace(/\/$/, '')}/favicon.ico` : undefined
    };
    
    businesses.push(business);
  }
  
  return businesses;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

function parseLightningSupport(value: string): boolean {
  const normalized = value.toLowerCase().trim();
  return normalized === 'yes' || normalized === 'true' || normalized === '1';
}

function getCountryCode(country: string): string {
  const countryCodes: Record<string, string> = {
    'United States': 'US',
    'USA': 'US',
    'Canada': 'CA',
    'United Kingdom': 'GB',
    'UK': 'GB',
    'Germany': 'DE',
    'France': 'FR',
    'Italy': 'IT',
    'Spain': 'ES',
    'Netherlands': 'NL',
    'Sweden': 'SE',
    'Norway': 'NO',
    'Denmark': 'DK',
    'Finland': 'FI',
    'Switzerland': 'CH',
    'Austria': 'AT',
    'Belgium': 'BE',
    'Portugal': 'PT',
    'Ireland': 'IE',
    'Australia': 'AU',
    'New Zealand': 'NZ',
    'Japan': 'JP',
    'South Korea': 'KR',
    'Singapore': 'SG',
    'Hong Kong': 'HK',
    'India': 'IN',
    'China': 'CN',
    'Brazil': 'BR',
    'Argentina': 'AR',
    'Mexico': 'MX',
    'Chile': 'CL',
    'Colombia': 'CO',
    'Peru': 'PE',
    'South Africa': 'ZA',
    'Nigeria': 'NG',
    'Kenya': 'KE',
    'Egypt': 'EG',
    'Israel': 'IL',
    'Turkey': 'TR',
    'Russia': 'RU',
    'Ukraine': 'UA',
    'Poland': 'PL',
    'Czech Republic': 'CZ',
    'Hungary': 'HU',
    'Romania': 'RO',
    'Bulgaria': 'BG',
    'Croatia': 'HR',
    'Slovenia': 'SI',
    'Slovakia': 'SK',
    'Estonia': 'EE',
    'Latvia': 'LV',
    'Lithuania': 'LT',
    'Global': 'GLOBAL',
    'Worldwide': 'GLOBAL'
  };
  
  return countryCodes[country] || 'UNKNOWN';
}
