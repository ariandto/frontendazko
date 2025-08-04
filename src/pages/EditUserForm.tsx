import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_USERS } from "../config/apiurl";

interface User {
  id: number;
  nik: string;
  name: string;
  department: string;
  shift: string;
  phone: string;
  photo: string;
}

export default function EditUserForm() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [form, setForm] = useState<User | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Ambil semua user saat pertama kali
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch(API_USERS);
        const data = await res.json();
        setUsers(data);
      } catch {
        setMessage("❌ Gagal memuat data user.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search) ||
      u.nik.toLowerCase().includes(search) ||
      u.shift.toLowerCase().includes(search)
  );

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setForm(user);
    setMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    if (
      !form.phone.startsWith("628") ||
      form.phone.length < 11 ||
      !/^\d+$/.test(form.phone)
    ) {
      setMessage("⚠️ Nomor WhatsApp harus diawali 628 dan hanya angka (min 11 digit).");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("nik", form.nik);
      formData.append("name", form.name);
      formData.append("department", form.department);
      formData.append("shift", form.shift);
      formData.append("phone", form.phone);
      if (file) {
        formData.append("photo", file);
      }

      const res = await fetch(`${API_USERS}/${form.id}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal update");
      navigate("/listpic");
    } catch {
      setMessage("❌ Gagal memperbarui data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="text-center py-10">🔄 Memuat data pengguna...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-red-500 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        {!form && (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Cari dan Pilih User</h2>
            <input
              type="text"
              placeholder="Cari berdasarkan nama, NIK, atau shift"
              value={search}
              onChange={handleSearch}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
            />

            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className="p-3 bg-gray-50 rounded-lg border hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleSelectUser(user)}
                >
                  <strong>{user.name}</strong> • {user.nik} • <em>{user.shift}</em>
                </li>
              ))}
              {filteredUsers.length === 0 && (
                <p className="text-sm text-gray-500 text-center">Tidak ada hasil.</p>
              )}
            </ul>
          </>
        )}

        {form && (
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Edit Data {form.name}</h2>

            {/* NIK */}
            <div>
              <label className="block text-sm font-medium text-gray-700">NIK</label>
              <input
                name="nik"
                value={form.nik}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Departemen */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Divisi</label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              >
                <option value="">Pilih Divisi</option>
                <option value="Transport Planning">Transport Planning</option>
                <option value="Planner DC">Planner DC</option>
                <option value="Duty DC">Duty DC</option>
              </select>
            </div>

            {/* Shift */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Shift</label>
              <select
                name="shift"
                value={form.shift}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              >
                <option value="">Pilih Shift</option>
                <option value="Pagi 07:00 - 14:40">Pagi (07:00 - 14:40)</option>
                <option value="Pagi 08:00 - 15:40">Pagi (08:00 - 15:40)</option>
                <option value="Pagi 08:50 - 16:10">Pagi (08:50 - 16:10)</option>
                <option value="Siang 15:20 - 23:00">Siang (15:20 - 23:00)</option>
                <option value="Siang 16:00 - 00:00">Siang (16:00 - 00:00)</option>
                <option value="Malam 00:00 - 07:00">Malam (00:00 - 07:00)</option>
              </select>
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nomor WhatsApp</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Foto Saat Ini */}
            {form.photo && (
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Foto saat ini:</p>
                <img
                  src={`/${form.photo}`}
                  alt="Current"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}

            {/* Ganti Foto */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Ganti Foto (opsional)</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept="image/*"
                className="w-full mt-1"
              />
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </button>

            {/* Pesan */}
            {message && (
              <div
                className={`p-4 rounded-xl text-center text-sm ${
                  message.includes("❌")
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                }`}
              >
                {message}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
