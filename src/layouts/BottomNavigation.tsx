import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Users, FileText, Info, ChevronUp, ChevronDown } from "lucide-react";

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [showDivisions, setShowDivisions] = useState(false);

  const isActive = (path: string) =>
    currentPath === path ? "text-yellow-300" : "text-white";

  const divisions = ["Duty-DC", "Planer-DC", "Transport-Planning"];

  const handleDivisionClick = (division: string) => {
    setShowDivisions(false);
    navigate(`/listpic/${encodeURIComponent(division.toLowerCase())}`);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-gradient-to-br from-rose-600 via-red-500 to-red-600 border-t border-white/30 shadow-inner backdrop-blur-md">
      <div className="flex justify-around items-center h-14 px-6 text-sm relative">
        {/* PIC with dropdown */}
        <button
          onClick={() => setShowDivisions(!showDivisions)}
          className={`flex flex-col items-center focus:outline-none ${isActive("/listpic")}`}
        >
          <Users className="w-5 h-5 mb-1" />
          PIC {showDivisions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <button
          onClick={() => navigate("/form-request")}
          className={`flex flex-col items-center ${isActive("/form-request")}`}
        >
          <FileText className="w-6 h-6 mb-1" />
          Request
        </button>

        <button
          onClick={() => navigate("/info")}
          className={`flex flex-col items-center ${isActive("/info")}`}
        >
          <Info className="w-5 h-5 mb-1" />
          Info
        </button>

        {/* Dropdown */}
        {showDivisions && (
          <div className="absolute bottom-16 left-2 right-2 bg-white text-gray-800 rounded-lg shadow-lg p-2 z-50">
            {divisions.map((division) => (
              <button
                key={division}
                onClick={() => handleDivisionClick(division)}
                className="w-full text-left px-4 py-2 hover:bg-red-100 rounded"
              >
                {division}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
