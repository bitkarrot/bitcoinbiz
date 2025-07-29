import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const execAsync = promisify(exec);

// Path to CSV file and output file
const csvPath = path.join(__dirname, '..', 'bitcoinlinks.csv');
const outputPath = path.join(__dirname, '..', 'src', 'utils', 'metadataFetcher.ts');

// Function to extract domain from URL
function extractDomain(url) {
  try {
    // Remove protocol and www
    let domain = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
    // Remove path
    domain = domain.split('/')[0];
    return domain.toLowerCase();
  } catch (error) {
    console.error(`Error extracting domain from ${url}:`, error);
    return null;
  }
}

// Function to fetch title and description from a website
async function fetchMetadata(url) {
  try {
    // Use curl with a timeout to fetch the HTML
    const { stdout } = await execAsync(`curl -L -s --max-time 5 "${url}"`);
    
    // Extract title
    let title = stdout.match(/<title[^>]*>([^<]+)<\/title>/i);
    title = title ? title[1].trim() : '';
    
    // Extract meta description
    let description = stdout.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
    if (!description) {
      description = stdout.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i);
    }
    description = description ? description[1].trim() : '';
    
    // If no description found, try to extract the first paragraph
    if (!description) {
      const paragraph = stdout.match(/<p[^>]*>([^<]+)<\/p>/i);
      description = paragraph ? paragraph[1].trim() : '';
    }
    
    // If still no description, use the title
    if (!description && title) {
      description = `${title} - Bitcoin accepting website`;
    } else if (!description) {
      description = 'Bitcoin accepting website';
    }
    
    return { title, description };
  } catch (error) {
    console.error(`Error fetching metadata for ${url}:`, error);
    return { title: '', description: 'Bitcoin accepting website' };
  }
}

// Main function
async function main() {
  try {
    // Read CSV file
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const lines = csvContent.trim().split('\n');
    
    // Skip header
    const dataLines = lines.slice(1);
    
    // Create a map to store domain -> description
    const domainDescriptions = {};
    
    // Process each line - limit to first 20 for faster testing
    const maxLinesToProcess = 138; // Limit to process faster
    for (let i = 0; i < Math.min(dataLines.length, maxLinesToProcess); i++) {
      const values = dataLines[i].split(',');
      if (values.length >= 3) {
        const name = values[0];
        const country = values[1];
        const url = values[2];
        
        if (!url) continue;
        
        const domain = extractDomain(url);
        if (!domain) continue;
        
        console.log(`[${i + 1}/${dataLines.length}] Fetching metadata for ${domain} (${url})`);
        
        try {
          const { description } = await fetchMetadata(url);
          
          // Create a description
          let finalDescription = description;
          if (finalDescription.length > 100) {
            finalDescription = finalDescription.substring(0, 97) + '...';
          }
          
          // Add "accepts Bitcoin" if not mentioned
          if (!finalDescription.toLowerCase().includes('bitcoin') && 
              !finalDescription.toLowerCase().includes('crypto')) {
            finalDescription += ' - Accepts Bitcoin payments';
          }
          
          domainDescriptions[domain] = finalDescription;
          
          // Wait a bit to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          console.error(`Error processing ${domain}:`, error);
          domainDescriptions[domain] = `${name} - Bitcoin accepting business in ${country}`;
        }
      }
    }
    
    // Read the current metadataFetcher.ts file
    let metadataContent = `/**
 * Utility for website metadata
 */

/**
 * Website descriptions mapped by domain
 * This is a simple solution to avoid CORS issues with fetching metadata directly
 */
const websiteDescriptions: Record<string, string> = {
`;
    
    // Add all domain descriptions
    Object.entries(domainDescriptions).forEach(([domain, description], index, array) => {
      metadataContent += `  '${domain}': '${description.replace(/'/g, "\\'")}',\n`;
    });
    
    // Close the object and add the rest of the file
    metadataContent += `};

/**
 * Get website description by URL
 * @param url The website URL
 * @returns The description or null if not found
 */
export function getWebsiteDescription(url: string): string | null {
  // Extract domain from URL
  try {
    // Remove protocol and www
    let domain = url.replace(/^https?:\\/\\//, '').replace(/^www\\./, '');
    // Remove path
    domain = domain.split('/')[0].toLowerCase();
    
    return websiteDescriptions[domain] || null;
  } catch (error) {
    console.error('Error extracting domain:', error);
    return null;
  }
}

// We're using a static mapping approach instead of fetching metadata dynamically
`;
    
    // Write the updated file
    fs.writeFileSync(outputPath, metadataContent);
    
    console.log(`Updated ${outputPath} with ${Object.keys(domainDescriptions).length} website descriptions`);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
