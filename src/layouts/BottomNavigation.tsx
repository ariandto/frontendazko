import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Users, FileText, Info, ChevronDown, X } from "lucide-react";

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [showDropdown, setShowDropdown] = useState(false);

  const isActive = (path: string) =>
    currentPath.startsWith(path) ? "text-blue-400" : "text-slate-400";

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
      {/* Backdrop overlay for dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setShowDropdown(false)}
        />
      )}
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        {/* Glassmorphism background with modern gradient */}
        <div className="bg-white/10 backdrop-blur-xl border-t border-white/20 shadow-2xl">
          <div className="bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90">
            <div className="flex justify-around items-center h-16 px-4 relative">
              
              {/* PIC with Dropdown */}
              <div className="relative flex-1 flex justify-center">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                    isActive("/listpic")
                      ? "text-blue-400 bg-blue-400/10 shadow-lg shadow-blue-400/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="relative">
                    <Users className="w-6 h-6" />
                    {currentPath.startsWith("/listpic") && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                    )}
                  </div>
                  <span className="text-xs font-medium">PIC</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      showDropdown ? "rotate-180" : ""
                    }`} 
                  />
                </button>

                {/* Modern Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-56 z-50">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                      {/* Dropdown Header */}
                      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 flex items-center justify-between">
                        <h3 className="text-white font-semibold text-sm">Pilih Divisi</h3>
                        <button
                          onClick={() => setShowDropdown(false)}
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Dropdown Items */}
                      <div className="py-2">
                        {divisions.map((division, index) => (
                          <button
                            key={division.value}
                            onClick={() => handleDivisiSelect(division.value)}
                            className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 text-slate-700 ${
                              index === 0 ? "border-b border-slate-200" : ""
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-slate-400 rounded-full" />
                              <span>{division.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Request - Center with emphasis */}
              <div className="flex-1 flex justify-center">
                <Link 
                  to="/form-request" 
                  className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive("/form-request")
                      ? "text-blue-400 bg-blue-400/10 shadow-lg shadow-blue-400/20 scale-110"
                      : "text-slate-400 hover:text-white hover:bg-white/5 hover:scale-105"
                  }`}
                >
                  <div className="relative">
                    <div className={`p-2 rounded-full transition-all duration-300 ${
                      isActive("/form-request")
                        ? "bg-blue-400/20 shadow-lg shadow-blue-400/30"
                        : "bg-white/5"
                    }`}>
                      <FileText className="w-6 h-6" />
                    </div>
                    {currentPath.startsWith("/form-request") && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
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
                      ? "text-blue-400 bg-blue-400/10 shadow-lg shadow-blue-400/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
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
        </div>
        
        {/* Bottom safe area for devices with home indicator */}
        <div className="h-safe-area-inset-bottom bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90" />
      </nav>
    </>
  );
}
