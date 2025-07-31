import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Users, FileText, Info } from "lucide-react";

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) =>
    currentPath.startsWith(path) ? "text-yellow-300" : "text-white";

  const handleDivisiSelect = (divisi: string) => {
    setShowDropdown(false);
    navigate(divisi === "All" ? "/listpic" : `/listpic/${divisi.replace(/\s+/g, "-")}`);
  };

  // ✅ Tutup dropdown saat klik di luar area dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-gradient-to-br from-rose-600 via-red-500 to-red-600 border-t border-white/30 shadow-inner backdrop-blur-md">
      <div className="flex justify-around items-center h-14 px-6 text-sm relative">
        {/* PIC with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`flex flex-col items-center ${isActive("/listpic")}`}
          >
            <Users className="w-5 h-5 mb-1" />
            PIC
          </button>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-44 rounded-xl shadow-lg z-50 text-sm font-medium">
              <button
                onClick={() => handleDivisiSelect("All")}
                className="w-full text-left px-4 py-2 bg-gray-200 hover:opacity-80 rounded-t-xl"
              >
               ALL
              </button>
              <button
                onClick={() => handleDivisiSelect("Transport Planning")}
                className="w-full text-left px-4 py-2 bg-blue-500 text-white hover:opacity-80"
              >
                Transport Planning
              </button>
              <button
                onClick={() => handleDivisiSelect("Duty DC")}
                className="w-full text-left px-4 py-2 bg-yellow-500 text-black hover:opacity-80"
              >
                Duty DC
              </button>
              <button
                onClick={() => handleDivisiSelect("Planner DC")}
                className="w-full text-left px-4 py-2 bg-green-500 text-white hover:opacity-80 rounded-b-xl"
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
