import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader, AlertTriangle, Clock, Users } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navigation from "./Navigation";
import { API_URL, API_USERS } from "../config/apiurl";

interface User {
  id: number;
  name: string;
  department: string;
  shift: string;
  photo: string;
  phone: string;
}


// Fungsi untuk cek apakah user sedang dalam jam kerja shift-nya
const isWithinShift = (shift: string): boolean => {
  const now = new Date();
  const hour = now.getHours();

  switch (shift) {
    case "Pagi":
      return hour >= 7 && hour < 15;
    case "Siang":
      return hour >= 15 && hour < 23;
    case "Malam":
      return hour >= 23 || hour < 7;
    default:
      return false;
  }
};

export default function PhotoList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const extractStartHour = (shiftString: string): number => {
  const match = shiftString.match(/(\d{2}):(\d{2})/);
  if (match) {
    return parseInt(match[1]) * 60 + parseInt(match[2]); // konversi ke menit
  }
  return 9999; // fallback besar agar taruh di akhir
};

  const fetchUsers = async () => {
  try {
    setLoading(true);
    const response = await fetch(API_USERS);
    if (!response.ok) throw new Error("Failed to fetch users");
    const data: User[] = await response.json();

    // Urutkan berdasarkan waktu mulai shift (misalnya 07:00, 08:00, 15:20, dst)
    const sortedUsers = data.sort(
      (a, b) => extractStartHour(a.shift) - extractStartHour(b.shift)
    );

    setUsers(sortedUsers);
  } catch (err) {
    setError("Gagal memuat data pengguna");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const openWhatsApp = (phone: string) => {
    if (!phone.startsWith("628") || phone.length < 11) {
      alert("Nomor WhatsApp tidak valid.");
      return;
    }
    window.open(`https://wa.me/${phone}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-lg text-center border border-white/20 shadow-2xl">
          <Loader className="animate-spin text-white w-12 h-12 mx-auto mb-4" />
          <p className="text-white text-lg font-medium">Memuat data pengguna...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-rose-900 flex items-center justify-center p-4">
        <div className="bg-white/10 p-8 rounded-3xl text-center backdrop-blur-lg border border-white/20 shadow-2xl max-w-md">
          <AlertTriangle className="text-red-400 w-16 h-16 mx-auto mb-4" />
          <p className="text-white font-medium text-lg mb-6">{error}</p>
          <button
            onClick={fetchUsers}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-medium hover:from-red-600 hover:to-pink-600 transition"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="pt-16 min-h-screen bg-gradient-to-br from-red-400 via-red-600 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center mb-6 text-white/80 hover:text-white font-medium bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 hover:bg-white/20 transition"
              >
                <ArrowLeft className="mr-2 w-5 h-5" />
                Kembali
              </Link>

              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-100 via-gray-300 to-gray-200 bg-clip-text text-transparent mb-4">
                  Person in Charge
                </h1>
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-white">
                  <Users className="w-5 h-5" />
                  <span className="text-lg">Total:</span>
                  <span className="font-bold text-xl bg-gradient-to-r from-gray-200 to-gray-50 bg-clip-text text-transparent">
                    {users.length}
                  </span>
                  <span className="text-lg">PIC</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {users.map((user) => {
                const isActive = isWithinShift(user.shift);

                return (
                  <div
                    key={user.id}
                    className="group bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:border-white/40 transition hover:scale-105 shadow-lg"
                  >
                    <div className="relative p-4 sm:p-6 pt-6">
                      <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
                        <img
                          src={`${API_URL}/${user.photo}`}
                          alt={user.name}
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/400";
                          }}
                          className="w-full h-full object-cover rounded-full border-4 border-white/20 group-hover:border-white/40 transition duration-300 shadow-2xl"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                        <button
                          className={`absolute -bottom-2 -right-2 text-white p-3 rounded-full border-2 border-white shadow-lg transition ${
                            isActive
                              ? "bg-green-500 hover:bg-green-600 hover:scale-110 opacity-0 group-hover:opacity-100"
                              : "bg-gray-400 cursor-not-allowed opacity-50"
                          }`}
                          onClick={() => isActive && openWhatsApp(user.phone)}
                          disabled={!isActive}
                          aria-label="Chat di WhatsApp"
                        >
                          <FaWhatsapp className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="px-4 sm:px-6 pb-4 text-center">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{user.name}</h3>

                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        <span className="text-xs font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full shadow">
                          {user.department}
                        </span>
                        <span className="text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full shadow flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Shift {user.shift}
                        </span>
                      </div>

                      <div className="pt-4 border-t border-white/20 flex justify-center">
                        <button
                          className={`px-6 py-3 rounded-2xl text-sm flex items-center font-medium shadow-lg transition ${
                            isActive
                              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:scale-105"
                              : "bg-gray-400 text-white/70 cursor-not-allowed"
                          }`}
                          onClick={() => isActive && openWhatsApp(user.phone)}
                          disabled={!isActive}
                        >
                          <FaWhatsapp className="w-5 h-5 mr-2" />
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
