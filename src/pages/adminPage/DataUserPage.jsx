import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  registerUser,
  updateUser,
  deleteUser,
  searchUser,
} from "../../utils/user";
import { confirmDelete, showDeleteSuccess } from "../../utils/confirmDelete";
import { Pencil, Trash2, Plus } from "lucide-react";
import AdminLayout from "../../components/adminComponent/AdminLayout";
import Pagination from "../../components/adminComponent/Pagination";
import SearchBar from "../../components/adminComponent/SearchBar";
import Swal from "sweetalert2";

const DataUser = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    total_page: 1,
    total_users: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    nis: "",
    phone: "",
    gender: "",
    address: "",
  });

  const itemsPerPage = 10;

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers({ page: currentPage, limit: itemsPerPage });
      const { data, pagination } = res;
      setUsers(data);
      setPagination(pagination);
    } catch (error) {
      console.error("Gagal fetch user:", error);
    }
  };

  const fetchSearchResult = async () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      fetchUsers();
      return;
    }

    try {
      setIsSearching(true);
      const res = await searchUser(searchTerm);
      setUsers(res);
      setPagination({ page: 1, total_page: 1, total_users: res.length });
    } catch (error) {
      console.error("Pencarian gagal:", error.message);
      setUsers([]);
      setPagination({ page: 1, total_page: 1, total_users: 0 });
    }
  };

  const handleSubmitUser = async () => {
    const { name, email, password, nis, phone, gender } = formData;

    // Validasi data wajib
    if (!name || !email || !nis || !phone || !gender) {
      Swal.fire({
        icon: "warning",
        title: "Data Belum Lengkap",
        text: "Mohon lengkapi semua data yang wajib diisi.",
      });
      return;
    }

    // Validasi format email harus @gmail.com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Email Tidak Valid",
        text: "Format email tidak valid",
      });
      return;
    }

    setLoading(true);
    try {
      if (isEditMode) {
        await updateUser(editUserId, formData);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data user berhasil diperbarui.",
        });
      } else {
        // Cek email sudah terdaftar
        const isEmailUsed = users.some((u) => u.email === email);
        if (isEmailUsed) {
          Swal.fire({
            icon: "error",
            title: "Email Sudah Terdaftar",
            text: "Silakan gunakan email lain yang belum terdaftar.",
          });
          setLoading(false);
          return;
        }

        await registerUser(formData);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "User baru berhasil ditambahkan.",
        });
      }

      await fetchUsers();
      setShowModal(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        nis: "",
        phone: "",
        gender: "",
        address: "",
      });
      setIsEditMode(false);
      setEditUserId(null);
    } catch (error) {
      console.error("Gagal menyimpan user:", error);
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Gagal menyimpan data user. Silakan coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    const isConfirmed = await confirmDelete("Data user akan dihapus permanen!");
    if (!isConfirmed) return;

    await deleteUser(id);

    if (isSearching) {
      fetchSearchResult();
    } else {
      fetchUsers();
    }

    showDeleteSuccess();
  };

  useEffect(() => {
    if (!isSearching) {
      fetchUsers();
    }
  }, [currentPage]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSearchResult();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-4">Data User</h2>

      <div className="flex items-center mb-4">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded"
          onClick={() => {
            setShowModal(true);
            setIsEditMode(false);
            setFormData({
              name: "",
              email: "",
              password: "",
              nis: "",
              phone: "",
              gender: "",
              address: "",
            });
          }}
        >
          <Plus size={18} /> Tambah Data
        </button>

        <div className="ml-auto mr-12">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari user..."
          />
        </div>
      </div>

      <div className="w-[1025px] pr-10 overflow-auto">
        <table className="w-full text-sm bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700 font-semibold text-left">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">NIS</th>
              <th className="px-4 py-3">No HP</th>
              <th className="px-4 py-3">Kelamin</th>
              <th className="px-4 py-3">Alamat</th>
              <th className="px-4 py-3">Member Sejak</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <td className="px-4 py-2">{(pagination.page - 1) * itemsPerPage + index + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.nis}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.gender}</td>
                <td className="px-4 py-2">{user.address || "-"}</td>
                <td className="px-4 py-2">{new Date(user.memberSince).toLocaleDateString("id-ID")}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-yellow-500 text-white p-2 rounded mr-2 hover:bg-yellow-600"
                    onClick={() => {
                      setShowModal(true);
                      setIsEditMode(true);
                      setEditUserId(user.id);
                      setFormData({
                        name: user.name,
                        email: user.email,
                        password: "",
                        nis: user.nis,
                        phone: user.phone,
                        gender: user.gender,
                        address: user.address,
                      });
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  Tidak ada user ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="w-[1025px] pr-10 mt-1 flex items-center justify-between">
        <p className="text-sm text-gray-500 m-0">
          Showing {(pagination.page - 1) * itemsPerPage + 1} to {(pagination.page - 1) * itemsPerPage + users.length} of {pagination.total_users} entries
        </p>
        <div className="flex items-center">
          {!isSearching && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.total_page}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              {isEditMode ? "Edit User" : "Tambah User"}
            </h3>

            {["name", "email", "password", "nis", "phone", "address"].map((field) => (
              <input
                key={field}
                type={
                  field === "email"
                    ? "email"
                    : field === "password"
                      ? "password"
                      : "text"
                }
                value={formData[field] || ""}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                placeholder={
                  field === "nis"
                    ? "NIS"
                    : field === "phone"
                      ? "No HP"
                      : field === "address"
                        ? "Alamat"
                        : field === "password"
                          ? "Password"
                          : field.charAt(0).toUpperCase() + field.slice(1)
                }
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              />
            ))}

            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="LAKI_LAKI">Laki-laki</option>
              <option value="PEREMPUAN">Perempuan</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded"
                onClick={() => {
                  setShowModal(false);
                  setIsEditMode(false);
                  setFormData({
                    name: "",
                    email: "",
                    password: "",
                    nis: "",
                    phone: "",
                    gender: "",
                    address: "",
                  });
                }}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded disabled:opacity-50"
                onClick={handleSubmitUser}
                disabled={loading}
              >
                {loading ? "Menyimpan..." : isEditMode ? "Update" : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default DataUser;