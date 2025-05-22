import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CustomizationOptions, Theme } from '../types';

const lightTheme: Theme = {
  primary: '#1a73e8',
  secondary: '#34a853',
  accent: '#ea4335',
  background: '#ffffff',
  text: '#202124',
  cardBackground: '#f8f9fa',
};

const darkTheme: Theme = {
  primary: '#8ab4f8',
  secondary: '#81c995',
  accent: '#f28b82',
  background: '#202124',
  text: '#e8eaed',
  cardBackground: '#303134',
};

const defaultCustomizationOptions: CustomizationOptions = {
  theme: lightTheme,
  fontSize: 'medium',
  resultDensity: 'comfortable',
  showPreviewImages: true,
  enableAnimations: true,
  darkMode: false,
};

type CustomizationContextType = {
  options: CustomizationOptions;
  updateOptions: (newOptions: Partial<CustomizationOptions>) => void;
  resetOptions: () => void;
  toggleDarkMode: () => void;
};

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export const CustomizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [options, setOptions] = useState<CustomizationOptions>(defaultCustomizationOptions);

  const updateOptions = (newOptions: Partial<CustomizationOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  };

  const resetOptions = () => {
    setOptions(defaultCustomizationOptions);
  };

  const toggleDarkMode = () => {
    setOptions((prev) => ({
      ...prev,
      darkMode: !prev.darkMode,
      theme: !prev.darkMode ? darkTheme : lightTheme,
    }));
  };

  return (
    <CustomizationContext.Provider value={{ options, updateOptions, resetOptions, toggleDarkMode }}>
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (context === undefined) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
};