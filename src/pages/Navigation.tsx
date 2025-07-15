// src/components/Navigation.tsx
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import azkologo from "../assets/azkologo.png";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img src={azkologo} alt="Azko Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              Lacak Pengiriman Azko
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/listpic" className="text-rose-600 font-semibold hover:underline">PIC</Link>
            <a href="#about" className="text-gray-700 hover:text-red-600 transition-colors font-medium">Tentang</a>
          </div>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">Beranda</Link>
              <Link to="/listpic" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">PIC</Link>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">Tentang</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
