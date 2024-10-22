'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export const Navbar: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated, userProfile, setUserProfile } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserProfile(null)
    router.push('/login');
  };

  const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
    if (!isAuthenticated && href !== '/' && href !== '/login') {
      href = '/login';
    }
    return (
      <Link href={href} className="py-4 px-2 text-gray-600 dark:text-gray-100 hover:text-green-500 transition duration-300">
        {children}
      </Link>
    );
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg max-w-5xl mx-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 dark:text-gray-100 text-lg">Impactree</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/explore">Explore</NavLink>
              <NavLink href="/impact">Impact</NavLink>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <span className="text-gray-500 dark:text-gray-100">
                  {userProfile?.username}
                </span>
                <button onClick={handleLogout} className="py-4 px-2 text-gray-500 dark:text-gray-100 hover:text-green-500 transition duration-300">
                  Logout
                </button>
              </>
            ) : (
              <NavLink href="/login">Login</NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};