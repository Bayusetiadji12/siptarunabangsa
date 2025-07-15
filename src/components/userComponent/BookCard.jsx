import React from "react";
import { useNavigate } from "react-router-dom";
import CoverDefault from "../../assets/image/buku.png";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const statusRaw = (book.status || "").toString().toLowerCase();

  const isAvailable =
    statusRaw === "tersedia" ||
    statusRaw === "available" ||
    statusRaw === "1" ||
    statusRaw === "true";

  const statusLabel = isAvailable ? "Tersedia" : "Dipinjam";
  const statusColor = isAvailable
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between overflow-hidden">
      {/* Gambar */}
      <div className="h-44 bg-gray-100 flex items-center justify-center">
        <img
          src={book.cover || CoverDefault}
          alt={book.title}
          className="h-full object-contain p-3"
        />
      </div>

      {/* Info */}
      <div className="px-4 py-3 text-center flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-md font-semibold text-emerald-800 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-sm text-gray-700 mt-1 line-clamp-1">
            {book.author || "Tanpa Penulis"}
          </p>
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">
            {book.publisher || "Tanpa Penerbit"}
          </p>
          <p className="text-xs text-gray-400">
            {book.year || "Tahun tidak tersedia"}
          </p>

          {/* Kategori */}
          {book.categories?.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              {book.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Status */}
        <span
          className={`inline-block mt-3 px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}
        >
          {statusLabel}
        </span>
      </div>

      {/* Tombol Detail */}
      <div className="px-4 pb-4">
        <button
          onClick={() => navigate(`/books/${book.id}`)}
          className="w-full bg-emerald-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-emerald-700 transition duration-200"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default BookCard;
