// src/components/Navigation.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import azkologo from "../assets/azkologo.png";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={azkologo}
              alt="Azko Logo"
              className="w-10 h-10 object-contain cursor-pointer"
            />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              Lacak Pengiriman Azko
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/listpic" className="text-rose-600 font-semibold hover:underline">PIC</Link>
            <a href="/info" className="text-gray-700 hover:text-rose-600 font-medium transition-all">Info</a>
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-9 h-9 flex flex-col justify-center items-center group"
              aria-label="Menu"
            >
              <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`w-6 h-0.5 bg-gray-800 mt-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-gray-800 mt-1.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-md rounded-b-lg">
            <div className="px-4 py-4 space-y-2">
              <Link
                to="/"
                className="block text-gray-800 font-medium hover:text-rose-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                to="/listpic"
                className="block text-gray-800 font-medium hover:text-rose-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                PIC
              </Link>
              <Link
                to="/form-request"
                className="block text-gray-800 font-medium hover:text-rose-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Form Request
              </Link>
              <div className="px-4 py-4 space-y-2">
              <Link
                to="/"
                className="block text-gray-800 font-medium hover:text-rose-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Info
              </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
