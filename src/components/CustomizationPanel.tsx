import React from 'react';
import { useCustomization } from '../context/CustomizationContext';
import { X, Paintbrush, Type, Layout, Image, Sparkles, Check } from 'lucide-react';
import { CustomizationOptions, Theme } from '../types';

type CustomizationPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ isOpen, onClose }) => {
  const { options, updateOptions, resetOptions } = useCustomization();

  const colorSchemes: { name: string; light: Theme; dark: Theme }[] = [
    {
      name: 'Blue (Default)',
      light: {
        primary: '#1a73e8',
        secondary: '#34a853',
        accent: '#ea4335',
        background: '#ffffff',
        text: '#202124',
        cardBackground: '#f8f9fa',
      },
      dark: {
        primary: '#8ab4f8',
        secondary: '#81c995',
        accent: '#f28b82',
        background: '#202124',
        text: '#e8eaed',
        cardBackground: '#303134',
      },
    },
    {
      name: 'Purple',
      light: {
        primary: '#6d28d9',
        secondary: '#059669',
        accent: '#db2777',
        background: '#ffffff',
        text: '#1f2937',
        cardBackground: '#f9fafb',
      },
      dark: {
        primary: '#a78bfa',
        secondary: '#34d399',
        accent: '#f472b6',
        background: '#1f2937',
        text: '#f9fafb',
        cardBackground: '#374151',
      },
    },
    {
      name: 'Orange',
      light: {
        primary: '#ea580c',
        secondary: '#0891b2',
        accent: '#4f46e5',
        background: '#ffffff',
        text: '#27272a',
        cardBackground: '#fafafa',
      },
      dark: {
        primary: '#fb923c',
        secondary: '#22d3ee',
        accent: '#818cf8',
        background: '#27272a',
        text: '#fafafa',
        cardBackground: '#3f3f46',
      },
    },
  ];

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-full md:w-96 z-50 shadow-xl transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ 
        backgroundColor: options.darkMode ? options.theme.background : 'white',
        color: options.theme.text,
      }}
    >
      <div className="p-4 border-b" style={{ borderColor: options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Customize BuggySearch</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full transition-colors duration-200 hover:bg-opacity-10"
            style={{ 
              backgroundColor: options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            }}
            aria-label="Close customization panel"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 70px)' }}>
        <div className="space-y-6">
          {/* Color Theme */}
          <div>
            <div className="flex items-center mb-3">
              <Paintbrush size={18} className="mr-2" />
              <h3 className="text-lg font-medium">Color Theme</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.name}
                  onClick={() => {
                    const newTheme = options.darkMode ? scheme.dark : scheme.light;
                    updateOptions({ theme: newTheme });
                  }}
                  className={`p-3 rounded-lg border transition-all duration-200 flex items-center justify-between ${
                    options.theme.primary === (options.darkMode ? scheme.dark.primary : scheme.light.primary)
                      ? 'border-current'
                      : 'border-transparent'
                  }`}
                  style={{ 
                    backgroundColor: options.darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: options.theme.primary === (options.darkMode ? scheme.dark.primary : scheme.light.primary)
                      ? options.theme.primary
                      : options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <span>{scheme.name}</span>
                  
                  <div className="flex space-x-1">
                    <div className="w-5 h-5 rounded-full" style={{ backgroundColor: options.darkMode ? scheme.dark.primary : scheme.light.primary }}></div>
                    <div className="w-5 h-5 rounded-full" style={{ backgroundColor: options.darkMode ? scheme.dark.secondary : scheme.light.secondary }}></div>
                    <div className="w-5 h-5 rounded-full" style={{ backgroundColor: options.darkMode ? scheme.dark.accent : scheme.light.accent }}></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Font Size */}
          <div>
            <div className="flex items-center mb-3">
              <Type size={18} className="mr-2" />
              <h3 className="text-lg font-medium">Font Size</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => updateOptions({ fontSize: size })}
                  className={`py-2 px-3 rounded-lg border transition-all duration-200 ${
                    options.fontSize === size ? 'border-current' : 'border-transparent'
                  }`}
                  style={{ 
                    backgroundColor: options.darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: options.fontSize === size
                      ? options.theme.primary
                      : options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    color: options.fontSize === size ? options.theme.primary : options.theme.text,
                  }}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Result Density */}
          <div>
            <div className="flex items-center mb-3">
              <Layout size={18} className="mr-2" />
              <h3 className="text-lg font-medium">Result Density</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {(['compact', 'comfortable', 'spacious'] as const).map((density) => (
                <button
                  key={density}
                  onClick={() => updateOptions({ resultDensity: density })}
                  className={`py-2 px-3 rounded-lg border transition-all duration-200 ${
                    options.resultDensity === density ? 'border-current' : 'border-transparent'
                  }`}
                  style={{ 
                    backgroundColor: options.darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: options.resultDensity === density
                      ? options.theme.primary
                      : options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    color: options.resultDensity === density ? options.theme.primary : options.theme.text,
                  }}
                >
                  {density.charAt(0).toUpperCase() + density.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Preview Images */}
          <div>
            <div className="flex items-center mb-3">
              <Image size={18} className="mr-2" />
              <h3 className="text-lg font-medium">Preview Images</h3>
            </div>
            
            <button
              onClick={() => updateOptions({ showPreviewImages: !options.showPreviewImages })}
              className="flex items-center justify-between w-full p-3 rounded-lg border transition-all duration-200"
              style={{ 
                backgroundColor: options.darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                borderColor: options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              }}
            >
              <span>Show preview images</span>
              
              <div 
                className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ${options.showPreviewImages ? '' : 'bg-opacity-40'}`}
                style={{ 
                  backgroundColor: options.showPreviewImages 
                    ? options.theme.primary 
                    : options.darkMode 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'rgba(0, 0, 0, 0.2)',
                }}
              >
                <div 
                  className={`w-4 h-4 rounded-full transform transition-transform duration-200 ${
                    options.showPreviewImages ? 'translate-x-4' : 'translate-x-0'
                  }`}
                  style={{ backgroundColor: 'white' }}
                ></div>
              </div>
            </button>
          </div>
          
          {/* Animations */}
          <div>
            <div className="flex items-center mb-3">
              <Sparkles size={18} className="mr-2" />
              <h3 className="text-lg font-medium">Animations</h3>
            </div>
            
            <button
              onClick={() => updateOptions({ enableAnimations: !options.enableAnimations })}
              className="flex items-center justify-between w-full p-3 rounded-lg border transition-all duration-200"
              style={{ 
                backgroundColor: options.darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                borderColor: options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              }}
            >
              <span>Enable animations</span>
              
              <div 
                className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ${options.enableAnimations ? '' : 'bg-opacity-40'}`}
                style={{ 
                  backgroundColor: options.enableAnimations 
                    ? options.theme.primary 
                    : options.darkMode 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'rgba(0, 0, 0, 0.2)',
                }}
              >
                <div 
                  className={`w-4 h-4 rounded-full transform transition-transform duration-200 ${
                    options.enableAnimations ? 'translate-x-4' : 'translate-x-0'
                  }`}
                  style={{ backgroundColor: 'white' }}
                ></div>
              </div>
            </button>
          </div>
          
          {/* Reset Button */}
          <div className="pt-4 border-t" style={{ borderColor: options.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
            <button
              onClick={resetOptions}
              className="w-full py-3 rounded-lg border transition-colors duration-200 flex items-center justify-center font-medium"
              style={{ 
                backgroundColor: 'transparent',
                borderColor: options.darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                color: options.theme.text,
              }}
            >
              <Check size={18} className="mr-2" />
              Reset to defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;