// src/components/Navigation.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import azkologo from "../assets/azkologo.png";
import { Home, Users, FileText, Info, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-red-400 via-red-400 to-rose-500/40 backdrop-blur-md border-b border-white/50 shadow-sm text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={azkologo}
              alt="Azko Logo"
              className="w-10 h-10 object-contain cursor-pointer"
            />
            {/* <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-100 via-gray-300 to-gray-50 bg-clip-text text-transparent">
              Lacak Pengiriman Azko
            </span> */}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/listpic" className="flex items-center gap-1 hover:text-gray-500 font-semibold hover:underline">
              <Users className="w-5 h-5" /> PIC
            </Link>
            <Link to="/form-request" className="flex items-center gap-1 hover:text-blue-500 font-medium transition-all">
              <FileText className="w-5 h-5" /> Form Request
            </Link>
            <Link to="/info" className="flex items-center gap-1 hover:text-green-500 font-medium transition-all">
              <Info className="w-5 h-5" /> Info
            </Link>
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-9 h-9 flex flex-col justify-center items-center group"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 bg-gradient-to-br from-red-500 via-red-600 to-rose-600/95 backdrop-blur-md border-t border-white/20 shadow-md rounded-b-lg">
            <div className="px-4 py-4 space-y-3 text-white">
              <Link
                to="/"
                className="flex items-center gap-2 font-medium hover:text-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-5 h-5" /> Home
              </Link>
              <Link
                to="/listpic"
                className="flex items-center gap-2 font-medium hover:text-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="w-5 h-5" /> PIC
              </Link>
              <Link
                to="/form-request"
                className="flex items-center gap-2 font-medium hover:text-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="w-5 h-5" /> Form Request
              </Link>
              <Link
                to="/info"
                className="flex items-center gap-2 font-medium hover:text-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="w-5 h-5" /> Info
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
