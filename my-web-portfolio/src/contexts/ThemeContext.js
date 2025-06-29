"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      // Set dark mode as default if no saved preference
      localStorage.setItem('theme-mode', 'dark');
    }
  }, []);

  // Update body class when mode changes
  useEffect(() => {
    document.body.className = mode === 'dark' ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const value = {
    mode,
    toggleMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 