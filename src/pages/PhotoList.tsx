// src/pages/PhotoList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader, AlertTriangle, Phone, MapPin, Clock, Users } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navigation from "./Navigation";
import { API_URL, API_USERS } from "../config/apiurl";

interface User {
  id: number;
  nik: string;
  name: string;
  department: string;
  shift: string;
  photo: string;
  phone: string;
}

export default function PhotoList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_USERS);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError("Gagal memuat data pengguna");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fungsi untuk handle klik WhatsApp
  const openWhatsApp = (phone: string) => {
    // Pastikan format sudah 628xx, tanpa spasi, tanpa plus
    if (!phone.startsWith("628") || phone.length < 11) {
      alert("Nomor WhatsApp tidak valid.");
      return;
    }
    window.open(`https://wa.me/${phone}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center shadow-2xl border border-white/20">
          <Loader className="animate-spin text-white h-12 w-12 mx-auto mb-4" />
          <p className="text-white text-lg font-medium">Memuat data pengguna...</p>
          <div className="mt-4 w-32 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-rose-900 flex flex-col items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center shadow-2xl border border-white/20 max-w-md">
          <AlertTriangle className="text-red-400 h-16 w-16 mx-auto mb-4" />
          <p className="text-white font-medium text-lg mb-6">{error}</p>
          <button
            onClick={fetchUsers}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
      <div className="pt-16 min-h-screen bg-gradient-to-br from-violet-900 via-indigo-900 to-purple-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center mb-6 text-white/80 hover:text-white font-medium transition-all duration-300 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 hover:bg-white/20 group"
              >
                <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
                Kembali
              </Link>
              
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
                  Person in Charge
                </h1>
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-white/80">
                  <Users className="w-5 h-5" />
                  <span className="text-lg">Total: </span>
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold text-xl">
                    {users.length}
                  </span>
                  <span className="text-lg">PIC</span>
                </div>
              </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {users.map((user, index) => (
                <div
                  key={user.id}
                  className="group bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Photo Section */}
                  <div className="relative p-4 sm:p-6 pt-6">
                    <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
                      <img
                        src={`${API_URL}/${user.photo}`}
                        alt={user.name}
                        className="w-full h-full object-cover rounded-full border-4 border-white/20 group-hover:border-white/40 group-hover:scale-110 transition-all duration-500 shadow-2xl"
                        onError={(e) =>
                          (e.currentTarget.src = "https://via.placeholder.com/400")
                        }
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      
                      {/* WhatsApp Button Overlay */}
                      <button
                        className="absolute -bottom-2 -right-2 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 border-2 border-white"
                        onClick={() => openWhatsApp(user.phone)}
                        aria-label="Chat di WhatsApp"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-center">
                    <div className="mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                        {user.name}
                      </h3>
                      <p className="text-white/60 text-sm flex items-center justify-center">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        NIK: {user.nik}
                      </p>
                    </div>

                    {/* Department & Shift Tags */}
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                      <span className="text-xs font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full shadow-lg">
                        {user.department}
                      </span>
                      <span className="text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full shadow-lg flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Shift {user.shift}
                      </span>
                    </div>

                    {/* Contact Section */}
                    <div className="flex items-center justify-center pt-4 border-t border-white/20">
                      <button
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg text-sm flex items-center"
                        onClick={() => openWhatsApp(user.phone)}
                        aria-label="Chat di WhatsApp"
                      >
                        <FaWhatsapp className="w-5 h-5 mr-2" />
                        Chat
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {users.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 inline-block border border-white/20">
                  <Users className="w-16 h-16 text-white/60 mx-auto mb-4" />
                  <p className="text-white/80 text-lg">Tidak ada data PIC tersedia</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}