'use client';

import { UserProfile } from '@/types/user.types';
import React, { createContext, useState, useContext, useEffect } from 'react';


type AuthContextType = {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  setIsAuthenticated: (value: boolean) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setAuthData: (token: string, user: UserProfile) => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userProfile: null,
  setIsAuthenticated: () => {},
  setUserProfile: () => {},
  setAuthData: () => {},
  isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Initialize auth state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const storedProfile = localStorage.getItem('userProfile');
      
      setIsAuthenticated(!!token);
      setUserProfile(storedProfile ? JSON.parse(storedProfile) : null);
      setIsLoading(false);
    }
  }, []);

  const setAuthData = (token: string, user: UserProfile) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userProfile', JSON.stringify(user));
    setIsAuthenticated(true);
    setUserProfile(user);
  };

  // Watch for token removal
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setUserProfile(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userProfile,
      setIsAuthenticated,
      setUserProfile,
      setAuthData,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);