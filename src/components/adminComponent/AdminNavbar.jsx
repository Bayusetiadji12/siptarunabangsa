import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../utils/user";
import { FaUserCircle, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const [admin, setAdmin] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await getUserProfile();
        setAdmin(data);
      } catch (error) {
        console.error("Gagal mengambil profil:", error);
      }
    };

    fetchAdmin();
  }, []);

  // Update waktu setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="w-[1025px] flex justify-between items-center p-4 bg-white shadow">
      {/* Tanggal dan waktu */}
      <div className="flex items-center gap-3 text-gray-700">
        <FaClock className="text-emerald-600 w-5 h-5" />
        <div>
          <p className="text-sm font-medium leading-tight">{formattedTime}</p>
        </div>
      </div>

      {/* Profil Admin */}
      {admin ? (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold text-gray-800">{admin.name}</p>
            <p className="text-sm text-gray-500">
              {admin.is_admin ? "Admin" : "Petugas"}
            </p>
          </div>
          <Link to="/profile">
            {admin.image ? (
              <img
                src={admin.image}
                alt="User Avatar"
                className="rounded-full w-10 h-10 object-cover border-2 border-emerald-600 shadow-md hover:scale-105 transition-transform"
              />
            ) : (
              <FaUserCircle className="w-10 h-10 text-gray-400 hover:text-emerald-600 transition" />
            )}
          </Link>
        </div>
      ) : (
        <p className="text-gray-500">Memuat data...</p>
      )}
    </div>
  );
};

export default AdminNavbar;
