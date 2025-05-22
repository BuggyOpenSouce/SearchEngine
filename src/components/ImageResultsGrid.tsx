import React, { useState } from 'react';
import { ImageResult } from '../types';
import { useCustomization } from '../context/CustomizationContext';
import { ExternalLink } from 'lucide-react';

interface ImageResultsGridProps {
  results: ImageResult[];
}

const ImageResultsGrid: React.FC<ImageResultsGridProps> = ({ results }) => {
  const { options } = useCustomization();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getGridCols = () => {
    switch (options.resultDensity) {
      case 'compact': return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';
      case 'spacious': return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      default: return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';
    }
  };

  const getGap = () => {
    switch (options.resultDensity) {
      case 'compact': return 'gap-2';
      case 'spacious': return 'gap-6';
      default: return 'gap-4';
    }
  };

  return (
    <div className={`grid ${getGridCols()} ${getGap()}`}>
      {results.map((result) => (
        <div 
          key={result.id}
          className="relative overflow-hidden rounded-lg group"
          onMouseEnter={() => setHoveredId(result.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <a 
            href={result.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block h-full"
          >
            <div className="relative pb-[75%] bg-gray-200 dark:bg-gray-700">
              <img 
                src={result.thumbnailUrl} 
                alt={result.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3`}
                style={{
                  opacity: hoveredId === result.id ? 1 : 0,
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-white text-sm font-medium truncate mr-2">
                    {result.title}
                  </p>
                  <ExternalLink size={14} className="flex-shrink-0 text-white" />
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ImageResultsGrid;