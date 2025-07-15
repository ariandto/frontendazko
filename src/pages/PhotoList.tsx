// src/pages/PhotoList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader, AlertTriangle } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-br from-red-100 via-red-50 to-rose-100 flex flex-col items-center justify-center">
        <Loader className="animate-spin text-red-500 h-10 w-10" />
        <p className="mt-4 text-gray-600">Memuat data pengguna...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 via-red-50 to-rose-100 flex flex-col items-center justify-center">
        <AlertTriangle className="text-red-500 h-10 w-10 mb-4" />
        <p className="text-red-700 font-medium">{error}</p>
        <button
          onClick={fetchUsers}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-red-100 via-red-50 to-rose-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center mb-6 text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            <ArrowLeft className="mr-2" /> Kembali
          </Link>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              Daftar PIC
            </h1>
            <p className="mt-4 text-gray-600">
              Total: <span className="font-semibold text-red-600">{users.length}</span> PIC
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col"
              >
                <img
                  src={`${API_URL}/${user.photo}`}
                  alt={user.name}
                  className="w-full h-64 object-cover"
                  onError={(e) =>
                    (e.currentTarget.src = "https://via.placeholder.com/400")
                  }
                />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                  <p className="text-gray-500 text-sm">NIK: {user.nik}</p>
                  <div className="mt-4">
                    <span className="text-xs font-medium bg-red-100 text-red-700 px-3 py-1 rounded-full">
                      {user.department}
                    </span>
                    <span className="ml-2 text-xs font-medium bg-rose-100 text-rose-700 px-3 py-1 rounded-full">
                      Shift {user.shift}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-600">WhatsApp:</span>
                    <button
                      className="text-green-600 hover:text-green-700 transition-colors"
                      onClick={() => openWhatsApp(user.phone)}
                      aria-label="Chat di WhatsApp"
                    >
                      <FaWhatsapp className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
