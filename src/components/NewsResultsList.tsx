import React, { useState } from 'react';
import { NewsResult } from '../types';
import { useCustomization } from '../context/CustomizationContext';
import { Calendar, ExternalLink } from 'lucide-react';

interface NewsResultsListProps {
  results: NewsResult[];
}

const NewsResultsList: React.FC<NewsResultsListProps> = ({ results }) => {
  const { options } = useCustomization();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getSpacing = () => {
    switch (options.resultDensity) {
      case 'compact': return 'py-3 mb-3';
      case 'spacious': return 'py-6 mb-6';
      default: return 'py-4 mb-4';
    }
  };

  return (
    <div className="flex flex-col">
      {results.map((result) => (
        <div 
          key={result.id}
          className={`flex flex-col md:flex-row ${getSpacing()} border-b group`}
          style={{ borderColor: options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
          onMouseEnter={() => setHoveredId(result.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="flex-grow">
            <div className="flex items-center mb-2">
              <span 
                className="text-sm font-medium mr-2"
                style={{ color: options.theme.secondary }}
              >
                {result.source}
              </span>
              <div 
                className="flex items-center text-xs"
                style={{ color: options.darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)' }}
              >
                <Calendar size={12} className="mr-1" />
                {result.publishedAt}
              </div>
            </div>
            
            <a 
              href={result.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <h3 
                className="text-lg md:text-xl font-medium group-hover:underline flex items-center"
                style={{ color: options.theme.primary }}
              >
                {result.title}
                <ExternalLink 
                  size={16} 
                  className={`ml-1 transition-opacity duration-200`}
                  style={{ opacity: hoveredId === result.id ? 1 : 0 }}
                />
              </h3>
            </a>
            
            <p 
              className="mt-1 text-base"
              style={{ color: options.theme.text }}
            >
              {result.snippet}
            </p>
          </div>
          
          {result.imageUrl && (
            <div className="md:w-40 lg:w-56 flex-shrink-0 mt-3 md:mt-0 md:ml-4">
              <a 
                href={result.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src={result.imageUrl} 
                    alt={result.title}
                    className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NewsResultsList;