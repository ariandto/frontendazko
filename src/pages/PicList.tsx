import { useEffect, useState } from "react";
import { Clock, Users, AlertTriangle, Loader, X, ChevronDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navigation from "../layouts/Navigation";
import { API_URL, API_USERS, API_VISIT } from "../config/apiurl";
import { Helmet } from "react-helmet";

interface User {
  id: number;
  name: string;
  department: string;
  shift: string;
  photo: string;
  phone: string;
}

export default function PicList() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const extractStartHour = (shiftString: string): number => {
    const match = shiftString.match(/(\d{2}):(\d{2})/);
    if (match) {
      return parseInt(match[1]) * 60 + parseInt(match[2]);
    }
    return 9999;
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_USERS);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data: User[] = await response.json();

      const sortedUsers = data.sort(
        (a, b) => extractStartHour(a.shift) - extractStartHour(b.shift)
      );

      setUsers(sortedUsers);
      setFilteredUsers(sortedUsers);
    } catch (err) {
      setError("Gagal memuat data pengguna");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const postVisit = async () => {
      try {
        await fetch(API_VISIT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
      } catch (err) {
        console.error("❌ Gagal kirim kunjungan:", err);
      }
    };

    postVisit();
  }, []);

  useEffect(() => {
    if (selectedDepartment === "All") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((u) => u.department === selectedDepartment));
    }
  }, [selectedDepartment, users]);

  const departments = [
    { value: "All", label: "Semua Divisi" },
    { value: "Transport Planning", label: "Transport Planning" },
    { value: "Planner DC", label: "Planner DC" },
  ];

  const handleDepartmentSelect = (value: string) => {
    setSelectedDepartment(value);
    setIsDropdownOpen(false);
  };

  const openImageModal = (user: User) => {
    console.log('Opening modal for user:', user.name); // Debug log
    setSelectedUser(user);
  };

  const closeImageModal = () => {
    console.log('Closing modal'); // Debug log
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 via-orange-600 to-red-600 p-4">
        <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-lg text-center border border-white/20 shadow-2xl">
          <Loader className="animate-spin text-white w-12 h-12 mx-auto mb-4" />
          <p className="text-white text-lg font-medium">Memuat data PIC...</p>
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
      <Helmet>
        <title>Daftar PIC - Azko</title>
        <meta name="description" content="Lihat daftar PIC berdasarkan divisi di Azko." />
      </Helmet>

      <Navigation />

      <div className="pt-16 min-h-screen bg-gradient-to-br from-red-400 via-red-600 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-10">
          {/* Filter Dropdown */}
          <div className="flex justify-center sm:justify-start mb-6">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-64 sm:w-80 px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 text-white shadow-xl hover:bg-white/25 transition-all duration-300 flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                  <span className="font-medium text-left">
                    {departments.find(d => d.value === selectedDepartment)?.label}
                  </span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20 overflow-hidden">
                    {departments.map((dept) => (
                      <button
                        key={dept.value}
                        onClick={() => handleDepartmentSelect(dept.value)}
                        className={`w-full px-6 py-4 text-left hover:bg-white/20 transition-all duration-200 flex items-center space-x-3 ${
                          selectedDepartment === dept.value
                            ? 'bg-white/15 text-white'
                            : 'text-white/90 hover:text-white'
                        }`}
                      >
                        <div 
                          className={`w-2 h-2 rounded-full ${
                            selectedDepartment === dept.value
                              ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                              : 'bg-white/40'
                          }`}
                        />
                        <span className="font-medium">{dept.label}</span>
                        {selectedDepartment === dept.value && (
                          <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} onImageClick={openImageModal} />
            ))}
          </div>

          {/* Total */}
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-white mt-6">
            <Users className="w-5 h-5" />
            <span className="text-sm">Total:</span>
            <span className="font-bold text-xl bg-gradient-to-r from-gray-200 to-gray-50 bg-clip-text text-transparent">
              {filteredUsers.length}
            </span>
            <span className="text-sm">PIC</span>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedUser && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-6">
              <img
                src={`${API_URL}/${selectedUser.photo}`}
                alt={selectedUser.name}
                className="w-full h-auto max-h-[70vh] object-contain rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/800x600?text=Image+Not+Found";
                }}
              />
              
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedUser.name}</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full shadow">
                    {selectedUser.department}
                  </span>
                  <span className="text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Shift {selectedUser.shift}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const UserCard = ({ user, onImageClick }: { user: User; onImageClick: (user: User) => void }) => {
  const openWhatsApp = (phone: string) => {
    if (!phone.startsWith("628") || phone.length < 11) {
      alert("Nomor WhatsApp tidak valid.");
      return;
    }
    window.open(`https://wa.me/${phone}`, "_blank");
  };

  return (
    <div className="group bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
      <div className="relative p-4 sm:p-6 pt-6">
        <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
          <div 
            className="relative w-full h-full cursor-pointer group/image"
            onClick={() => {
              console.log('Image clicked for user:', user.name); // Debug log
              onImageClick(user);
            }}
          >
            <img
              src={`${API_URL}/${user.photo}`}
              alt={user.name}
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/400";
              }}
              className="w-full h-full object-cover rounded-full border-4 border-white/20 group-hover:border-white/40 transition duration-300 shadow-2xl hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 rounded-full bg-white/0 group-hover/image:bg-white/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover/image:opacity-100">
              <span className="text-white text-xs font-medium bg-black/70 px-3 py-1 rounded-full">
                Klik untuk memperbesar
              </span>
            </div>
          </div>
          <button
            className="absolute -bottom-2 -right-2 text-white p-3 rounded-full border-2 border-white shadow-lg transition-all duration-300 bg-green-500 hover:bg-green-600 hover:scale-110 opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              openWhatsApp(user.phone);
            }}
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
            className="px-6 py-3 rounded-2xl text-sm flex items-center font-medium shadow-lg transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:scale-105"
            onClick={() => openWhatsApp(user.phone)}
          >
            <FaWhatsapp className="w-5 h-5 mr-2" />
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};