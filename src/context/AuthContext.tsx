'use client';

import React, { createContext, useState, useContext } from 'react';
import { UserProfile } from '@/types/user.types';

type AuthContextType = {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  setIsAuthenticated: (value: boolean) => void;
  setUserProfile: (profile: UserProfile | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userProfile: null,
  setIsAuthenticated: () => {},
  setUserProfile: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userProfile, 
      setIsAuthenticated, 
      setUserProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);