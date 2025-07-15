import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CoverDefault from "../../assets/image/buku.png";

const BookCard = ({ book }) => {
    const navigate = useNavigate();

    const statusLabel =
        book.status === "TERSEDIA" || book.status === "available" ? "Tersedia" : "Dipinjam";
    const statusColor =
        book.status === "TERSEDIA" || book.status === "available"
            ? "text-green-600 bg-green-100"
            : "text-red-600 bg-red-100";

    const sourceLabel = book.source === "PEMBELIAN" ? "Pembelian" : "Sumbangan";

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-4xl mx-auto">
            {/* Tombol Kembali */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-6 text-sm font-medium text-emerald-700 hover:text-white border border-emerald-700 hover:bg-emerald-700 px-4 py-2 rounded-full transition duration-200"
            >
                <ArrowLeft size={16} />
                Kembali
            </button>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Gambar */}
                <div className="w-full md:w-1/3 bg-gray-100 flex justify-center items-center p-4 rounded-lg">
                    <img
                        src={book.cover || CoverDefault}
                        alt={book.title}
                        className="max-h-72 w-full object-contain"
                    />
                </div>

                {/* Informasi */}
                <div className="w-full md:w-2/3 space-y-3">
                    <h1 className="text-2xl font-bold text-emerald-800">{book.title}</h1>
                    {/* Status */}
                    <div className="flex gap-2 items-center">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}>
                            {statusLabel}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600"><strong>Kode Buku:</strong> {book.code || "-"}</p>
                    <p className="text-sm text-gray-600"><strong>Penulis:</strong> {book.author || "-"}</p>
                    <p className="text-sm text-gray-600"><strong>Penerbit:</strong> {book.publisher || "-"}</p>
                    <p className="text-sm text-gray-600"><strong>Tahun Terbit:</strong> {book.year || "-"}</p>
                    <p className="text-sm text-gray-600"><strong>Lokasi Rak:</strong> {book.location || "-"}</p>
                    <p className="text-sm text-gray-600"><strong>ISBN:</strong> {book.isbn || "-"}</p>
                    <p className="text-sm text-gray-600"><strong>Jumlah Stok:</strong> {book.stock}</p>

                    {/* Kategori */}
                    {book.categories?.length > 0 && (
                        <div>
                            <strong className="text-sm text-gray-700">Kategori:</strong>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {book.categories.map((cat) => (
                                    <span
                                        key={cat.id}
                                        className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full"
                                    >
                                        {cat.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Deskripsi */}
                    {book.description && (
                        <div className="mt-2">
                            <strong className="text-sm text-gray-700">Deskripsi:</strong>
                            <p className="text-sm text-gray-600 whitespace-pre-line mt-1">
                                {book.description}
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default BookCard;
