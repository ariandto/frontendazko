import { useState } from "react";
import { Users, FileText, Info, ChevronUp, ChevronDown } from "lucide-react";

export default function BottomNavigation() {
  // Mock location and navigate for demo
  const currentPath = "/listpic"; // Demo active path
  const [showDivisions, setShowDivisions] = useState(false);

  const isActive = (path: string) =>
    currentPath === path 
      ? "text-amber-300 scale-110" 
      : "text-white/80 hover:text-white hover:scale-105";

  const divisions = ["Duty-DC", "Planer-DC", "Transport-Planning"];

  const handleDivisionClick = (division: string) => {
    setShowDivisions(false);
    console.log(`Navigate to: /listpic/${division.toLowerCase()}`);
    // In your app: navigate(`/listpic/${encodeURIComponent(division.toLowerCase())}`);
  };

  const handleNavigation = (path: string) => {
    console.log(`Navigate to: ${path}`);
    // In your app: navigate(path);
  };

  return (
    <>
      {/* Backdrop overlay */}
      {showDivisions && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setShowDivisions(false)}
        />
      )}
      
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        {/* Modern glassmorphism container */}
        <div className="mx-4 mb-4 bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/25">
          <div className="flex justify-around items-center h-16 px-6 relative">
            {/* PIC with dropdown */}
            <button
              onClick={() => setShowDivisions(!showDivisions)}
              className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 ease-out ${isActive("/listpic")} group`}
            >
              <div className="relative">
                <Users className="w-6 h-6 mb-1 transition-transform duration-300" />
                {currentPath.includes("/listpic") && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-300 rounded-full animate-pulse" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs font-medium">
                <span>PIC</span>
                {showDivisions ? (
                  <ChevronUp className="w-3 h-3 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                )}
              </div>
            </button>

            {/* Request button */}
            <button
              onClick={() => handleNavigation("/form-request")}
              className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 ease-out ${isActive("/form-request")} group`}
            >
              <div className="relative">
                <FileText className="w-6 h-6 mb-1 transition-transform duration-300" />
                {currentPath === "/form-request" && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-300 rounded-full animate-pulse" />
                )}
              </div>
              <span className="text-xs font-medium">Request</span>
            </button>

            {/* Info button */}
            <button
              onClick={() => handleNavigation("/info")}
              className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 ease-out ${isActive("/info")} group`}
            >
              <div className="relative">
                <Info className="w-6 h-6 mb-1 transition-transform duration-300" />
                {currentPath === "/info" && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-300 rounded-full animate-pulse" />
                )}
              </div>
              <span className="text-xs font-medium">Info</span>
            </button>
          </div>
        </div>

        {/* Modern dropdown menu */}
        {showDivisions && (
          <div className="absolute bottom-20 left-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/25 overflow-hidden">
              <div className="p-2">
                {divisions.map((division, index) => (
                  <button
                    key={division}
                    onClick={() => handleDivisionClick(division)}
                    className="w-full text-left px-4 py-3 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-200 ease-out hover:scale-[1.02] font-medium"
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                      {division}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Desktop version - responsive design */}
      <nav className="hidden md:fixed md:top-0 md:left-0 md:right-0 md:z-40 md:block">
        <div className="bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-center items-center h-16 gap-8">
              {/* Desktop PIC dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDivisions(!showDivisions)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive("/listpic")} group`}
                >
                  <Users className="w-5 h-5" />
                  <span className="font-medium">PIC</span>
                  {showDivisions ? (
                    <ChevronUp className="w-4 h-4 transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                  )}
                </button>
                
                {showDivisions && (
                  <div className="absolute top-12 left-0 min-w-48 bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl shadow-black/25 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                    <div className="p-2">
                      {divisions.map((division, index) => (
                        <button
                          key={division}
                          onClick={() => handleDivisionClick(division)}
                          className="w-full text-left px-4 py-3 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-lg transition-all duration-200 font-medium"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                            {division}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Request */}
              <button
                onClick={() => handleNavigation("/form-request")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive("/form-request")}`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Request</span>
              </button>

              {/* Desktop Info */}
              <button
                onClick={() => handleNavigation("/info")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive("/info")}`}
              >
                <Info className="w-5 h-5" />
                <span className="font-medium">Info</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
