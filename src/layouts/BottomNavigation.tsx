import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Users, FileText, Info, ChevronDown } from "lucide-react";

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [showDropdown, setShowDropdown] = useState(false);

  const isActive = (path: string) =>
    currentPath.startsWith(path) ? "text-yellow-300" : "text-white";

  const handleDivisiSelect = (divisi: string) => {
    setShowDropdown(false);
    navigate(divisi === "All" ? "/listpic" : `/listpic/${divisi.replace(/\s+/g, "-")}`);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-gradient-to-br from-rose-600 via-red-500 to-red-600 border-t border-white/30 shadow-inner backdrop-blur-md">
      <div className="flex justify-around items-center h-14 px-6 text-sm relative">
        {/* PIC with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`flex flex-col items-center ${isActive("/listpic")}`}
          >
            <Users className="w-5 h-5 mb-1" />
            PIC
            <ChevronDown className="w-4 h-4 mt-0.5" />
          </button>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-40 bg-white text-gray-800 rounded-xl shadow-lg z-50 text-sm font-medium">
              <button
                onClick={() => handleDivisiSelect("All")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-xl"
              >
                Semua PIC
              </button>
              <button
                onClick={() => handleDivisiSelect("Transport Planning")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Transport Planning
              </button>
              <button
                onClick={() => handleDivisiSelect("Planner DC")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-xl"
              >
                Planner DC
              </button>
            </div>
          )}
        </div>

        {/* Request */}
        <Link to="/form-request" className={`flex flex-col items-center ${isActive("/form-request")}`}>
          <FileText className="w-6 h-6 mb-1" />
          Request
        </Link>

        {/* Info */}
        <Link to="/info" className={`flex flex-col items-center ${isActive("/info")}`}>
          <Info className="w-5 h-5 mb-1" />
          Info
        </Link>
      </div>
    </nav>
  );
}
