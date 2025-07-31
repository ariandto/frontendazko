import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Users, FileText, Info, ChevronDown, X } from "lucide-react";

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

  const divisions = [
    { label: "Semua PIC", value: "All" },
    { label: "Transport Planning", value: "Transport Planning" },
    { label: "Planner DC", value: "Planner DC" },
    { label: "Duty DC", value: "Duty DC" }
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 border-t border-red-400/30 shadow-2xl">
          <div className="flex justify-around items-center h-16 px-4 relative">

            {/* PIC with Dropdown */}
            <div className="relative flex-1 flex justify-center">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive("/listpic")
                    ? "text-yellow-300 bg-yellow-300/10 shadow-lg shadow-yellow-300/20"
                    : "text-white hover:text-yellow-200 hover:bg-white/10"
                }`}
              >
                <div className="relative">
                  <Users className="w-6 h-6" />
                  {currentPath.startsWith("/listpic") && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-pulse" />
                  )}
                </div>
                <span className="text-xs font-medium">PIC</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute bottom-20 z-50 w-[90vw] max-w-xs left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0">
                  <div className="bg-white/95 rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-600 to-red-500 px-4 py-3 flex items-center justify-between">
                      <h3 className="text-white font-semibold text-sm">Pilih Divisi</h3>
                      <button
                        onClick={() => setShowDropdown(false)}
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Items */}
                    <div className="py-2">
                      {divisions.map((division, index) => (
                        <button
                          key={division.value}
                          onClick={() => handleDivisiSelect(division.value)}
                          className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-red-50 hover:text-red-700 text-slate-700 ${
                            index === 0 ? "border-b border-red-200" : ""
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-red-400 rounded-full" />
                            <span>{division.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Request */}
            <div className="flex-1 flex justify-center">
              <Link
                to="/form-request"
                className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive("/form-request")
                    ? "text-yellow-300 bg-yellow-300/10 shadow-lg shadow-yellow-300/20 scale-110"
                    : "text-white hover:text-yellow-200 hover:bg-white/10 hover:scale-105"
                }`}
              >
                <div className="relative">
                  <div
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isActive("/form-request")
                        ? "bg-yellow-300/20 shadow-lg shadow-yellow-300/30"
                        : "bg-white/10"
                    }`}
                  >
                    <FileText className="w-6 h-6" />
                  </div>
                  {currentPath.startsWith("/form-request") && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-pulse" />
                  )}
                </div>
                <span className="text-xs font-semibold">Request</span>
              </Link>
            </div>

            {/* Info */}
            <div className="flex-1 flex justify-center">
              <Link
                to="/info"
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive("/info")
                    ? "text-yellow-300 bg-yellow-300/10 shadow-lg shadow-yellow-300/20"
                    : "text-white hover:text-yellow-200 hover:bg-white/10"
                }`}
              >
                <div className="relative">
                  <Info className="w-6 h-6" />
                  {currentPath.startsWith("/info") && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                  )}
                </div>
                <span className="text-xs font-medium">Info</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="h-safe-area-inset-bottom bg-gradient-to-r from-red-600 via-red-500 to-red-600" />
      </nav>
    </>
  );
}
