import { ExternalLink, Zap } from 'lucide-react';
import type { Business } from '../types/business';
import { cn } from '../lib/utils';

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
      {/* Image Section */}
      <div className="aspect-video w-full overflow-hidden bg-muted">
        {business.image ? (
          <img
            src={business.image}
            alt={`${business.name} logo`}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={cn(
          "flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5",
          business.image && "hidden"
        )}>
          <span className="text-2xl font-bold text-muted-foreground">
            {business.name.charAt(0)}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-semibold text-lg leading-tight">{business.name}</h3>
          {business.lightning && (
            <div className="flex-shrink-0 rounded-full bg-yellow-100 p-1.5 dark:bg-yellow-900/20">
              <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" fill="currentColor" />
            </div>
          )}
        </div>

        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {business.description}
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
