// src/components/Navigation.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import azkologo from "../assets/azkologo.png";
import { Home, Users, FileText, Info, X, MoreVertical } from "lucide-react";

export default function TopNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

const getPageTitle = () => {
  if (currentPath === "/") return "Home";
  if (currentPath === "/listpic") return "Daftar PIC";
  if (currentPath === "/form-request") return "Form Request";
  if (currentPath === "/visitor") return "Riwayat Pengunjung";
  if (currentPath === "/info") return "Informasi Penting";

  // Tambahan: untuk menangani route dinamis /listpic/...
  if (currentPath.startsWith("/listpic/")) {
    const divisiSlug = currentPath.split("/")[2];
    const divisiMap: Record<string, string> = {
      "transport-planning": "Transport Planning",
      "duty-dc": "Duty DC",
      "planner-dc": "Planner DC",
    };
    return `PIC ${divisiMap[divisiSlug] || divisiSlug}`;
  }

  return "Lacak Pengiriman";
};

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-red-400 via-red-400 to-rose-500/40 backdrop-blur-md border-b border-white/50 shadow-sm text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo & Dynamic Title */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={azkologo}
              alt="Azko Logo"
              className="w-10 h-10 object-contain cursor-pointer"
            />
            <span className="text-sm sm:text-base font-semibold text-white">
              {getPageTitle()}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/listpic"
              className={`flex items-center gap-1 font-semibold hover:underline ${
                currentPath === "/listpic" ? "text-yellow-200" : "hover:text-gray-100"
              }`}
            >
              <Users className="w-5 h-5" /> PIC
            </Link>
            <Link
              to="/form-request"
              className={`flex items-center gap-1 font-medium transition-all ${
                currentPath === "/form-request" ? "text-yellow-200" : "hover:text-blue-200"
              }`}
            >
              <FileText className="w-5 h-5" /> Form Request
            </Link>
            <Link
              to="/info"
              className={`flex items-center gap-1 font-medium transition-all ${
                currentPath === "/info" ? "text-yellow-200" : "hover:text-green-200"
              }`}
            >
              <Info className="w-5 h-5" /> Info
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-9 h-9 flex flex-col justify-center items-center group"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <MoreVertical className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 bg-gradient-to-br from-red-500 via-red-600 to-rose-600/95 backdrop-blur-md border-t border-white/20 shadow-md rounded-b-lg">
            <div className="px-4 py-4 space-y-3 text-white">
              {currentPath !== "/" && (
                <Link
                  to="/"
                  className="flex items-center gap-2 font-medium hover:text-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="w-5 h-5" /> Home
                </Link>
              )}
              {currentPath !== "/listpic" && (
                <Link
                  to="/listpic"
                  className="flex items-center gap-2 font-medium hover:text-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="w-5 h-5" /> PIC
                </Link>
              )}
              {currentPath !== "/form-request" && (
                <Link
                  to="/form-request"
                  className="flex items-center gap-2 font-medium hover:text-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FileText className="w-5 h-5" /> Form Request
                </Link>
              )}
              {currentPath !== "/info" && (
                <Link
                  to="/info"
                  className="flex items-center gap-2 font-medium hover:text-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Info className="w-5 h-5" /> Info
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
