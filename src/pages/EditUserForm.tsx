import { useEffect, useState } from "react";
import { API_USERS } from "../config/apiurl";

interface Props {
  userId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditUserForm({ userId, onClose, onSuccess }: Props) {
  const [form, setForm] = useState({
    nik: "",
    name: "",
    department: "",
    shift: "",
    phone: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_USERS}/${userId}`);
        const data = await res.json();
        setForm({
          nik: data.nik,
          name: data.name,
          department: data.department,
          shift: data.shift,
          phone: data.phone,
        });
        setPreview(`/${data.photo}`);
      } catch {
        setError("❌ Gagal memuat data user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nik || !form.name || !form.phone) {
      setError("⚠️ Harap lengkapi semua data.");
      return;
    }

    if (!form.phone.startsWith("628") || form.phone.length < 11) {
      setError("⚠️ Nomor WhatsApp harus diawali 628 dan minimal 11 digit.");
      return;
    }

    setSubmitting(true);
    setError("");

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

      const res = await fetch(`${API_USERS}/${userId}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal update");

      onSuccess(); // Refresh list
      onClose(); // Tutup modal
    } catch (err) {
      setError("❌ Gagal memperbarui user.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Input fields */}
          <input
            name="nik"
            placeholder="NIK"
            value={form.nik}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="name"
            placeholder="Nama Lengkap"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih Divisi</option>
            <option value="Transport Planning">Transport Planning</option>
            <option value="Planner DC">Planner DC</option>
            <option value="Duty DC">Duty DC</option>
          </select>
          <select
            name="shift"
            value={form.shift}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih Shift</option>
            <option value="Pagi 07:00 - 14:40">Pagi (07:00 - 14:40)</option>
            <option value="Pagi 08:00 - 15:40">Pagi (08:00 - 15:40)</option>
            <option value="Pagi 08:50 - 16:10">Pagi (08:50 - 16:10)</option>
            <option value="Siang 15:20 - 23:00">Siang (15:20 - 23:00)</option>
            <option value="Siang 16:00 - 00:00">Siang (16:00 - 00:00)</option>
            <option value="Malam 00:00 - 07:00">Malam (00:00 - 07:00)</option>
          </select>
          <input
            name="phone"
            placeholder="628xxxxxxxxxx"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Upload foto */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setFile(file);
              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
            className="w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded border mt-2"
            />
          )}

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
