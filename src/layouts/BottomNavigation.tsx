 // src/layouts/BottomNavigation.tsx
import { Link, useLocation } from "react-router-dom";
import { Users, FileText, Info } from "lucide-react";

export default function BottomNavigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) =>
    currentPath === path ? "text-yellow-300" : "text-white";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-gradient-to-br from-rose-600 via-red-500 to-red-600 border-t border-white/30 shadow-inner backdrop-blur-md">
      <div className="flex justify-around items-center h-14 px-6 text-sm">
        <Link to="/listpic" className={flex flex-col items-center ${isActive("/listpic")}}>
          <Users className="w-5 h-5 mb-1" />
          PIC
        </Link>
        <Link to="/form-request" className={flex flex-col items-center ${isActive("/form-request")}}>
          <FileText className="w-6 h-6 mb-1" />
          Request
        </Link>
        <Link to="/info" className={flex flex-col items-center ${isActive("/info")}}>
          <Info className="w-5 h-5 mb-1" />
          Info
        </Link>
      </div>
    </nav>
  );
}


