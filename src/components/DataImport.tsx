import { useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { parseCSVData } from '../utils/csvImport';
import type { Business } from '../types/business';

interface DataImportProps {
  onDataImported: (businesses: Business[]) => void;
  onClose: () => void;
}

export function DataImport({ onDataImported, onClose }: DataImportProps) {
  const [csvText, setCsvText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvText(text);
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (!csvText.trim()) {
      setError('Please provide CSV data');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const businesses = parseCSVData(csvText);
      if (businesses.length === 0) {
        setError('No valid business data found');
        return;
      }
      
      onDataImported(businesses);
      onClose();
    } catch (err) {
      setError('Error parsing CSV data: ' + (err as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Import Spreadsheet Data</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">To import your Bitcoin business data:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Go to your Google Spreadsheet</li>
              <li>File → Download → Comma Separated Values (.csv)</li>
              <li>Upload the file below, or copy and paste the data</li>
            </ol>
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-border rounded-lg p-4">
            <div className="text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <label className="cursor-pointer">
                <span className="text-sm font-medium text-primary hover:text-primary/80">
                  Choose CSV file
                </span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                Or paste CSV data below
              </p>
            </div>
          </div>

          {/* Text Area */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <FileText className="h-4 w-4 inline mr-1" />
              CSV Data
            </label>
            <textarea
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder="Paste your CSV data here..."
              className="w-full h-40 px-3 py-2 border border-input rounded-md bg-background text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={isProcessing || !csvText.trim()}
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Import Data'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
