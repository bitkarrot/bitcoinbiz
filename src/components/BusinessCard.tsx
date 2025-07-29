import { ExternalLink, Zap } from 'lucide-react';
import type { Business } from '../types/business';

interface BusinessCardProps {
  business: Business;
}

const countryFlags: Record<string, string> = {
  'US': '🇺🇸',
  'SE': '🇸🇪',
  'CA': '🇨🇦',
  'IL': '🇮🇱',
  'AR': '🇦🇷',
  'GLOBAL': '🌍',
};

export function BusinessCard({ business }: BusinessCardProps) {
  const flag = countryFlags[business.countryCode] || '🏳️';

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">

      {/* Content Section */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-center gap-2">
            {business.image && (
              <img
                src={business.image}
                alt=""
                className="h-5 w-5 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <h3 className="font-semibold text-lg leading-tight">{business.name}</h3>
          </div>
          {business.lightning && (
            <div className="flex-shrink-0 rounded-full bg-yellow-100 p-1.5 dark:bg-yellow-900/20">
              <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" fill="currentColor" />
            </div>
          )}
        </div>

        <p className="mb-3 text-sm text-muted-foreground line-clamp-3">
          {business.metaDescription ? (
            <>
              <span className="font-medium">{business.metaDescription}</span>
              <br />
              <span className="text-xs opacity-75">{business.description}</span>
            </>
          ) : (
            business.description
          )}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{flag}</span>
            <span className="text-sm text-muted-foreground">{business.country}</span>
          </div>

          <a
            href={business.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Visit
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {business.category && (
          <div className="mt-3 pt-3 border-t">
            <span className="inline-block rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground">
              {business.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
