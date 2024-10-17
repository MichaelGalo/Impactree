'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 dark:text-gray-100 text-lg">Impactree</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="py-4 px-2 text-gray-500 dark:text-gray-100 hover:text-green-500 transition duration-300">Home</Link>
              <Link href="/explore" className="py-4 px-2 text-gray-500 dark:text-gray-100 hover:text-green-500 transition duration-300">Explore</Link>
              <Link href="/impact" className="py-4 px-2 text-gray-500 dark:text-gray-100 hover:text-green-500 transition duration-300">Impact</Link>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Link href="/login" className="py-4 px-2 text-gray-500 dark:text-gray-100 hover:text-green-500 transition duration-300">Login</Link>
            <Link href="/logout" className="py-4 px-2 text-gray-500 dark:text-gray-100 hover:text-green-500 transition duration-300">Logout</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};