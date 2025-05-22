import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, Settings } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { useCustomization } from '../context/CustomizationContext';
import SearchBar from '../components/SearchBar';
import CustomizationPanel from '../components/CustomizationPanel';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { performSearch } = useSearch();
  const { options } = useCustomization();
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      performSearch(query, 'web');
      navigate('/search');
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
      
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className={`w-full max-w-2xl mx-auto text-center transition-transform duration-500 ${options.enableAnimations ? 'transform-gpu' : ''}`}>
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 inline-flex items-center">
              <span style={{ color: options.theme.primary }}>Buggy</span>
              <span style={{ color: options.theme.accent }}>Search</span>
            </h1>
            <p className="text-base md:text-lg opacity-80">Find anything you're looking for</p>
          </div>
          
          <SearchBar expanded={true} autoFocus={true} />
          
          <div className="mt-8 flex justify-center space-x-4">
            <button 
              className="py-2 px-4 rounded-md transition-colors duration-200"
              style={{ backgroundColor: options.darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }}
              onClick={() => handleSearch('web development')}
            >
              Web Development
            </button>
            <button 
              className="py-2 px-4 rounded-md transition-colors duration-200"
              style={{ backgroundColor: options.darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }}
              onClick={() => handleSearch('debugging tips')}
            >
              Debugging Tips
            </button>
          </div>
        </div>
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

export default HomePage;