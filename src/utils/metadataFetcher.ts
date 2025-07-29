/**
 * Utility for website metadata
 */

/**
 * Website descriptions mapped by domain
 * This is a simple solution to avoid CORS issues with fetching metadata directly
 */
const websiteDescriptions: Record<string, string> = {
  'arnzenarms.com': 'Firearms dealer accepting Bitcoin and Lightning payments',
  'gafiringline.com': 'Shooting range and gun store that accepts Bitcoin',
  'fenixammunition.com': 'Ammunition manufacturer with Bitcoin and Lightning payment options',
  'yoursole.com': 'Custom insoles and footwear retailer accepting Bitcoin payments',
  'bitrefill.com': 'Buy gift cards, mobile refills and pay bills with Bitcoin',
  'coincards.com': 'Gift cards for Bitcoin - spend crypto at major retailers',
  'travala.com': 'Blockchain-based travel booking platform accepting cryptocurrencies',
  'protonmail.com': 'Secure email service with Bitcoin payment option',
  'namecheap.com': 'Domain registrar and web hosting with Bitcoin acceptance',
  'nordvpn.com': 'VPN service provider accepting Bitcoin payments',
  'overstock.com': 'Online retailer accepting Bitcoin for home goods and furniture',
  'newegg.com': 'Electronics retailer with Bitcoin payment option',
  'shopinbit.com': 'Online marketplace for Bitcoin shoppers',
  'keys4coins.com': 'Game keys and gift cards for Bitcoin and other cryptocurrencies',
  'bitcoinshirt.co': 'Bitcoin-themed apparel and merchandise',
  'blockstream.com': 'Bitcoin infrastructure and technology company',
  'btcpayserver.org': 'Self-hosted Bitcoin payment processor',
  'purse.io': 'Marketplace to spend Bitcoin on Amazon with discounts',
  'amagimetals.com': 'Precious metals dealer accepting Bitcoin',
  'jmbullion.com': 'Gold and silver bullion retailer with Bitcoin payments'
};

/**
 * Gets a description for a website based on its URL
 * @param url The website URL
 * @returns A description of the website or null if not found
 */
export function getWebsiteDescription(url: string): string | null {
  if (!url) return null;
  
  try {
    // Extract domain from URL
    const domain = new URL(url).hostname.replace('www.', '');
    
    // Check if we have a description for this domain
    for (const [key, description] of Object.entries(websiteDescriptions)) {
      if (domain.includes(key)) {
        return description;
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error parsing URL ${url}:`, error);
    return null;
  }
}

// We're using a static mapping approach instead of fetching metadata dynamically
