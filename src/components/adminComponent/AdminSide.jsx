import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaTags,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import { logoutUser } from "../../utils/user";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminSidebar = () => {
  const menuItems = [
    { label: "Dashboard", to: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { label: "Data Buku", to: "/admin/books", icon: <FaBook /> },
    { label: "Data Kategori", to: "/admin/categories", icon: <FaTags /> },
    { label: "Data Anggota", to: "/admin/members", icon: <FaUsers /> },
    { label: "Kelola Peminjaman", to: "/admin/borrows", icon: <FaClipboardList /> },
  ];

  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Yakin ingin logout?",
      text: "Anda akan keluar dari sistem.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      logoutUser(); // hapus token
      Swal.fire("Logout Berhasil", "Anda telah logout.", "success");
      navigate("/");
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-emerald-700 text-white p-5 flex flex-col fixed top-0 left-0 z-50">
      <h2 className="text-2xl font-bold mb-8">Sistem Informasi Perpustakaan Taruna Bangsa</h2>
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-emerald-800 transition-all ${isActive ? "bg-emerald-900 font-semibold" : ""
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-2 hover:bg-red-600 rounded transition-all"
        >
          <FaSignOutAlt />
          Keluar
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
