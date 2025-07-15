import { useState } from "react";
import { registerUser } from "../../utils/user";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/image/perpus.jpg";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  BadgeCheck,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    nis: "",
    phone: "",
    gender: "",
    address: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(user);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Pendaftaran berhasil. Silakan login.",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      console.log("RESPON ERROR:", error.response?.data);
      const errorMessage =
        error.response?.data?.errors?.message || "Gagal mendaftar";
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background image blur & dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75 blur-sm"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Form Card */}
      <div className="relative w-full max-w-lg bg-white/100 p-8 rounded-2xl shadow-2xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">
          Daftar Akun Baru
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input dengan ikon */}
          <InputField icon={<User size={18} />} placeholder="Nama Lengkap" name="name" required onChange={handleChange} />
          <InputField icon={<Mail size={18} />} placeholder="Email" name="email" type="email" required onChange={handleChange} />
          <InputField icon={<Lock size={18} />} placeholder="Password" name="password" type="password" required onChange={handleChange} />
          <InputField icon={<BadgeCheck size={18} />} placeholder="NIS" name="nis" required onChange={handleChange} />
          <InputField icon={<Phone size={18} />} placeholder="No. Telepon" name="phone" onChange={handleChange} />
          <InputField icon={<MapPin size={18} />} placeholder="Alamat" name="address" onChange={handleChange} />

          {/* Select gender */}
          <div className="flex items-center border border-emerald-400 rounded-lg px-3 py-2">
            <select
              name="gender"
              required
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none text-gray-700"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="LAKI_LAKI">Laki-laki</option>
              <option value="PEREMPUAN">Perempuan</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Daftar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700 font-medium">
          Sudah punya akun?{" "}
          <a href="/" className="text-emerald-700 hover:underline font-bold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

function InputField({ icon, name, placeholder, type = "text", onChange, required = false }) {
  return (
    <div className="flex items-center border border-emerald-400 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-300">
      <div className="text-emerald-500 mr-2">{icon}</div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
      />
    </div>
  );
}

export default Register;
