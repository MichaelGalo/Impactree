'use client';

import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { Navbar } from './Navbar';

export const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="antialiased bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen">
        <div className="p-4">
          <Navbar />
        </div>
        {children}
      </div>
    </ThemeProvider>
  );
};