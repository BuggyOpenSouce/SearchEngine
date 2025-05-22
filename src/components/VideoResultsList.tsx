import React, { useState } from 'react';
import { VideoResult } from '../types';
import { useCustomization } from '../context/CustomizationContext';
import { Clock, ExternalLink } from 'lucide-react';

interface VideoResultsListProps {
  results: VideoResult[];
}

const VideoResultsList: React.FC<VideoResultsListProps> = ({ results }) => {
  const { options } = useCustomization();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getSpacing = () => {
    switch (options.resultDensity) {
      case 'compact': return 'gap-3 mb-3';
      case 'spacious': return 'gap-8 mb-8';
      default: return 'gap-5 mb-5';
    }
  };

  return (
    <div className="flex flex-col">
      {results.map((result) => (
        <div 
          key={result.id}
          className={`flex flex-col md:flex-row ${getSpacing()}`}
          onMouseEnter={() => setHoveredId(result.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="md:w-64 lg:w-80 flex-shrink-0 relative group">
            <a 
              href={result.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={result.thumbnailUrl} 
                  alt={result.title}
                  className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs py-1 px-2 rounded-md flex items-center">
                  <Clock size={12} className="mr-1" />
                  {result.duration}
                </div>
              </div>
            </a>
          </div>
          
          <div className="flex-grow mt-2 md:mt-0 md:ml-4">
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
            
            <div 
              className="flex items-center mt-1 text-sm"
              style={{ color: options.darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)' }}
            >
              <span className="mr-2">{result.publisher}</span>
              <span className="mr-2">•</span>
              <span>{result.publishedAt}</span>
              {result.views && (
                <>
                  <span className="mx-2">•</span>
                  <span>{result.views} views</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoResultsList;