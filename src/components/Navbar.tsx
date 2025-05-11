'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import DarkModeToggle from '../components/DarkModeToggle';  // Import DarkModeToggle

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = (path: string) =>
    `block px-4 py-2 rounded-md text-base font-medium transition ${
      pathname === path
        ? 'bg-indigo-600 text-white'
        : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600'
    }`;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            <Link href="/" className="text-xl font-bold text-indigo-700 dark:text-white">
              Flashcard App
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/flashcards" className={linkClasses('/flashcards')}>
              Flashcards
            </Link>
            <Link href="/dashboard" className={linkClasses('/dashboard')}>
              Dashboard
            </Link>
          </div>

          {/* Right side controls */}
          <div className="hidden md:flex items-center gap-4">
            <SignedOut>
              <Link
                href="/sign-up"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Dark Mode Toggle */}
            <DarkModeToggle />  {/* Use the DarkModeToggle component */}
          </div>

          {/* Mobile toggle button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link href="/flashcards" className={linkClasses('/flashcards')} onClick={() => setIsOpen(false)}>
            Flashcards
          </Link>
          <Link href="/dashboard" className={linkClasses('/dashboard')} onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <SignedOut>
            <Link
              href="/sign-up"
              className="block mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </SignedOut>
          <SignedIn>
            <div className="mt-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          {/* Dark Mode Toggle for Mobile */}
          <DarkModeToggle />  {/* Use the DarkModeToggle component */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
