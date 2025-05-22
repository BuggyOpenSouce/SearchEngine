import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { useCustomization } from '../context/CustomizationContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import ResultCard from '../components/ResultCard';
import ImageResultsGrid from '../components/ImageResultsGrid';
import VideoResultsList from '../components/VideoResultsList';
import NewsResultsList from '../components/NewsResultsList';
import MapResultsList from '../components/MapResultsList';
import CustomizationPanel from '../components/CustomizationPanel';
import { Loader2 } from 'lucide-react';

const SearchPage: React.FC = () => {
  const { 
    query, 
    category, 
    loading, 
    searchResults, 
    imageResults, 
    videoResults, 
    newsResults, 
    mapResults 
  } = useSearch();
  const { options } = useCustomization();
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Update the document title
    document.title = query ? `${query} - BuggySearch` : 'BuggySearch';
    
    // Scroll to top on category change
    window.scrollTo(0, 0);
  }, [query, category]);

  const renderResults = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin mb-4" style={{ color: options.theme.primary }} />
          <p className="text-lg">Searching for results...</p>
        </div>
      );
    }

    if (query === '') {
      return (
        <div className="text-center py-12">
          <p className="text-lg mb-2">Enter a search query to see results</p>
          <button 
            onClick={() => navigate('/')}
            className="text-sm underline"
            style={{ color: options.theme.primary }}
          >
            Return to home page
          </button>
        </div>
      );
    }

    switch (category) {
      case 'web':
        return (
          <div className="mt-4 divide-y" style={{ borderColor: options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <ResultCard key={result.id} result={result} />
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-lg">No results found for "{query}"</p>
                <p className="mt-2 text-sm opacity-70">Try different keywords or check your spelling</p>
              </div>
            )}
          </div>
        );
      case 'images':
        return (
          <div className="mt-4">
            {imageResults.length > 0 ? (
              <ImageResultsGrid results={imageResults} />
            ) : (
              <div className="py-8 text-center">
                <p className="text-lg">No image results found for "{query}"</p>
                <p className="mt-2 text-sm opacity-70">Try different keywords or check your spelling</p>
              </div>
            )}
          </div>
        );
      case 'videos':
        return (
          <div className="mt-4">
            {videoResults.length > 0 ? (
              <VideoResultsList results={videoResults} />
            ) : (
              <div className="py-8 text-center">
                <p className="text-lg">No video results found for "{query}"</p>
                <p className="mt-2 text-sm opacity-70">Try different keywords or check your spelling</p>
              </div>
            )}
          </div>
        );
      case 'news':
        return (
          <div className="mt-4">
            {newsResults.length > 0 ? (
              <NewsResultsList results={newsResults} />
            ) : (
              <div className="py-8 text-center">
                <p className="text-lg">No news results found for "{query}"</p>
                <p className="mt-2 text-sm opacity-70">Try different keywords or check your spelling</p>
              </div>
            )}
          </div>
        );
      case 'maps':
        return (
          <div className="mt-4">
            {mapResults.length > 0 ? (
              <MapResultsList results={mapResults} />
            ) : (
              <div className="py-8 text-center">
                <p className="text-lg">No map results found for "{query}"</p>
                <p className="mt-2 text-sm opacity-70">Try different keywords or check your spelling</p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        backgroundColor: options.theme.background,
        color: options.theme.text,
        transition: options.enableAnimations ? 'background-color 0.3s, color 0.3s' : 'none',
      }}
    >
      <Header toggleCustomizationPanel={() => setIsCustomizationOpen(true)} />
      
      <div className="sticky top-0 z-20 bg-opacity-95 backdrop-blur-sm pt-4 pb-2 px-4" style={{ backgroundColor: options.theme.background }}>
        <div className="container mx-auto">
          <SearchBar />
        </div>
      </div>
      
      <CategoryTabs />
      
      <main className="flex-grow container mx-auto px-4 py-4">
        {renderResults()}
      </main>
      
      <footer 
        className="py-4 px-4 text-center text-sm border-t"
        style={{ 
          borderColor: options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          color: options.darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
        }}
      >
        <div className="container mx-auto">
          <p>© 2025 BuggySearch. All rights reserved.</p>
        </div>
      </footer>
      
      <CustomizationPanel 
        isOpen={isCustomizationOpen} 
        onClose={() => setIsCustomizationOpen(false)} 
      />
    </div>
  );
};

export default SearchPage;