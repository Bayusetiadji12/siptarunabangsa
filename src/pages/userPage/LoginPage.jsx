import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/user.js";
import { jwtDecode } from "jwt-decode";
import bgImage from "../../assets/image/perpus.jpg";
import logoImage from "../../assets/image/logo-tb.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, message } = await loginUser(email, password);
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      const isAdmin = decoded.is_admin;

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: message,
        timer: 2000,
        showConfirmButton: false,
      });

      if (isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors?.message || "Email atau Password Salah";
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black/50">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75 blur-sm"
        style={{ backgroundImage: `url(${bgImage})`, zIndex: -1 }}
      ></div>

      {/* Login Card */}
      <div className="w-full max-w-5xl bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-2xl flex overflow-hidden">
        {/* Kiri - Logo & Nama Sistem */}
        <div className="w-1/2 bg-emerald-800 text-white flex flex-col items-center justify-center p-8">
          <img
            src={logoImage}
            alt="Logo"
            className="w-32 h-36 object-contain mb-4"
          />
          <h2 className="text-2xl font-bold text-center leading-tight">
            Sistem Informasi <br /> Perpustakaan <br /> Taruna Bangsa
          </h2>
        </div>

        {/* Kanan - Form Login */}
        <div className="w-1/2 bg-white bg-opacity-90 p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Selamat Datang
          </h2>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Tombol */}
            <button
              type="submit"
              className="w-full bg-emerald-800 text-white py-3 rounded-md font-semibold hover:bg-emerald-700 transition duration-200"
            >
              Log In
            </button>

            {/* Daftar */}
            <p className="mt-6 text-sm text-center text-gray-600">
              Belum Punya Akun?{" "}
              <a
                href="/register"
                className="text-emerald-700 font-semibold hover:underline"
              >
                Daftar Sekarang
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
