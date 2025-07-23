import { Info } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="w-full mt-10 pb-6">
    <div className="max-w-2xl mx-auto text-center text-xs sm:text-sm text-gray-500 space-y-2">
      <div>
        &copy; {new Date().getFullYear()} Lacak Pengiriman Azko. Dibuat oleh{" "}
        <a
          href="https://ariandto.pro"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline hover:text-red-700 transition"
        >
          Budi Ariyanto
        </a>
      </div>
      <div className="flex justify-center items-center gap-1 text-blue-500 hover:text-red-700 transition">
        <Info className="w-4 h-4" />
        <Link
          to="/visitor"
          className="hover:underline hover:text-rose-600 transition"
        >
         Lihat Riwayat Pengunjung
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
