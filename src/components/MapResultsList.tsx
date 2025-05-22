import React from 'react';
import { MapResult } from '../types';
import { useCustomization } from '../context/CustomizationContext';
import { MapPin, Star } from 'lucide-react';

interface MapResultsListProps {
  results: MapResult[];
}

const MapResultsList: React.FC<MapResultsListProps> = ({ results }) => {
  const { options } = useCustomization();

  const getSpacing = () => {
    switch (options.resultDensity) {
      case 'compact': return 'py-2 mb-2';
      case 'spacious': return 'py-5 mb-5';
      default: return 'py-3 mb-3';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2 mb-4 rounded-lg overflow-hidden h-[300px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <p className="text-center" style={{ color: options.theme.text }}>
          Map View<br />
          <span className="text-sm opacity-70">(Map visualization would display here)</span>
        </p>
      </div>
      
      {results.map((result) => (
        <div 
          key={result.id}
          className={`${getSpacing()} p-4 rounded-lg border group transition-all duration-200 hover:shadow-md`}
          style={{ 
            borderColor: options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            backgroundColor: options.darkMode ? options.theme.cardBackground : 'white',
          }}
        >
          <div className="flex flex-col">
            <div className="flex items-start justify-between">
              <h3 
                className="text-lg font-medium"
                style={{ color: options.theme.primary }}
              >
                {result.name}
              </h3>
              
              {result.rating && (
                <div 
                  className="flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    color: result.rating >= 4.5 ? options.theme.secondary : options.theme.text,
                  }}
                >
                  <Star size={12} className="mr-1" fill={result.rating >= 4.5 ? 'currentColor' : 'none'} />
                  {result.rating}
                </div>
              )}
            </div>
            
            {result.category && (
              <p 
                className="text-sm mt-1"
                style={{ color: options.darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }}
              >
                {result.category}
              </p>
            )}
            
            <div 
              className="flex items-start mt-3"
              style={{ color: options.theme.text }}
            >
              <MapPin size={16} className="mt-0.5 mr-2 flex-shrink-0" style={{ color: options.theme.accent }} />
              <p className="text-sm">{result.address}</p>
            </div>
            
            <button 
              className="mt-3 py-2 px-4 rounded-full text-sm font-medium self-start transition-colors duration-200"
              style={{ 
                backgroundColor: options.theme.primary,
                color: 'white',
              }}
            >
              Get Directions
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MapResultsList;