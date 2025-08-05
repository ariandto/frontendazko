// ManageUser.tsx
import { useEffect, useState } from "react";
import { API_USERS } from "../config/apiurl";
import EditUserForm from "./EditUserForm";

interface User {
  id: number;
  nik: string;
  name: string;
  department: string;
  shift: string;
  phone: string;
  photo: string;
}

export default function ManageUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_USERS);
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError("❌ Gagal memuat data user.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Apakah kamu yakin ingin menghapus user ini?");
    if (!confirm) return;

    try {
      const res = await fetch(`${API_USERS}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal hapus");

      setMessage("✅ User berhasil dihapus.");
      fetchUsers();
    } catch (err) {
      setMessage("❌ Gagal menghapus user.");
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Manajemen Data PIC</h1>

        {message && (
          <div className="mb-4 p-4 rounded-xl text-sm border bg-yellow-50 text-yellow-800">
            {message}
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-200 text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-2">Foto</th>
                  <th className="p-2">NIK</th>
                  <th className="p-2">Nama</th>
                  <th className="p-2">Divisi</th>
                  <th className="p-2">Shift</th>
                  <th className="p-2">WA</th>
                  <th className="p-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-2">
                      <img
                        src={user.photo.startsWith("/") ? user.photo : "/" + user.photo}
                        alt="Foto"
                        className="w-10 h-10 object-cover rounded-lg border"
                      />
                    </td>
                    <td className="p-2">{user.nik}</td>
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.department}</td>
                    <td className="p-2">{user.shift}</td>
                    <td className="p-2">
                      <a
                        href={`https://wa.me/${user.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 underline"
                      >
                        {user.phone}
                      </a>
                    </td>
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => setSelectedUserId(user.id)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal Edit */}
        {selectedUserId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-xl">
              <h2 className="text-lg font-bold mb-4">Edit User</h2>
              <EditUserForm
                userId={selectedUserId}
                onClose={() => setSelectedUserId(null)}
                onSuccess={fetchUsers}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
