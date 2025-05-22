import React, { useState } from 'react';
import { SearchResult } from '../types';
import { useCustomization } from '../context/CustomizationContext';
import { ExternalLink } from 'lucide-react';

interface ResultCardProps {
  result: SearchResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { options } = useCustomization();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getSpacing = () => {
    switch (options.resultDensity) {
      case 'compact': return 'py-2 mb-2';
      case 'spacious': return 'py-4 mb-6';
      default: return 'py-3 mb-4';
    }
  };

  const getFontSize = () => {
    switch (options.fontSize) {
      case 'small': return { title: 'text-lg', url: 'text-xs', snippet: 'text-sm' };
      case 'large': return { title: 'text-2xl', url: 'text-sm', snippet: 'text-lg' };
      default: return { title: 'text-xl', url: 'text-xs', snippet: 'text-base' };
    }
  };

  const fontSizes = getFontSize();
  
  return (
    <div 
      className={`w-full ${getSpacing()} group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row gap-4">
        {options.showPreviewImages && result.imageUrl && !imageError && (
          <div className={`flex-shrink-0 md:w-32 h-24 rounded-lg overflow-hidden ${!imageLoaded ? 'bg-gray-200 dark:bg-gray-700 animate-pulse' : ''}`}>
            <img 
              src={result.imageUrl} 
              alt={result.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </div>
        )}
        
        <div className="flex-grow">
          <div className="flex flex-col">
            <a 
              href={result.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${fontSizes.url} mb-1 block truncate`}
              style={{ 
                color: options.darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
              }}
            >
              {result.displayUrl}
            </a>
            
            <a 
              href={result.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${fontSizes.title} font-medium group-hover:underline transition-colors duration-200 flex items-center`}
              style={{ 
                color: options.theme.primary,
              }}
            >
              {result.title}
              <ExternalLink 
                size={16} 
                className={`ml-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              />
            </a>
            
            <p 
              className={`${fontSizes.snippet} mt-1`}
              style={{ 
                color: options.theme.text,
              }}
            >
              {result.snippet}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;