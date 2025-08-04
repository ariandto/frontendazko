import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState<User>({
    id: 0,
    nik: "",
    name: "",
    department: "",
    shift: "",
    phone: "",
    photo: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_USERS}/${id}`);
        if (!res.ok) throw new Error("Gagal memuat data");
        const data = await res.json();
        setForm(data);
      } catch (err) {
        setMessage("❌ Gagal memuat data user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const openWhatsApp = () => {
    if (form.phone.startsWith("628")) {
      window.open(`https://wa.me/${form.phone}`, "_blank");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      const res = await fetch(`${API_USERS}/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal update");
      navigate("/listpic");
    } catch (err) {
      setMessage("❌ Gagal memperbarui data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="text-center py-10">🔄 Memuat data...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-red-500 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-0">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Edit Data PIC
            </h2>
            <p className="text-gray-600">Ubah data dan foto profil PIC</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NIK */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">NIK</label>
              <input
                name="nik"
                value={form.nik}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Nama */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Divisi</label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih Divisi / Jabatan </option>
                <option value="Transport Planning">Transport Planning</option>
                <option value="Planner DC">Planner DC</option>
                <option value="Duty DC">Duty DC</option>
              </select>
            </div>

            {/* Shift */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Shift</label>
              <select
                name="shift"
                value={form.shift}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
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
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
              <div className="relative">
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
                />
                {form.phone.startsWith("628") && (
                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382..." />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500">Harus diawali 628 (tanpa +)</p>
            </div>

            {/* Foto saat ini */}
            {form.photo && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Foto saat ini:</p>
                <img
                  src={`/${form.photo}`}
                  alt="Current"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}

            {/* Ganti Foto */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Ganti Foto (opsional)
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept="image/*"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {file && (
                <p className="text-sm text-green-600 mt-1">
                  <strong>✔</strong> {file.name}
                </p>
              )}
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:from-indigo-600 hover:to-blue-700 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
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
        </div>
      </div>
    </div>
  );
}
