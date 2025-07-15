import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, User, Clock } from "lucide-react";
import { getAllCategory } from "../../utils/category";
import Navbar from "../../components/userComponent/UserNavbar";
import Footer from "../../components/userComponent/UserFooter";
import bgImage from "../../assets/image/bg-perpus.jpg";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/search");
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getAllCategory({ page: 1, limit: 10 });
        const { data } = res;
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const limited = shuffled.slice(0, 8);
        setCategories(limited);
      } catch (error) {
        console.error("Gagal fetch kategori:", error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#e2dcdc] pt-16">
      <Navbar />

      <section
        className="relative bg-cover bg-center bg-no-repeat px-6 py-20 text-center flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay gelap dan blur */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm "></div>
        {/* Konten Hero */}
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold text-white mb-4">
            Selamat Datang di SIP Taruna Bangsa
          </h1>
          <p className="text-white max-w-xl text-lg">
            Sistem Informasi Perpustakaan ini membantu Anda untuk mencari informasi tentang perpustakaan,
            mencari buku, dan memantau status koleksi secara mudah dan cepat.
          </p>
          <div className="mt-8 space-x-4">
            <button
              onClick={handleSearchClick}
              className="px-20 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition"
            >
              Mulai Cari Buku
            </button>
          </div>
        </div>
      </section>

      {/* Informasi Perpustakaan */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-12 text-center text-emerald-900">
        <div className="bg-white shadow-md rounded-xl p-6">
          <BookOpen size={32} className="mx-auto text-emerald-800 mb-3" />
          <h2 className="text-2xl font-bold">1,000+</h2>
          <p>Total Buku</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <Clock size={32} className="mx-auto text-emerald-800 mb-3" />
          <h2 className="text-2xl font-bold">08:00 - 17:00</h2>
          <p>Jam Operasional</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <User size={32} className="mx-auto text-emerald-800 mb-3" />
          <h2 className="text-2xl font-bold">100+</h2>
          <p>Anggota</p>
        </div>
      </section>

      {/* Kategori Buku */}
      <section className="bg-white px-6 py-10">
        <h2 className="text-2xl font-bold text-center text-emerald-700 mb-6">Kategori Buku</h2>
        {categories.length === 0 ? (
          <p className="text-center text-gray-500">Sedang memuat kategori...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="bg-emerald-50 p-5 rounded-xl shadow hover:bg-emerald-100 transition text-center"
              >
{cat.image ? (
  <img
    src={cat.image}
    alt={cat.name}
    className="w-20 h-20 object-cover rounded-full mx-auto mb-3 border border-emerald-200"
  />
) : (
  <div className="w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-3 border border-emerald-200 bg-emerald-100">
    <BookOpen size={32} className="text-emerald-700" />
  </div>
)}
                <h3 className="text-xl font-semibold text-emerald-800">{cat.name}</h3>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Home;
