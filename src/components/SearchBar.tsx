import React, { useState, useRef, useEffect } from 'react';
import { Search, Mic, X } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { useCustomization } from '../context/CustomizationContext';
import { useNavigate } from 'react-router-dom';

type SearchBarProps = {
  expanded?: boolean;
  autoFocus?: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({ expanded = false, autoFocus = false }) => {
  const { query, setQuery, performSearch, suggestions, getSuggestions } = useSearch();
  const { options } = useCustomization();
  const [inputValue, setInputValue] = useState(query);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length >= 2) {
      getSuggestions(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearch = (searchQuery = inputValue) => {
    if (searchQuery.trim()) {
      performSearch(searchQuery, 'web');
      setShowSuggestions(false);
      navigate('/search');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSearch(suggestion);
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsListening(true);
      
      // This would normally use the Web Speech API
      // For now, we'll simulate voice recognition
      setTimeout(() => {
        const mockVoiceText = "debugging software";
        setInputValue(mockVoiceText);
        setIsListening(false);
        handleSearch(mockVoiceText);
      }, 2000);
    } else {
      alert('Voice search is not supported in your browser.');
    }
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${expanded ? 'scale-100' : 'scale-95'} transition-transform duration-300`}>
      <div className="relative">
        <div 
          className="flex items-center w-full rounded-full border overflow-hidden transition-all duration-200"
          style={{ 
            backgroundColor: options.darkMode ? options.theme.cardBackground : 'white',
            borderColor: showSuggestions ? options.theme.primary : options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            boxShadow: showSuggestions 
              ? `0 2px 10px rgba(${options.darkMode ? '0, 0, 0, 0.3' : '0, 0, 0, 0.1'})`
              : 'none'
          }}
        >
          <div className="flex-shrink-0 p-3">
            <Search 
              size={20} 
              className="transition-colors duration-200"
              style={{ color: options.theme.primary }}
            />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue && getSuggestions(inputValue) && setShowSuggestions(true)}
            placeholder="Search the web"
            className="w-full py-3 px-2 outline-none bg-transparent"
            style={{ 
              color: options.theme.text,
              fontSize: options.fontSize === 'small' ? '0.9rem' : options.fontSize === 'large' ? '1.1rem' : '1rem'
            }}
          />
          
          {inputValue && (
            <button 
              onClick={handleClear}
              className="flex-shrink-0 p-3"
              aria-label="Clear search"
            >
              <X 
                size={20} 
                className="transition-colors duration-200"
                style={{ color: options.theme.text }}
              />
            </button>
          )}
          
          <div className="flex-shrink-0 p-3 border-l" style={{ borderColor: options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
            <button
              onClick={startVoiceSearch}
              disabled={isListening}
              className={`transition-all duration-300 ${isListening ? 'animate-pulse' : ''}`}
              aria-label="Search by voice"
            >
              <Mic 
                size={20} 
                style={{ 
                  color: isListening ? options.theme.accent : options.theme.primary
                }}
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* Search suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute w-full mt-1 rounded-lg overflow-hidden z-50"
          style={{ 
            backgroundColor: options.darkMode ? options.theme.cardBackground : 'white',
            boxShadow: `0 4px 20px rgba(0, 0, 0, ${options.darkMode ? '0.3' : '0.1'})`,
            border: `1px solid ${options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex items-center px-4 py-3 cursor-pointer transition-colors duration-150"
              style={{ 
                backgroundColor: options.darkMode ? options.theme.cardBackground : 'white',
                color: options.theme.text,
                borderTop: index > 0 ? `1px solid ${options.darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}` : 'none',
                fontSize: options.fontSize === 'small' ? '0.9rem' : options.fontSize === 'large' ? '1.1rem' : '1rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = options.darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = options.darkMode ? options.theme.cardBackground : 'white';
              }}
            >
              <Search size={16} className="mr-3 opacity-60" />
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;