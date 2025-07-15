import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailBook } from "../../utils/book";
import BookDetail from "../../components/userComponent/BookDetail";
import Navbar from "../../components/userComponent/UserNavbar";
import Footer from "../../components/userComponent/UserFooter";

const DetailBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await getDetailBook(id);
      setBook(res);
    };
    fetchBook();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-[#e2dcdc]">
      {/* Navbar */}
      <Navbar />

      {/* Konten Detail Buku */}
      <main className="flex-grow px-6 py-10 mt-16">
        {book ? (
          <BookDetail book={book} />
        ) : (
          <p className="text-center text-gray-500">Memuat...</p>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DetailBookPage;
