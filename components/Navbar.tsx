'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const closeMenu = () => setIsOpen(false);

  const openBookingModal = () => {
    closeMenu();
    document.getElementById('bookingModal')?.classList.remove('hidden');
  };

  return (
    <nav className="bg-amber-200 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/nirvana/logo.png"
            alt="Nirvana De Spa Logo"
            className="h-12 w-auto object-contain"
            width={48}
            height={48}
          />
          <h2 className="text-sm sm:text-xxsm lg:text-xl font-bold font-serif text-gray-800">
            nirvana de spa    
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center text-gray-800">
          <Link href="/" className="hover:text-amber-600 transition">Home</Link>
          <Link href="/services" className="hover:text-amber-600 transition">Services</Link>
          <Link href="/about" className="hover:text-amber-600 transition">About</Link>
          <Button
            onClick={openBookingModal}
            variant="primary"
            className="ml-2"
          >
            Book Now
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={closeMenu}
        aria-hidden={!isOpen}
      />
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-lg z-50 transform transition-transform duration-200 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div className="flex flex-col h-full p-6 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-black">Menu</span>
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="text-gray-700"
            >
              <X size={28} />
            </button>
          </div>
          <Link href="/" onClick={closeMenu} className="py-2 text-lg hover:text-amber-600 transition">
            Home
          </Link>
          <Link href="/services" onClick={closeMenu} className="py-2 text-lg hover:text-amber-600 transition">
            Services
          </Link>
          <Link href="/about" onClick={closeMenu} className="py-2 text-lg hover:text-amber-600 transition">
            About
          </Link>
          <Button
            onClick={openBookingModal}
            variant="primary"
            className="w-full mt-auto"
          >
            Book Now
          </Button>
        </div>
      </div>
    </nav>
  );
}
