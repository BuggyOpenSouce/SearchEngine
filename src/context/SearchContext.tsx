import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SearchCategory, SearchResult, ImageResult, VideoResult, NewsResult, MapResult } from '../types';
import { mockSearchResults, mockImageResults, mockVideoResults, mockNewsResults, mockMapResults } from '../utils/mockData';

type SearchContextType = {
  query: string;
  setQuery: (query: string) => void;
  category: SearchCategory;
  setCategory: (category: SearchCategory) => void;
  loading: boolean;
  searchResults: SearchResult[];
  imageResults: ImageResult[];
  videoResults: VideoResult[];
  newsResults: NewsResult[];
  mapResults: MapResult[];
  performSearch: (query: string, category: SearchCategory) => Promise<void>;
  suggestions: string[];
  getSuggestions: (input: string) => Promise<void>;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('web');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [imageResults, setImageResults] = useState<ImageResult[]>([]);
  const [videoResults, setVideoResults] = useState<VideoResult[]>([]);
  const [newsResults, setNewsResults] = useState<NewsResult[]>([]);
  const [mapResults, setMapResults] = useState<MapResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // This would normally fetch from a real API
  const performSearch = async (searchQuery: string, searchCategory: SearchCategory) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      switch (searchCategory) {
        case 'web':
          setSearchResults(mockSearchResults);
          break;
        case 'images':
          setImageResults(mockImageResults);
          break;
        case 'videos':
          setVideoResults(mockVideoResults);
          break;
        case 'news':
          setNewsResults(mockNewsResults);
          break;
        case 'maps':
          setMapResults(mockMapResults);
          break;
      }
      
      setQuery(searchQuery);
      setCategory(searchCategory);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestions = async (input: string) => {
    if (!input.trim() || input.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock suggestions based on input
      const mockSuggestions = [
        `${input} search engine`,
        `${input} tutorial`,
        `${input} examples`,
        `how to use ${input}`,
        `best ${input} alternatives`
      ];
      
      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        category,
        setCategory,
        loading,
        searchResults,
        imageResults,
        videoResults,
        newsResults,
        mapResults,
        performSearch,
        suggestions,
        getSuggestions,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};