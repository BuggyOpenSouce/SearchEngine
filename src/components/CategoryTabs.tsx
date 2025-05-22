import React from 'react';
import { useSearch } from '../context/SearchContext';
import { useCustomization } from '../context/CustomizationContext';
import { SearchCategory } from '../types';
import { Search, Image, Play, Map, Newspaper } from 'lucide-react';

const CategoryTabs: React.FC = () => {
  const { category, setCategory, query, performSearch } = useSearch();
  const { options } = useCustomization();

  const categories: { value: SearchCategory; label: string; icon: React.ReactNode }[] = [
    { value: 'web', label: 'All', icon: <Search size={16} /> },
    { value: 'images', label: 'Images', icon: <Image size={16} /> },
    { value: 'videos', label: 'Videos', icon: <Play size={16} /> },
    { value: 'maps', label: 'Maps', icon: <Map size={16} /> },
    { value: 'news', label: 'News', icon: <Newspaper size={16} /> },
  ];

  const handleCategoryChange = (newCategory: SearchCategory) => {
    if (newCategory !== category) {
      setCategory(newCategory);
      performSearch(query, newCategory);
    }
  };

  return (
    <div className="w-full border-b overflow-x-auto" 
      style={{ 
        borderColor: options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        backgroundColor: options.darkMode ? options.theme.background : 'white',
      }}>
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 md:space-x-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-3 py-3 flex items-center transition-all duration-200 border-b-2 whitespace-nowrap ${
                category === cat.value ? 'border-current' : 'border-transparent'
              }`}
              style={{
                color: category === cat.value ? options.theme.primary : options.theme.text,
                opacity: category === cat.value ? 1 : 0.7,
                fontSize: options.fontSize === 'small' ? '0.85rem' : options.fontSize === 'large' ? '1rem' : '0.9rem',
              }}
            >
              <span className="mr-1">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;