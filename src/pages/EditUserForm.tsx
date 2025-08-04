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
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Data PIC</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sama seperti UploadForm */}
            {/* Input NIK, Nama, Department, Shift, Phone, File Upload */}
            {/* ... (COPY dari UploadForm bagian input) */}
            {/* Ganti defaultValue -> value */}
            {/* Tampilkan gambar lama */}
            <div className="text-sm text-gray-500">
              <p>Foto sebelumnya:</p>
              {form.photo && (
                <img
                  src={`/${form.photo}`}
                  alt="Current"
                  className="mt-2 rounded-lg border w-32 h-32 object-cover"
                />
              )}
            </div>

            {/* Input foto baru (opsional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Ganti Foto (Opsional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </button>

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
