// Favicon fetcher script
// This script downloads favicons from all websites in the CSV file
// and saves them to the public/favicons directory

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function main() {
  try {
    // Read the CSV file
    const csvPath = path.join(process.cwd(), 'public', 'bitcoinlinks.csv');
    const csvData = fs.readFileSync(csvPath, 'utf8');
    
    // Create favicons directory if it doesn't exist
    const faviconsDir = path.join(process.cwd(), 'public', 'favicons');
    if (!fs.existsSync(faviconsDir)) {
      fs.mkdirSync(faviconsDir, { recursive: true });
    }
    
    // Parse the CSV data
    const dataLines = csvData.trim().split('\n').slice(1); // Skip header
    console.log(`Found ${dataLines.length} businesses in CSV`);
    
    // Process each line
    for (let i = 0; i < dataLines.length; i++) {
      const values = dataLines[i].split(',');
      if (values.length >= 3) {
        const name = values[0];
        const website = values[2];
        
        if (!website) continue;
        
        // Extract domain from website URL
        let domain;
        try {
          domain = new URL(website).hostname;
        } catch (e) {
          // If URL is invalid, try adding https://
          try {
            domain = new URL(`https://${website}`).hostname;
          } catch (e2) {
            console.error(`[${i+1}/${dataLines.length}] Invalid URL: ${website}`);
            continue;
          }
        }
        
        // Remove www. prefix if present
        domain = domain.replace(/^www\./, '');
        
        // Create a safe filename
        const safeFilename = `${domain.replace(/[^a-z0-9]/gi, '_')}.ico`;
        const outputPath = path.join(faviconsDir, safeFilename);
        
        // Skip if already downloaded
        if (fs.existsSync(outputPath)) {
          console.log(`[${i+1}/${dataLines.length}] Favicon for ${domain} already exists, skipping`);
          continue;
        }
        
        console.log(`[${i+1}/${dataLines.length}] Fetching favicon for ${domain} (${website})`);
        
        try {
          // Try to download favicon.ico directly
          await execAsync(`curl -s -o "${outputPath}" --max-time 5 "${website.replace(/\/$/, '')}/favicon.ico"`);
          
          // Check if file exists and has content
          if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0) {
            console.log(`  ✓ Downloaded favicon for ${domain}`);
          } else {
            // If favicon.ico doesn't exist, try to extract from HTML
            console.log(`  ✗ No favicon.ico found, trying to extract from HTML`);
            fs.unlinkSync(outputPath); // Remove empty file
            
            // Use a default favicon
            fs.copyFileSync(
              path.join(process.cwd(), 'public', 'bitcoin-logo.svg'), 
              outputPath
            );
            console.log(`  ✓ Using default favicon for ${domain}`);
          }
        } catch (error) {
          console.error(`  ✗ Error fetching favicon for ${domain}: ${error.message}`);
          
          // Use a default favicon
          try {
            fs.copyFileSync(
              path.join(process.cwd(), 'public', 'bitcoin-logo.svg'), 
              outputPath
            );
            console.log(`  ✓ Using default favicon for ${domain}`);
          } catch (copyError) {
            console.error(`  ✗ Error copying default favicon: ${copyError.message}`);
          }
        }
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    console.log('Favicon fetching complete!');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
