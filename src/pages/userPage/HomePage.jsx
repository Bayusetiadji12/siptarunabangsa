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

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 text-center flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[70vh]"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay gelap dan blur */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        
        {/* Konten Hero */}
        <div className="relative z-10 max-w-sm sm:max-w-lg md:max-w-2xl px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Selamat Datang di SIP Taruna Bangsa
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
            Sistem Informasi Perpustakaan ini membantu Anda untuk mencari informasi tentang perpustakaan,
            mencari buku, dan memantau status koleksi secara mudah dan cepat.
          </p>
          <div className="mt-6 sm:mt-8">
            <button
              onClick={handleSearchClick}
              className="px-8 sm:px-12 md:px-20 py-2.5 sm:py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition text-sm sm:text-base font-medium min-w-[200px] sm:min-w-[250px]"
            >
              Mulai Cari Buku
            </button>
          </div>
        </div>
      </section>

      {/* Informasi Perpustakaan */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 py-8 sm:py-12 text-center text-emerald-900">
        <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow">
          <BookOpen size={28} className="sm:w-8 sm:h-8 mx-auto text-emerald-800 mb-2 sm:mb-3" />
          <h2 className="text-xl sm:text-2xl font-bold">1,000+</h2>
          <p className="text-sm sm:text-base text-gray-600">Total Buku</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow">
          <Clock size={28} className="sm:w-8 sm:h-8 mx-auto text-emerald-800 mb-2 sm:mb-3" />
          <h2 className="text-xl sm:text-2xl font-bold">08:00 - 17:00</h2>
          <p className="text-sm sm:text-base text-gray-600">Jam Operasional</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
          <User size={28} className="sm:w-8 sm:h-8 mx-auto text-emerald-800 mb-2 sm:mb-3" />
          <h2 className="text-xl sm:text-2xl font-bold">100+</h2>
          <p className="text-sm sm:text-base text-gray-600">Anggota</p>
        </div>
      </section>

      {/* Kategori Buku */}
      <section className="bg-white px-4 sm:px-6 md:px-8 py-8 sm:py-10">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-emerald-700 mb-4 sm:mb-6">
          Kategori Buku
        </h2>
        {categories.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
              <span className="text-sm sm:text-base">Sedang memuat kategori...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="bg-emerald-50 p-3 sm:p-4 md:p-5 rounded-xl shadow hover:bg-emerald-100 hover:shadow-md transition-all text-center cursor-pointer transform hover:scale-105"
              >
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full mx-auto mb-2 sm:mb-3 border border-emerald-200"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full mx-auto mb-2 sm:mb-3 border border-emerald-200 bg-emerald-100">
                    <BookOpen size={24} className="sm:w-8 sm:h-8 text-emerald-700" />
                  </div>
                )}
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-emerald-800 leading-tight line-clamp-2">
                  {cat.name}
                </h3>
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
