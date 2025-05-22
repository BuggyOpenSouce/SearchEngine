import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Settings } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

type HeaderProps = {
  toggleCustomizationPanel: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleCustomizationPanel }) => {
  const location = useLocation();
  const { options, toggleDarkMode } = useCustomization();
  const isHomePage = location.pathname === '/';

  return (
    <header className={`w-full py-4 px-4 md:px-6 ${isHomePage ? 'absolute top-0 left-0 z-10' : 'bg-opacity-95 backdrop-blur-sm'}`}
      style={{ 
        backgroundColor: options.darkMode ? 'rgba(32, 33, 36, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        color: options.theme.text
      }}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold" style={{ color: options.theme.primary }}>
              Buggy<span style={{ color: options.theme.accent }}>Search</span>
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full transition-colors duration-200"
            style={{ 
              backgroundColor: options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            }}
            aria-label={options.darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {options.darkMode ? (
              <Sun size={20} style={{ color: options.theme.text }} />
            ) : (
              <Moon size={20} style={{ color: options.theme.text }} />
            )}
          </button>
          
          <button 
            onClick={toggleCustomizationPanel}
            className="p-2 rounded-full transition-colors duration-200"
            style={{ 
              backgroundColor: options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            }}
            aria-label="Customize"
          >
            <Settings size={20} style={{ color: options.theme.text }} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;