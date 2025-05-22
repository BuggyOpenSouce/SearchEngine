import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomizationProvider } from './context/CustomizationContext';
import { SearchProvider } from './context/SearchContext';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <CustomizationProvider>
      <SearchProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Router>
      </SearchProvider>
    </CustomizationProvider>
  );
}

export default App;