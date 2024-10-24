'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import {  
  Navbar,   
  NavbarBrand,   
  NavbarContent,   
  NavbarItem,   
  NavbarMenuToggle,  
  NavbarMenu,  
  NavbarMenuItem
} from "@nextui-org/navbar";
import { Button } from '@nextui-org/react';

export const Nav: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated, userProfile, setUserProfile } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserProfile(null);
    router.push('/login');
  };

  const menuItems = isAuthenticated 
    ? [
        { name: "Home", href: "/" },
        { name: "Profile", href: "/profile" },
        { name: "Impact", href: "/impactplans" },
        { name: "Charities", href: "/charities" },
        { name: "Log Out", href: "#", onClick: handleLogout }
      ]
    : [
        { name: "About", href: "/" },
        { name: "Login", href: "/login" },
        { name: "Sign Up", href: "/register" }
      ];

  const handleNavigation = (href: string) => {
    if (!isAuthenticated && href !== '/' && href !== '/login' && href !== '/register') {
      router.push('/login');
    } else {
      router.push(href);
    }
  };

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-gray-900 dark:text-gray-100"
        />
        <NavbarBrand>
          <p className="font-bold text-gray-900 dark:text-gray-100">Impactree</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
            About
          </Link>
        </NavbarItem>
        {isAuthenticated ? (
          <>
            <NavbarItem>
              <Link 
                href="/charities" 
                onClick={() => handleNavigation('/charities')}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                Explore
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link 
                href="/impactplans" 
                onClick={() => handleNavigation('/impactplans')}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                Impact
              </Link>
            </NavbarItem>
          </>
        ) : null}
      </NavbarContent>

      <NavbarContent justify="end">
        <ThemeToggle />
        {isAuthenticated ? (
          <>
            <NavbarItem>
              <span className="text-gray-900 dark:text-gray-100">
                {userProfile?.username}
              </span>
            </NavbarItem>
            <NavbarItem>
              <Button 
                variant="flat"
                className="bg-transparent hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button 
                as={Link}
                href="/register" 
                variant="flat"
                className="bg-transparent hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu className="bg-white dark:bg-gray-800 pt-6">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            {item.name === "Log Out" ? (
              <Link
                className="w-full text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                href="/"
                onClick={handleLogout}
              >
                {item.name}
              </Link>
            ) : (
              <Link
                className="w-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                href={item.href}
                onClick={() => handleNavigation(item.href)}
              >
                {item.name}
              </Link>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};