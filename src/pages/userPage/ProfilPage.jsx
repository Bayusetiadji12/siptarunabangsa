import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../utils/user";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    nis: "",
    phone: "",
    gender: "MALE",
    address: "",
    image: ""
  });
  const [editingImage, setEditingImage] = useState(false); // toggle ubah foto

  const fetchProfile = async () => {
    try {
      const res = await getUserProfile();
      setUser(res);
      setForm(res);
    } catch (err) {
      console.error("Gagal mengambil profil", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/users/me", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Profil berhasil diperbarui");
      fetchProfile();
      setEditingImage(false); // sembunyikan input URL jika sedang edit image
    } catch (err) {
      console.error("Gagal memperbarui profil", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <p className="text-center mt-10 text-gray-500">Memuat profil...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-10 bg-white rounded-2xl shadow-xl">
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={form.image || "/default-avatar.png"}
            alt="Foto Profil"
            className="w-32 h-32 rounded-full object-cover border-4 border-emerald-500 shadow-md"
          />
          <button
            onClick={() => setEditingImage(!editingImage)}
            type="button"
            className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full border shadow hover:bg-gray-100 transition"
            title="Ubah Foto"
          >
            ✏️
          </button>
        </div>

        {editingImage && (
          <div className="mt-3 w-full max-w-sm">
            <label className="block text-sm text-gray-700 mb-1">URL Gambar Baru</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/foto.jpg"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        )}
      </div>

      <h1 className="text-3xl font-bold text-center text-emerald-700 mb-6">Profil Pengguna</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-1">Nama</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama lengkap"
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">NIS</label>
          <input
            type="text"
            name="nis"
            value={form.nis}
            onChange={handleChange}
            placeholder="Nomor Induk Siswa"
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Nomor Telepon</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="08xxxxxxxxxx"
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Jenis Kelamin</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="MALE">Laki-laki</option>
            <option value="FEMALE">Perempuan</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Alamat</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Alamat lengkap"
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-full transition duration-200 shadow-lg"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
