// import React, { useEffect, useState } from "react";
// import {
//     getAllBooks,
//     createBook,
//     updateBook,
//     deleteBook,
//     searchBook,
// } from "../../utils/book";
// import { confirmDelete, showDeleteSuccess } from "../../utils/confirmDelete";
// import AdminLayout from "../../components/adminComponent/AdminLayout";
// import Pagination from "../../components/adminComponent/Pagination";
// import SearchBar from "../../components/adminComponent/SearchBar";
// import Swal from "sweetalert2";

// const DataBuku = () => {
//     const [books, setBooks] = useState([]);
//     const [pagination, setPagination] = useState({
//         page: 1,
//         total_page: 1,
//         total_books: 0,
//     });
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [isSearching, setIsSearching] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [isEditMode, setIsEditMode] = useState(false);
//     const [editBookId, setEditBookId] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [cover, setCover] = useState(null);
//     const [selectedBook, setSelectedBook] = useState(null);
//     const [showDetailModal, setShowDetailModal] = useState(false);

//     const [formData, setFormData] = useState({
//         code: "",
//         title: "",
//         author: "",
//         publisher: "",
//         year: "",
//         location: "",
//         isbn: "",
//         status: "TERSEDIA",
//         stock: 1,
//         source: "PEMBELIAN",
//         description: "",
//     });

//     const itemsPerPage = 10;

//     const fetchBooks = async () => {
//         try {
//             const res = await getAllBooks({ page: currentPage, limit: itemsPerPage });
//             const { data, pagination } = res;
//             setBooks(data);
//             setPagination(pagination);
//         } catch (error) {
//             console.error("Gagal fetch buku:", error);
//         }
//     };

//     const fetchSearchResult = async () => {
//         if (!searchTerm.trim()) {
//             setIsSearching(false);
//             fetchBooks();
//             return;
//         }

//         try {
//             setIsSearching(true);
//             const res = await searchBook(searchTerm);
//             setBooks(res);
//             setPagination({ page: 1, total_page: 1, total_books: res.length });
//         } catch (error) {
//             console.error("Pencarian gagal:", error.message);
//             setBooks([]);
//             setPagination({ page: 1, total_page: 1, total_books: 0 });
//         }
//     };

//     const handleSubmitBook = async () => {
//         const { title, author } = formData;

//         if (!title || !author) {
//             Swal.fire({
//                 icon: "warning",
//                 title: "Data Belum Lengkap",
//                 text: "Judul dan penulis wajib diisi.",
//             });
//             return;
//         }

//         const formPayload = new FormData();
//         Object.entries(formData).forEach(([key, value]) => {
//             formPayload.append(key, value);
//         });
//         if (cover) {
//             formPayload.append("cover", cover);
//         }

//         setLoading(true);
//         try {
//             if (isEditMode) {
//                 await updateBook(editBookId, formPayload);
//                 Swal.fire({ icon: "success", title: "Berhasil", text: "Data buku berhasil diperbarui." });
//             } else {
//                 await createBook(formPayload);
//                 Swal.fire({ icon: "success", title: "Berhasil", text: "Buku baru berhasil ditambahkan." });
//             }
//             await fetchBooks();
//             setShowModal(false);
//             setFormData({
//                 code: "",
//                 title: "",
//                 author: "",
//                 publisher: "",
//                 year: "",
//                 location: "",
//                 isbn: "",
//                 status: "TERSEDIA",
//                 stock: 1,
//                 source: "PEMBELIAN",
//                 description: "",
//             });
//             setCover(null);
//             setIsEditMode(false);
//             setEditBookId(null);
//         } catch (error) {
//             console.error("Gagal menyimpan buku:", error);
//             Swal.fire({ icon: "error", title: "Terjadi Kesalahan", text: "Gagal menyimpan data buku." });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         const isConfirmed = await confirmDelete("Data buku akan dihapus permanen!");
//         if (!isConfirmed) return;
//         await deleteBook(id);
//         isSearching ? fetchSearchResult() : fetchBooks();
//         showDeleteSuccess();
//     };

//     useEffect(() => {
//         if (!isSearching) fetchBooks();
//     }, [currentPage]);

//     useEffect(() => {
//         const delayDebounce = setTimeout(() => fetchSearchResult(), 500);
//         return () => clearTimeout(delayDebounce);
//     }, [searchTerm]);

//     return (
//         <AdminLayout>
//             <h2 className="text-2xl font-semibold mb-4">Data Buku</h2>
//             <div className="flex items-center mb-4">
//                 <button
//                     className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded"
//                     onClick={() => {
//                         setShowModal(true);
//                         setIsEditMode(false);
//                         setCover(null);
//                         setFormData({
//                             code: "",
//                             title: "",
//                             author: "",
//                             publisher: "",
//                             year: "",
//                             location: "",
//                             isbn: "",
//                             status: "TERSEDIA",
//                             stock: 1,
//                             source: "PEMBELIAN",
//                             description: "",
//                             categoryId: "",
//                         });
//                     }}>
//                     + Tambah Buku
//                 </button>
//                 <div className="ml-auto mr-12">
//                     <SearchBar
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         placeholder="Cari buku..."
//                     />
//                 </div>
//             </div>

//             <div className="overflow-auto w-[1025px] pr-10">
//                 <table className="w-full text-sm bg-white shadow-md rounded-lg overflow-hidden">
//                     <thead className="bg-gray-200 text-gray-700 font-semibold text-left">
//                         <tr>
//                             <th className="px-4 py-3">No</th>
//                             <th className="px-4 py-3">Cover</th>
//                             <th className="px-4 py-3">Kode</th>
//                             <th className="px-4 py-3">Judul</th>
//                             <th className="px-4 py-3">Penulis</th>
//                             <th className="px-4 py-3">Penerbit</th>
//                             <th className="px-4 py-3">Tahun</th>
//                             <th className="px-4 py-3">Lokasi</th>
//                             <th className="px-4 py-3">Deskripsi</th>
//                             <th className="px-4 py-3">ISBN</th>
//                             <th className="px-4 py-3">Stok</th>
//                             <th className="px-4 py-3">Status</th>
//                             <th className="px-4 py-3">Sumber</th>
//                             <th className="px-4 py-3 text-center">Aksi</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {books.map((book, index) => (
//                             <tr key={book.id} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
//                                 <td className="px-4 py-2">{(pagination.page - 1) * itemsPerPage + index + 1}</td>
//                                 <td className="px-4 py-2">
//                                     {book.cover ? (
//                                         <img src={book.cover} alt="Cover" className="w-12 h-16 object-cover" />
//                                     ) : (
//                                         "-"
//                                     )}
//                                 </td>
//                                 <td className="px-4 py-2">{book.code}</td>
//                                 <td className="px-4 py-2">{book.title}</td>
//                                 <td className="px-4 py-2">{book.author}</td>
//                                 <td className="px-4 py-2">{book.publisher || "-"}</td>
//                                 <td className="px-4 py-2">{book.year || "-"}</td>
//                                 <td className="px-4 py-2">{book.location || "-"}</td>
//                                 <td className="px-4 py-2">{book.description || "-"}</td>
//                                 <td className="px-4 py-2">{book.isbn || "-"}</td>
//                                 <td className="px-4 py-2">{book.stock}</td>
//                                 <td className="px-4 py-2">{book.status}</td>
//                                 <td className="px-4 py-2">{book.source}</td>
//                                 <td className="px-4 py-2 text-center">
//                                     <button
//                                         className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
//                                         onClick={() => {
//                                             setSelectedBook(book);
//                                             setShowDetailModal(true);
//                                         }}
//                                     >
//                                         Lihat
//                                     </button>
//                                     <button
//                                         className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
//                                         onClick={() => {
//                                             setShowModal(true);
//                                             setIsEditMode(true);
//                                             setEditBookId(book.id);
//                                             setFormData({ ...book });
//                                         }}>
//                                         Edit
//                                     </button>
//                                     <button
//                                         className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                                         onClick={() => handleDelete(book.id)}>
//                                         Hapus
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                         {books.length === 0 && (
//                             <tr>
//                                 <td colSpan="14" className="text-center py-4 text-gray-500">
//                                     Tidak ada buku ditemukan.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="w-[1025px] pr-10 mt-1 flex items-center justify-between">
//                 <p className="text-sm text-gray-500 m-0">
//                     Showing {(pagination.page - 1) * itemsPerPage + 1} to {(pagination.page - 1) * itemsPerPage + books.length} of {pagination.total_books} entries
//                 </p>
//                 <div className="flex items-center">
//                     {!isSearching && (
//                         <Pagination
//                             currentPage={pagination.page}
//                             totalPages={pagination.total_page}
//                             onPageChange={setCurrentPage}
//                         />
//                     )}
//                 </div>
//             </div>

//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded-lg w-[700px] shadow-lg">
//                         <h3 className="text-xl font-semibold mb-4">
//                             {isEditMode ? "Edit Buku" : "Tambah Buku"}
//                         </h3>

//                         <div className="grid grid-cols-2 gap-4">
//                             {["code", "title", "author", "publisher", "year", "location", "isbn", "stock"].map((field) => (
//                                 <input
//                                     key={field}
//                                     type={field === "year" || field === "stock" ? "number" : "text"}
//                                     value={formData[field] || ""}
//                                     onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
//                                     placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                                     className="w-full border border-gray-300 rounded px-3 py-2"
//                                 />
//                             ))}

//                             <div className="col-span-2">
//                                 <textarea
//                                     value={formData.description}
//                                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                                     placeholder="Deskripsi"
//                                     className="w-full border border-gray-300 rounded px-3 py-2"
//                                 />
//                             </div>

//                             <div className="col-span-2">
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={(e) => setCover(e.target.files[0])}
//                                     className="w-full border border-gray-300 rounded px-3 py-2"
//                                 />
//                                 {isEditMode && formData.cover && (
//                                     <img
//                                         src={formData.cover}
//                                         alt="Cover buku"
//                                         className="w-24 h-32 object-cover mt-2 rounded"
//                                     />
//                                 )}
//                             </div>

//                             <select
//                                 value={formData.status}
//                                 onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                                 className="w-full border border-gray-300 rounded px-3 py-2"
//                             >
//                                 <option value="TERSEDIA">Tersedia</option>
//                                 <option value="DIPINJAM">Dipinjam</option>
//                             </select>

//                             <select
//                                 value={formData.source}
//                                 onChange={(e) => setFormData({ ...formData, source: e.target.value })}
//                                 className="w-full border border-gray-300 rounded px-3 py-2"
//                             >
//                                 <option value="PEMBELIAN">Pembelian</option>
//                                 <option value="SUMBANGAN">Sumbangan</option>
//                             </select>
//                         </div>

//                         <div className="flex justify-end gap-2 mt-6">
//                             <button
//                                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
//                                 onClick={() => {
//                                     setShowModal(false);
//                                     setIsEditMode(false);
//                                     setCover(null);
//                                     setFormData({
//                                         code: "",
//                                         title: "",
//                                         author: "",
//                                         publisher: "",
//                                         year: "",
//                                         location: "",
//                                         isbn: "",
//                                         status: "TERSEDIA",
//                                         stock: 1,
//                                         source: "PEMBELIAN",
//                                         description: "",
//                                     });
//                                 }}
//                             >
//                                 Batal
//                             </button>
//                             <button
//                                 className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
//                                 onClick={handleSubmitBook}
//                                 disabled={loading}
//                             >
//                                 {loading ? "Menyimpan..." : isEditMode ? "Update" : "Simpan"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {showDetailModal && selectedBook && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto shadow-lg">
//       <h3 className="text-xl font-semibold mb-4">Detail Buku</h3>
//       <div className="space-y-2 text-sm">
//         {selectedBook.cover && (
//           <img
//             src={selectedBook.cover}
//             alt="Cover buku"
//             className="w-32 h-48 object-cover rounded mb-4 mx-auto"
//           />
//         )}
//         <p><strong>Kode:</strong> {selectedBook.code}</p>
//         <p><strong>Judul:</strong> {selectedBook.title}</p>
//         <p><strong>Penulis:</strong> {selectedBook.author}</p>
//         <p><strong>Penerbit:</strong> {selectedBook.publisher || "-"}</p>
//         <p><strong>Tahun:</strong> {selectedBook.year || "-"}</p>
//         <p><strong>Lokasi:</strong> {selectedBook.location || "-"}</p>
//         <p><strong>ISBN:</strong> {selectedBook.isbn || "-"}</p>
//         <p><strong>Stok:</strong> {selectedBook.stock}</p>
//         <p><strong>Status:</strong> {selectedBook.status}</p>
//         <p><strong>Sumber:</strong> {selectedBook.source}</p>
//         <p><strong>Deskripsi:</strong> {selectedBook.description || "-"}</p>
//       </div>

//       <div className="flex justify-end mt-6">
//         <button
//           className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
//           onClick={() => {
//             setShowDetailModal(false);
//             setSelectedBook(null);
//           }}
//         >
//           Tutup
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//         </AdminLayout>
//     );
// };

// export default DataBuku;

import React, { useEffect, useState } from "react";
import {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
    searchBook,
} from "../../utils/book";
import { getAllCategory } from "../../utils/category";
import { confirmDelete, showDeleteSuccess } from "../../utils/confirmDelete";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import AdminLayout from "../../components/adminComponent/AdminLayout";
import Pagination from "../../components/adminComponent/Pagination";
import SearchBar from "../../components/adminComponent/SearchBar";
import Swal from "sweetalert2";

const DataBuku = () => {
    const [books, setBooks] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        total_page: 1,
        total_books: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editBookId, setEditBookId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cover, setCover] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        code: "",
        title: "",
        author: "",
        publisher: "",
        year: "",
        location: "",
        isbn: "",
        status: "TERSEDIA",
        stock: 1,
        source: "PEMBELIAN",
        description: "",
        categoryNames: [],
    });

    const itemsPerPage = 10;

    const fetchBooks = async () => {
        try {
            const res = await getAllBooks({ page: currentPage, limit: itemsPerPage });
            const { data, pagination } = res;
            setBooks(data);
            setPagination(pagination);
        } catch (error) {
            console.error("Gagal fetch buku:", error);
        }
    };

    const fetchSearchResult = async () => {
        if (!searchTerm.trim()) {
            setIsSearching(false);
            fetchBooks();
            return;
        }

        try {
            setIsSearching(true);
            const res = await searchBook(searchTerm);
            setBooks(res);
            setPagination({ page: 1, total_page: 1, total_books: res.length });
        } catch (error) {
            console.error("Pencarian gagal:", error.message);
            setBooks([]);
            setPagination({ page: 1, total_page: 1, total_books: 0 });
        }
    };

    // Fungsi untuk memuat kategori
    const fetchCategories = async () => {
        try {
            const res = await getAllCategory({ page: 1, limit: 10 });
            console.log("✅ Kategori berhasil dimuat:", res);

            // Ambil hanya bagian array datanya
            if (Array.isArray(res.data)) {
                setCategories(res.data);
            } else {
                console.error("❌ Struktur data tidak sesuai, 'data' bukan array:", res.data);
                setCategories([]);
            }
        } catch (error) {
            console.error("❌ Gagal memuat kategori:", error);
            setCategories([]);
        }
    };

    const handleSubmitBook = async () => {
        const { title, author } = formData;

        if (!title || !author) {
            Swal.fire({
                icon: "warning",
                title: "Data Belum Lengkap",
                text: "Judul dan penulis wajib diisi.",
            });
            return;
        }

        const formPayload = new FormData();

        // Object.entries(formData).forEach(([key, value]) => {
        //     if (key === "categoryNames" && Array.isArray(value)) {
        //         value.forEach((categoryName) => {
        //             if (typeof categoryName === "string") {
        //                 formPayload.append("categories", categoryName);
        //             }
        //         });
        //     }
        // })

        const allowedFields = [
            "code", "title", "author", "publisher", "year", "location",
            "isbn", "status", "stock", "source", "description"
        ];

        allowedFields.forEach((key) => {
            formPayload.append(key, formData[key]);
        });

        if (Array.isArray(formData.categoryNames)) {
            formData.categoryNames.forEach((cat) => {
                if (typeof cat === "string") {
                    formPayload.append("categories", cat);
                }
            });
        }

        if (cover) {
            formPayload.append("cover", cover);
        }

        setLoading(true);
        for (var pair of formPayload.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        try {
            if (isEditMode) {
                await updateBook(editBookId, formPayload);
                Swal.fire({ icon: "success", title: "Berhasil", text: "Data buku berhasil diperbarui." });
            } else {
                await createBook(formPayload);
                Swal.fire({ icon: "success", title: "Berhasil", text: "Buku baru berhasil ditambahkan." });
            }
            await fetchBooks();
            closeModal();
        } catch (error) {
            console.error("❌ Gagal menyimpan buku:", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                stack: error.stack,
            });
            Swal.fire({ icon: "error", title: "Terjadi Kesalahan", text: "Gagal menyimpan data buku." });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = await confirmDelete("Data buku akan dihapus permanen!");
        if (!isConfirmed) return;
        await deleteBook(id);
        isSearching ? fetchSearchResult() : fetchBooks();
        showDeleteSuccess();
    };

    // Fungsi untuk reset dan tutup modal
    const closeModal = () => {
        setShowModal(false);
        setIsEditMode(false);
        setEditBookId(null);
        setCover(null);
        setFormData({
            code: "",
            title: "",
            author: "",
            publisher: "",
            year: "",
            location: "",
            isbn: "",
            status: "TERSEDIA",
            stock: 1,
            source: "PEMBELIAN",
            description: "",
            categoryNames: [],
        });
    };

    // Fungsi untuk membuka modal tambah buku
    const openAddModal = () => {
        setShowModal(true);
        setIsEditMode(false);
        setCover(null);
        fetchCategories();
        setFormData({
            code: "",
            title: "",
            author: "",
            publisher: "",
            year: "",
            location: "",
            isbn: "",
            status: "TERSEDIA",
            stock: 1,
            source: "PEMBELIAN",
            description: "",
            categoryNames: [],
        });
    };

    // Fungsi untuk membuka modal edit buku
    const openEditModal = (book) => {
        setShowModal(true);
        setIsEditMode(true);
        setEditBookId(book.id);

        // Set form data dengan kategori yang sudah ada
        const bookCategories = book.categories ? book.categories.map(cat => cat.name) : [];

        setFormData({
            ...book,
            categoryNames: bookCategories,
        });
    };

    useEffect(() => {
        if (!isSearching) fetchBooks();
    }, [currentPage]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => fetchSearchResult(), 500);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    // Load kategori saat komponen mount dan saat modal dibuka
    useEffect(() => {
        fetchCategories();
    }, []);

    // Reload kategori setiap kali modal dibuka
    useEffect(() => {
        if (showModal) {
            console.log("🔄 Modal dibuka, reload kategori...");
            fetchCategories();
        }
    }, [showModal]);

    return (
        <AdminLayout>
            <h2 className="text-2xl font-semibold mb-4">Data Buku</h2>
            <div className="flex items-center mb-4">
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded"
                    onClick={openAddModal}
                >
                    <Plus size={18} />Tambah Buku
                </button>
                
                <div className="ml-auto mr-12">
                    <SearchBar
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cari buku..."
                    />
                </div>
            </div>

            <div className="overflow-auto w-[1025px] pr-10">
                <table className="w-full text-sm bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700 font-semibold text-left">
                        <tr>
                            <th className="px-4 py-3">No</th>
                            <th className="px-4 py-3">Cover</th>
                            <th className="px-4 py-3">Kode</th>
                            <th className="px-4 py-3">Judul</th>
                            <th className="px-4 py-3">Penulis</th>
                            <th className="px-4 py-3">Penerbit</th>
                            <th className="px-4 py-3">Tahun</th>
                            <th className="px-4 py-3">Lokasi</th>
                            <th className="px-4 py-3">Deskripsi</th>
                            <th className="px-4 py-3">ISBN</th>
                            <th className="px-4 py-3">Stok</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Sumber</th>
                            <th className="px-4 py-3">Kategori</th>
                            <th className="px-4 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book.id} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                <td className="px-4 py-2">{(pagination.page - 1) * itemsPerPage + index + 1}</td>
                                <td className="px-4 py-2">
                                    {book.cover ? (
                                        <img src={book.cover} alt="Cover" className="w-12 h-16 object-cover" />
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td className="px-4 py-2">{book.code}</td>
                                <td className="px-4 py-2">{book.title}</td>
                                <td className="px-4 py-2">{book.author}</td>
                                <td className="px-4 py-2">{book.publisher || "-"}</td>
                                <td className="px-4 py-2">{book.year || "-"}</td>
                                <td className="px-4 py-2">{book.location || "-"}</td>
                                <td className="px-4 py-2">{book.description || "-"}</td>
                                <td className="px-4 py-2">{book.isbn || "-"}</td>
                                <td className="px-4 py-2">{book.stock}</td>
                                <td className="px-4 py-2">{book.status}</td>
                                <td className="px-4 py-2">{book.source}</td>
                                <td className="px-4 py-2">
                                    {book.categories?.map((cat) => cat.name).join(", ") || "-"}
                                </td>
                                                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-blue-600 text-white p-2 rounded mr-1 hover:bg-blue-700"
                    onClick={() => {
                      setSelectedBook(book);
                      setShowDetailModal(true);
                    }}
                    title="Lihat Detail"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="bg-yellow-500 text-white p-2 rounded mr-1 hover:bg-yellow-600"
                    onClick={() => openEditModal(book)}
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                    onClick={() => handleDelete(book.id)}
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
                        ))}
                        {books.length === 0 && (
                            <tr>
                                <td colSpan="14" className="text-center py-4 text-gray-500">
                                    Tidak ada buku ditemukan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="w-[1025px] pr-10 mt-1 flex items-center justify-between">
                <p className="text-sm text-gray-500 m-0">
                    Showing {(pagination.page - 1) * itemsPerPage + 1} to {(pagination.page - 1) * itemsPerPage + books.length} of {pagination.total_books} entries
                </p>
                <div className="flex items-center">
                    {!isSearching && (
                        <Pagination
                            currentPage={pagination.page}
                            totalPages={pagination.total_page}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[700px] shadow-lg max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-semibold mb-4">
                            {isEditMode ? "Edit Buku" : "Tambah Buku"}
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            {["code", "title", "author", "publisher", "year", "location", "isbn", "stock"].map((field) => (
                                <input
                                    key={field}
                                    type={field === "year" || field === "stock" ? "number" : "text"}
                                    value={formData[field] || ""}
                                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            ))}

                            <div className="col-span-2">
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Deskripsi"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>

                            <div className="col-span-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setCover(e.target.files[0])}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                                {isEditMode && formData.cover && (
                                    <img
                                        src={formData.cover}
                                        alt="Cover buku"
                                        className="w-24 h-32 object-cover mt-2 rounded"
                                    />
                                )}
                            </div>

                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="TERSEDIA">Tersedia</option>
                                <option value="DIPINJAM">Dipinjam</option>
                            </select>

                            <select
                                value={formData.source}
                                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="PEMBELIAN">Pembelian</option>
                                <option value="SUMBANGAN">Sumbangan</option>
                            </select>

                            <div className="col-span-2">
                                <label className="block font-medium text-sm mb-2">
                                    Kategori (bisa pilih lebih dari 1, tahan Ctrl)
                                </label>

                                {/* Debug info */}
                                <div className="text-xs text-gray-500 mb-1">
                                    {categories.length} kategori dimuat
                                </div>

                                {categories.length > 0 ? (
                                    <select
                                        multiple
                                        value={formData.categoryNames || []}
                                        onChange={(e) => {
                                            const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
                                            console.log("📝 Kategori dipilih:", selected);
                                            setFormData({ ...formData, categoryNames: selected });
                                        }}
                                        className="w-full border border-gray-300 rounded px-3 py-2 min-h-[120px]"
                                        size="5"
                                    >
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.name}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <div className="w-full border border-gray-300 rounded px-3 py-2 text-gray-500 min-h-[120px] flex items-center justify-center">
                                        {categories.length === 0 ? "Tidak ada kategori tersedia" : "Memuat kategori..."}
                                        <button
                                            type="button"
                                            onClick={fetchCategories}
                                            className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded"
                                        >
                                            Reload
                                        </button>
                                    </div>
                                )}

                                {/* Preview kategori yang dipilih */}
                                {formData.categoryNames && formData.categoryNames.length > 0 && (
                                    <div className="mt-2">
                                        <span className="text-sm text-gray-600">Kategori dipilih: </span>
                                        <span className="text-sm font-medium">
                                            {formData.categoryNames.join(", ")}
                                        </span>
                                    </div>
                                )}

                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={closeModal}
                            >
                                Batal
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white hover:rounded disabled:opacity-50 hover:bg-blue-700"
                                onClick={handleSubmitBook}
                                disabled={loading}
                            >
                                {loading ? "Menyimpan..." : isEditMode ? "Update" : "Simpan"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDetailModal && selectedBook && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Detail Buku</h3>
                        <div className="space-y-2 text-sm">
                            {selectedBook.cover && (
                                <img
                                    src={selectedBook.cover}
                                    alt="Cover buku"
                                    className="w-32 h-48 object-cover rounded mb-4 mx-auto"
                                />
                            )}
                            <p><strong>Kode:</strong> {selectedBook.code}</p>
                            <p><strong>Judul:</strong> {selectedBook.title}</p>
                            <p><strong>Penulis:</strong> {selectedBook.author}</p>
                            <p><strong>Penerbit:</strong> {selectedBook.publisher || "-"}</p>
                            <p><strong>Tahun:</strong> {selectedBook.year || "-"}</p>
                            <p><strong>Lokasi:</strong> {selectedBook.location || "-"}</p>
                            <p><strong>ISBN:</strong> {selectedBook.isbn || "-"}</p>
                            <p><strong>Stok:</strong> {selectedBook.stock}</p>
                            <p><strong>Status:</strong> {selectedBook.status}</p>
                            <p><strong>Sumber:</strong> {selectedBook.source}</p>
                            <p><strong>Deskripsi:</strong> {selectedBook.description || "-"}</p>
                            <p><strong>Kategori:</strong> {selectedBook.categories?.map((cat) => cat.name).join(", ") || "-"}</p>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={() => {
                                    setShowDetailModal(false);
                                    setSelectedBook(null);
                                }}
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default DataBuku;