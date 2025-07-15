import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { getUserProfile } from "../../utils/user";

const UserNavbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (error) {
        console.error("Gagal mengambil profil:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center border-b border-emerald-100">
      {/* Logo */}
      <div className="text-2xl font-extrabold bg-gradient-to-r from-emerald-500 to-emerald-800 text-transparent bg-clip-text">
        SIP Taruna Bangsa
      </div>

      {/* Menu Navigasi */}
      <div className="space-x-2 hidden md:flex">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
              isActive
                ? "bg-emerald-100 text-emerald-700 font-semibold"
                : "text-gray-700 hover:text-emerald-700"
            }`
          }
        >
          Beranda
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
              isActive
                ? "bg-emerald-100 text-emerald-700 font-semibold"
                : "text-gray-700 hover:text-emerald-700"
            }`
          }
        >
          Cari Buku
        </NavLink>

        <NavLink
          to="/peminjaman"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
              isActive
                ? "bg-emerald-100 text-emerald-700 font-semibold"
                : "text-gray-700 hover:text-emerald-700"
            }`
          }
        >
          Riwayat Peminjaman
        </NavLink>
      </div>

      {/* Profil Pengguna */}
      {user ? (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">Pengguna</p>
          </div>
          <Link to="/profile">
            {user.image ? (
              <img
                src={user.image}
                alt="User Avatar"
                className="rounded-full w-10 h-10 object-cover border-2 border-emerald-600 shadow-md hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <FaUserCircle className="w-10 h-10 text-gray-400 hover:text-emerald-600 transition duration-300" />
            )}
          </Link>
        </div>
      ) : (
        <p className="text-gray-500">Memuat data...</p>
      )}
    </nav>
  );
};

export default UserNavbar;
