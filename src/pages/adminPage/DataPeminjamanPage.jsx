// import React, { useEffect, useState } from "react";
// import {
//     getAllBorrows,
//     createBorrow,
//     returnBorrow,
//     deleteBorrow,
//     searchBorrow,
// } from "../../utils/borrow";
// import { getAllBooks } from "../../utils/book";
// import { getAllUsers } from "../../utils/user";
// import { confirmDelete, showDeleteSuccess } from "../../utils/confirmDelete";
// import { Pencil, Trash2, Plus } from "lucide-react";
// import AdminLayout from "../../components/adminComponent/AdminLayout";
// import Pagination from "../../components/adminComponent/Pagination";
// import SearchBar from "../../components/adminComponent/SearchBar";
// import Swal from "sweetalert2";

// const KelolaPeminjaman = () => {
//     const [borrows, setBorrows] = useState([]);
//     const [pagination, setPagination] = useState({ page: 1, total_page: 1, total_borrows: 0 });
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [isSearching, setIsSearching] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [isEditMode, setIsEditMode] = useState(false);
//     const [editBorrowId, setEditBorrowId] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [users, setUsers] = useState([]);
//     const [books, setBooks] = useState([]);
//     const [bookStock, setBookStock] = useState("");

//     const [formData, setFormData] = useState({
//         user_id: "",
//         userName: "",
//         nis: "",
//         book_id: "",
//         borrowDate: "",
//         dueDate: "",
//          returnDate: "", 
//         status: "DIPINJAM",
//     });

//     const itemsPerPage = 10;

//     const fetchBorrows = async () => {
//         try {
//             const res = await getAllBorrows({ page: currentPage, limit: itemsPerPage });
//             setBorrows(res.data);
//             setPagination(res.pagination);
//         } catch (error) {
//             console.error("Gagal fetch data peminjaman:", error);
//         }
//     };

//     const fetchSearchResult = async () => {
//         if (!searchTerm.trim()) {
//             setIsSearching(false);
//             fetchBorrows();
//             return;
//         }

//         try {
//             setIsSearching(true);
//             const res = await searchBorrow(searchTerm);
//             setBorrows(res);
//             setPagination({ page: 1, total_page: 1, total_borrows: res.length });
//             setCurrentPage(1);
//         } catch (error) {
//             console.error("Pencarian gagal:", error);
//         }
//     };

//     const fetchUsers = async () => {
//         try {
//             const res = await getAllUsers({ page: 1, limit: 10 });
//             setUsers(res.data);
//         } catch (error) {
//             console.error("Gagal fetch pengguna:", error);
//             if (error.response) {
//                 console.error("Status:", error.response.status);
//                 console.error("Data:", error.response.data);
//                 console.error("Headers:", error.response.headers);
//             } else if (error.request) {
//                 console.error("Request:", error.request);
//             } else {
//                 console.error("Message:", error.message);
//             }
//             console.error("Stack Trace:", error.stack);
//         }
//     };

//     const fetchBooks = async () => {
//         try {
//             const res = await getAllBooks({ page: 1, limit: 10 });
//             setBooks(res.data);
//         } catch (error) {
//             console.error("Gagal fetch buku:", error);
//         }
//     };

//     // const handleSubmit = async () => {
//     //     const { user_id, book_id, dueDate, status } = formData;

//     //     if (!user_id || !book_id || !dueDate) {
//     //         Swal.fire({
//     //             icon: "warning",
//     //             title: "Data belum lengkap",
//     //             text: "Harap isi semua field",
//     //         });
//     //         return;
//     //     }

//     //     const payload = isEditMode
//     //         ? { user_id, book_id, dueDate, status } // untuk update, kirim status
//     //         : { user_id, book_id, dueDate };        // untuk create, jangan kirim status

//     //     console.log("Payload yang dikirim:", payload);

//     //     setLoading(true);
//     //     try {
//     //         if (isEditMode) {
//     //             await updateBorrow(editBorrowId, payload);
//     //             Swal.fire({
//     //                 icon: "success",
//     //                 title: "Berhasil",
//     //                 text: "Data peminjaman diperbarui.",
//     //             });
//     //         } else {
//     //             await createBorrow(payload);
//     //             Swal.fire({
//     //                 icon: "success",
//     //                 title: "Berhasil",
//     //                 text: "Data peminjaman ditambahkan.",
//     //             });
//     //         }
//     //         await fetchBorrows();
//     //         closeModal();
//     //     } catch (error) {
//     //         console.error("Gagal menyimpan data peminjaman:", error);

//     //         if (error.response) {
//     //             console.error("Response status:", error.response.status);
//     //             console.error("Response data:", error.response.data);
//     //             Swal.fire({
//     //                 icon: "error",
//     //                 title: "Gagal",
//     //                 html: error.response.data?.errors || "Terjadi kesalahan",
//     //             });
//     //         } else {
//     //             Swal.fire({
//     //                 icon: "error",
//     //                 title: "Gagal",
//     //                 text: "Terjadi kesalahan saat menyimpan.",
//     //             });
//     //         }
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

// const handleSubmit = async () => {
//     const { user_id, book_id, dueDate, status, returnDate } = formData;

//     if (!user_id || !book_id || !dueDate || (isEditMode && !returnDate)) {
//         Swal.fire({
//             icon: "warning",
//             title: "Data belum lengkap",
//             text: "Harap isi semua field",
//         });
//         return;
//     }

//     const payload = isEditMode
//         ? { returnDate } // untuk return
//         : { user_id, book_id, dueDate }; // untuk create

//     console.log("Payload yang dikirim:", payload);

//     setLoading(true);
//     try {
//         if (isEditMode) {
//             await returnBorrow(editBorrowId, payload); // <-- Panggil endpoint return
//             Swal.fire({
//                 icon: "success",
//                 title: "Berhasil",
//                 text: "Buku berhasil dikembalikan.",
//             });
//         } else {
//             await createBorrow(payload);
//             Swal.fire({
//                 icon: "success",
//                 title: "Berhasil",
//                 text: "Data peminjaman ditambahkan.",
//             });
//         }
//         await fetchBorrows();
//         closeModal();
//     } catch (error) {
//         console.error("Gagal menyimpan data peminjaman:", error);
//         if (error.response) {
//             console.error("Response status:", error.response.status);
//             console.error("Response data:", error.response.data);
//             Swal.fire({
//                 icon: "error",
//                 title: "Gagal",
//                 html: error.response.data?.errors || "Terjadi kesalahan",
//             });
//         } else {
//             Swal.fire({
//                 icon: "error",
//                 title: "Gagal",
//                 text: "Terjadi kesalahan saat menyimpan.",
//             });
//         }
//     } finally {
//         setLoading(false);
//     }
// };

//     const handleDelete = async (id) => {
//         const confirmed = await confirmDelete("Data peminjaman akan dihapus permanen!");
//         if (!confirmed) return;

//         try {
//             await deleteBorrow(id);
//             isSearching ? fetchSearchResult() : fetchBorrows();
//             showDeleteSuccess();
//         } catch (error) {
//             console.error("Gagal menghapus data:", error);
//             Swal.fire({ icon: "error", title: "Gagal", text: "Tidak dapat menghapus data peminjaman." });
//         }
//     };

//     const openAddModal = () => {
//         setShowModal(true);
//         setIsEditMode(false);
//         setFormData({
//             user_id: "",
//             userName: "",
//             nis: "",
//             book_id: "",
//             borrowDate: "",
//             dueDate: "",
//             status: "DIPINJAM",
//         });
//         fetchUsers();
//         fetchBooks();
//     };

//     const openEditModal = (borrow) => {
//         setShowModal(true);
//         setIsEditMode(true);
//         setEditBorrowId(borrow.id);
//         setFormData({
//             user_id: borrow.user.id,
//             userName: borrow.user.name,
//             nis: borrow.user.nis,
//             book_id: borrow.book.id,
//             borrowDate: borrow.borrowDate.split("T")[0],
//             dueDate: borrow.dueDate?.split("T")[0],
//             status: borrow.status,
//         });
//         fetchUsers();
//         fetchBooks();
//     };

//     const closeModal = () => {
//         setShowModal(false);
//         setIsEditMode(false);
//         setEditBorrowId(null);
//         setBookStock("");
//         setFormData({
//             user_id: "",
//             userName: "",
//             nis: "",
//             book_id: "",
//             borrowDate: "",
//             dueDate: "",
//             status: "DIPINJAM",
//         });
//     };

//     useEffect(() => {
//         if (!isSearching) fetchBorrows();
//     }, [currentPage]);

//     useEffect(() => {
//         const debounce = setTimeout(() => fetchSearchResult(), 500);
//         return () => clearTimeout(debounce);
//     }, [searchTerm]);

//     useEffect(() => {
//         fetchUsers();
//         fetchBooks();
//     }, []);

//     return (
//         <AdminLayout>
//             <h2 className="text-2xl font-semibold mb-4">Kelola Peminjaman</h2>
//             <div className="flex items-center mb-4">
//                 <button
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded"
//                     onClick={openAddModal}
//                 >
//                     <Plus size={18} /> Tambah Data
//                 </button>
//                 <div className="ml-auto mr-12">
//                     <SearchBar
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         placeholder="Cari peminjam..."
//                     />
//                 </div>
//             </div>

//             <div className="overflow-auto w-full">
//                 <table className="w-full text-sm bg-white shadow-md rounded-lg overflow-hidden">
//                     <thead className="bg-gray-200 text-gray-700 font-semibold text-left">
//                         <tr>
//                             <th className="px-4 py-3">No</th>
//                             <th className="px-4 py-3">Peminjam</th>
//                             <th className="px-4 py-3">NIS</th>
//                             <th className="px-4 py-3">Kode Buku</th>
//                             <th className="px-4 py-3">Judul Buku</th>
//                             <th className="px-4 py-3">Tgl Pinjam</th>
//                             <th className="px-4 py-3">Tgl Jatuh Tempo</th>
//                             <th className="px-4 py-3">Status</th>
//                             <th className="px-4 py-3 text-center">Aksi</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {borrows.map((borrow, index) => (
//                             <tr key={borrow.id} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
//                                 <td className="px-4 py-2">{(pagination.page - 1) * itemsPerPage + index + 1}</td>
//                                 <td className="px-4 py-2">{borrow.user?.name}</td>
//                                 <td className="px-4 py-2">{borrow.user?.nis}</td>
//                                 <td className="px-4 py-2">{borrow.book?.code}</td>
//                                 <td className="px-4 py-2">{borrow.book?.title}</td>
//                                 <td className="px-4 py-2">{borrow.borrowDate.split("T")[0]}</td>
//                                 <td className="px-4 py-2">{borrow.dueDate?.split("T")[0]}</td>
//                                 <td className="px-4 py-2">{borrow.status}</td>
//                                 <td className="px-4 py-2 text-center">
//                                     <button
//                                         className="bg-yellow-500 text-white p-2 rounded mr-1 hover:bg-yellow-600"
//                                         onClick={() => openEditModal(borrow)}
//                                         title="Edit"
//                                     >
//                                         <Pencil size={16} />
//                                     </button>
//                                     <button
//                                         className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
//                                         onClick={() => handleDelete(borrow.id)}
//                                         title="Hapus"
//                                     >
//                                         <Trash2 size={16} />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                         {borrows.length === 0 && (
//                             <tr>
//                                 <td colSpan="8" className="text-center py-4 text-gray-500">
//                                     Tidak ada data peminjaman.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="mt-4 flex items-center justify-between">
//                 <p className="text-sm text-gray-500">
//                     Menampilkan {(pagination.page - 1) * itemsPerPage + 1} hingga {(pagination.page - 1) * itemsPerPage + borrows.length} dari {pagination.total_borrows} entri
//                 </p>
//                 {!isSearching && (
//                     <Pagination
//                         currentPage={pagination.page}
//                         totalPages={pagination.total_page}
//                         onPageChange={setCurrentPage}
//                     />
//                 )}
//             </div>

//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg max-h-[90vh] overflow-y-auto">
//                         <h3 className="text-xl font-semibold mb-4">{isEditMode ? "Edit" : "Tambah"} Peminjaman</h3>
//                         <div className="space-y-3">
//                             {/* Input NIS */}
//                             <input
//                                 type="text"
//                                 list="nisList"
//                                 placeholder="Ketik atau pilih NIS"
//                                 value={formData.nis || ""}
//                                 onChange={(e) => {
//                                     const selectedUser = users.find((user) => user.nis === e.target.value);
//                                     if (selectedUser) {
//                                         setFormData({
//                                             ...formData,
//                                             user_id: selectedUser.id,
//                                             userName: selectedUser.name,
//                                             nis: selectedUser.nis,
//                                         });
//                                     } else {
//                                         setFormData({
//                                             ...formData,
//                                             user_id: "",
//                                             userName: "",
//                                             nis: e.target.value,
//                                         });
//                                     }
//                                 }}
//                                 className="w-full border border-gray-300 rounded px-3 py-2"
//                             />
//                             <datalist id="nisList">
//                                 {users.map((user) => (
//                                     <option key={user.id} value={user.nis} />
//                                 ))}
//                             </datalist>

//                             <input
//                                 type="text"
//                                 value={formData.userName}
//                                 readOnly
//                                 placeholder="Nama Peminjam"
//                                 className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
//                             />

//                             <input
//                                 type="text"
//                                 list="bookList"
//                                 placeholder="Ketik atau pilih Judul Buku"
//                                 value={
//                                     books.find((book) => book.id === formData.book_id)?.title || formData.book_id
//                                 }
//                                 onChange={(e) => {
//                                     const selectedBook = books.find((book) => book.title === e.target.value);
//                                     if (selectedBook) {
//                                         setFormData({
//                                             ...formData,
//                                             book_id: selectedBook.id,
//                                         });
//                                         setBookStock(selectedBook.stock); // Tambahkan ini
//                                     } else {
//                                         setFormData({
//                                             ...formData,
//                                             book_id: e.target.value,
//                                         });
//                                         setBookStock(""); // Reset jika tidak ditemukan
//                                     }
//                                 }}
//                                 className="w-full border border-gray-300 rounded px-3 py-2"
//                             />
//                             <datalist id="bookList">
//                                 {books.map((book) => (
//                                     <option key={book.id} value={book.title} />
//                                 ))}
//                             </datalist>

//                             <input
//                                 type="text"
//                                 value={bookStock !== "" ? bookStock : ""}
//                                 readOnly
//                                 placeholder="Stok Buku"
//                                 className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
//                             />

//                             {/* <div>
//                                 <label className="block text-sm font-medium text-gray-700">Tanggal Pinjam</label>
//                                 <input
//                                     type="date"
//                                     value={formData.borrowDate}
//                                     onChange={(e) => setFormData({ ...formData, borrowDate: e.target.value })}
//                                     className="w-full border border-gray-300 rounded px-3 py-2"
//                                 />
//                             </div> */}

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">Tanggal Jatuh Tempo</label>
//                                 <input
//                                     type="date"
//                                     value={formData.dueDate}
//                                     onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
//                                     className="w-full border border-gray-300 rounded px-3 py-2"
//                                 />
//                             </div>

//                             {/* {isEditMode && (
//                                 <select
//                                     value={formData.status}
//                                     onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                                     className="w-full border border-gray-300 rounded px-3 py-2"
//                                 >
//                                     <option value="DIPINJAM">Dipinjam</option>
//                                     <option value="DIKEMBALIKAN">Dikembalikan</option>
//                                     <option value="TERLAMBAT">Terlambat</option>
//                                 </select>
//                             )} */}
//                             {isEditMode && (
//     <div>
//         <label className="block text-sm font-medium text-gray-700">Tanggal Pengembalian</label>
//         <input
//             type="date"
//             value={formData.returnDate}
//             onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//         />
//     </div>
// )}


//                         </div>

//                         <div className="flex justify-end gap-2 mt-6">
//                             <button
//                                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//                                 onClick={closeModal}
//                             >
//                                 Batal
//                             </button>
//                             <button
//                                 className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700"
//                                 onClick={handleSubmit}
//                                 disabled={loading}
//                             >
//                                 {loading ? "Menyimpan..." : isEditMode ? "Update" : "Simpan"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </AdminLayout>
//     );
// };

// export default KelolaPeminjaman;

import React, { useEffect, useState } from "react";
import {
    getAllBorrows,
    createBorrow,
    returnBorrow,
    deleteBorrow,
    searchBorrow,
} from "../../utils/borrow";
import { getAllBooks } from "../../utils/book";
import { getAllUsers } from "../../utils/user";
import { confirmDelete, showDeleteSuccess } from "../../utils/confirmDelete";
import { Pencil, Trash2, Plus } from "lucide-react";
import AdminLayout from "../../components/adminComponent/AdminLayout";
import Pagination from "../../components/adminComponent/Pagination";
import SearchBar from "../../components/adminComponent/SearchBar";
import Swal from "sweetalert2";

const KelolaPeminjaman = () => {
    const [borrows, setBorrows] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, total_page: 1, total_borrows: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editBorrowId, setEditBorrowId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [bookStock, setBookStock] = useState("");
    const [selectedField, setSelectedField] = useState("user");


    const [formData, setFormData] = useState({
        user_id: "",
        userName: "",
        nis: "",
        book_id: "",
        borrowDate: "",
        dueDate: "",
        returnDate: "",
        status: "DIPINJAM",
    });
    const itemsPerPage = 10;

    // const fetchBorrows = async () => {
    //     try {
    //         const res = await getAllBorrows({ page: currentPage, limit: itemsPerPage });
    //         const { data, pagination } = res;
    //         setBorrows(data);
    //         setPagination(pagination);
    //     } catch (error) {
    //         console.error("Gagal fetch data peminjaman:", error);
    //     }
    // };
    const fetchBorrows = async () => {
    try {
        console.log("Mem-fetch peminjaman untuk halaman:", currentPage);
        const res = await getAllBorrows({ page: currentPage, limit: itemsPerPage });
        const { data, pagination } = res;
        console.log("Data yang diterima:", data);
        console.log("Pagination yang diterima:", pagination);
        setBorrows(data);
        setPagination(pagination);
    } catch (error) {
        console.error("Gagal fetch data peminjaman:", error);
    }
};


const fetchSearchResult = async () => {
    if (!searchTerm.trim()) {
        setIsSearching(false);
        fetchBorrows();
        return;
    }

    try {
        setIsSearching(true);
        const res = await searchBorrow(searchTerm, selectedField);
        setBorrows(res);
        setPagination({ page: 1, total_page: 1, total_borrows: res.length });
    } catch (error) {
        console.error("Pencarian gagal:", error);
        setBorrows([]);
        setPagination({ page: 1, total_page: 1, total_borrows: 0 });
    }
};


    const fetchUsers = async () => {
        try {
            const res = await getAllUsers({ page: 1, limit: 10 });
            setUsers(res.data);
        } catch (error) {
            console.error("Gagal fetch pengguna:", error);
            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Data:", error.response.data);
                console.error("Headers:", error.response.headers);
            } else if (error.request) {
                console.error("Request:", error.request);
            } else {
                console.error("Message:", error.message);
            }
            console.error("Stack Trace:", error.stack);
        }
    };

    const fetchBooks = async () => {
        try {
            const res = await getAllBooks({ page: 1, limit: 10 });
            setBooks(res.data);
        } catch (error) {
            console.error("Gagal fetch buku:", error);
        }
    };

    // const handleSubmit = async () => {
    //     const { user_id, book_id, dueDate, status } = formData;

    //     if (!user_id || !book_id || !dueDate) {
    //         Swal.fire({
    //             icon: "warning",
    //             title: "Data belum lengkap",
    //             text: "Harap isi semua field",
    //         });
    //         return;
    //     }

    //     const payload = isEditMode
    //         ? { user_id, book_id, dueDate, status } // untuk update, kirim status
    //         : { user_id, book_id, dueDate };        // untuk create, jangan kirim status

    //     console.log("Payload yang dikirim:", payload);

    //     setLoading(true);
    //     try {
    //         if (isEditMode) {
    //             await updateBorrow(editBorrowId, payload);
    //             Swal.fire({
    //                 icon: "success",
    //                 title: "Berhasil",
    //                 text: "Data peminjaman diperbarui.",
    //             });
    //         } else {
    //             await createBorrow(payload);
    //             Swal.fire({
    //                 icon: "success",
    //                 title: "Berhasil",
    //                 text: "Data peminjaman ditambahkan.",
    //             });
    //         }
    //         await fetchBorrows();
    //         closeModal();
    //     } catch (error) {
    //         console.error("Gagal menyimpan data peminjaman:", error);

    //         if (error.response) {
    //             console.error("Response status:", error.response.status);
    //             console.error("Response data:", error.response.data);
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Gagal",
    //                 html: error.response.data?.errors || "Terjadi kesalahan",
    //             });
    //         } else {
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Gagal",
    //                 text: "Terjadi kesalahan saat menyimpan.",
    //             });
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = async () => {
        const { user_id, book_id, dueDate, status, returnDate } = formData;

        if (!user_id || !book_id || !dueDate || (isEditMode && (!returnDate || !status))) {
            Swal.fire({
                icon: "warning",
                title: "Data belum lengkap",
                text: "Harap isi semua field",
            });
            return;
        }

        const payload = isEditMode
            ? { returnDate, status } // untuk return
            : { user_id, book_id, dueDate }; // untuk create

        console.log("Payload yang dikirim:", payload);

        setLoading(true);
        try {
            if (isEditMode) {
                await returnBorrow(editBorrowId, payload); // <-- Panggil endpoint return
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Buku berhasil dikembalikan.",
                });
            } else {
                await createBorrow(payload);
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Data peminjaman ditambahkan.",
                });
            }
            await fetchBorrows();
            closeModal();
        } catch (error) {
            console.error("Gagal menyimpan data peminjaman:", error);
            if (error.response) {
                console.error("Response status:", error.response.status);
                console.error("Response data:", error.response.data);
                Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    html: error.response.data?.errors || "Terjadi kesalahan",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: "Terjadi kesalahan saat menyimpan.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = await confirmDelete("Data peminjaman akan dihapus permanen!");
        if (!confirmed) return;

        try {
            await deleteBorrow(id);
            isSearching ? fetchSearchResult() : fetchBorrows();
            showDeleteSuccess();
        } catch (error) {
            console.error("Gagal menghapus data:", error);
            Swal.fire({ icon: "error", title: "Gagal", text: "Tidak dapat menghapus data peminjaman." });
        }
    };

    const openAddModal = () => {
        setShowModal(true);
        setIsEditMode(false);
        setFormData({
            user_id: "",
            userName: "",
            nis: "",
            book_id: "",
            borrowDate: "",
            dueDate: "",
            status: "DIPINJAM",
        });
        fetchUsers();
        fetchBooks();
    };

    const openEditModal = (borrow) => {
        setShowModal(true);
        setIsEditMode(true);
        setEditBorrowId(borrow.id);
        setFormData({
            user_id: borrow.user.id,
            userName: borrow.user.name,
            nis: borrow.user.nis,
            book_id: borrow.book.id,
            borrowDate: borrow.borrowDate.split("T")[0],
            dueDate: borrow.dueDate?.split("T")[0],
            returnDate: borrow.returnDate?.split("T")[0] || "",
            status: borrow.status,
        });
        fetchUsers();
        fetchBooks();
    };

    const closeModal = () => {
        setShowModal(false);
        setIsEditMode(false);
        setEditBorrowId(null);
        setBookStock("");
        setFormData({
            user_id: "",
            userName: "",
            nis: "",
            book_id: "",
            borrowDate: "",
            dueDate: "",
            status: "DIPINJAM",
        });
    };

    useEffect(() => {
        if (!isSearching) fetchBorrows();
    }, [currentPage]);

    useEffect(() => {
        const debounce = setTimeout(() => fetchSearchResult(), 500);
        return () => clearTimeout(debounce);
    }, [searchTerm]);

    useEffect(() => {
        fetchUsers();
        fetchBooks();
    }, []);

    return (
        <AdminLayout>
            <h2 className="text-2xl font-semibold mb-4">Kelola Peminjaman</h2>
            <div className="flex items-center mb-4">
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded"
                    onClick={openAddModal}
                >
                    <Plus size={18} /> Tambah Data
                </button>
                {/* <div className="ml-auto mr-12">
                    <SearchBar
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cari peminjam..."
                    />
                </div> */}
                <div className="ml-auto flex gap-2 items-center mr-12">
    <select
        value={selectedField}
        onChange={(e) => setSelectedField(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
    >
        <option value="user">Nama Peminjam</option>
        <option value="book">Judul Buku</option>
        <option value="status">Status</option>
    </select>
    <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={`Cari berdasarkan ${selectedField}...`}
    />
</div>

            </div>

            <div className="overflow-auto w-full">
                <table className="w-full text-sm bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700 font-semibold text-left">
                        <tr>
                            <th className="px-4 py-3">No</th>
                            <th className="px-4 py-3">Peminjam</th>
                            <th className="px-4 py-3">NIS</th>
                            <th className="px-4 py-3">Kode Buku</th>
                            <th className="px-4 py-3">Judul Buku</th>
                            <th className="px-4 py-3">Tgl Pinjam</th>
                            <th className="px-4 py-3">Tgl Jatuh Tempo</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrows.map((borrow, index) => (
                            <tr key={borrow.id} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                <td className="px-4 py-2">{(pagination.page - 1) * itemsPerPage + index + 1}</td>
                                <td className="px-4 py-2">{borrow.user?.name}</td>
                                <td className="px-4 py-2">{borrow.user?.nis}</td>
                                <td className="px-4 py-2">{borrow.book?.code}</td>
                                <td className="px-4 py-2">{borrow.book?.title}</td>
                                <td className="px-4 py-2">{borrow.borrowDate.split("T")[0]}</td>
                                <td className="px-4 py-2">{borrow.dueDate?.split("T")[0]}</td>
                                <td className="px-4 py-2">{borrow.status}</td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        className="bg-yellow-500 text-white p-2 rounded mr-1 hover:bg-yellow-600"
                                        onClick={() => openEditModal(borrow)}
                                        title="Edit"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                                        onClick={() => handleDelete(borrow.id)}
                                        title="Hapus"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {borrows.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center py-4 text-gray-500">
                                    Tidak ada data peminjaman.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    Showing {(pagination.page - 1) * itemsPerPage + 1} to {(pagination.page - 1) * itemsPerPage + borrows.length} of {pagination.total_borrows} entries
                </p>
                {!isSearching && (
                    <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.total_page}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-semibold mb-4">{isEditMode ? "Edit" : "Tambah"} Peminjaman</h3>
                        <div className="space-y-3">
                            {/* Input NIS */}
                            <input
                                type="text"
                                list="nisList"
                                placeholder="Ketik atau pilih NIS"
                                value={formData.nis || ""}
                                onChange={(e) => {
                                    const selectedUser = users.find((user) => user.nis === e.target.value);
                                    if (selectedUser) {
                                        setFormData({
                                            ...formData,
                                            user_id: selectedUser.id,
                                            userName: selectedUser.name,
                                            nis: selectedUser.nis,
                                        });
                                    } else {
                                        setFormData({
                                            ...formData,
                                            user_id: "",
                                            userName: "",
                                            nis: e.target.value,
                                        });
                                    }
                                }}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            <datalist id="nisList">
                                {users.map((user) => (
                                    <option key={user.id} value={user.nis} />
                                ))}
                            </datalist>

                            <input
                                type="text"
                                value={formData.userName}
                                readOnly
                                placeholder="Nama Peminjam"
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                            />

                            <input
                                type="text"
                                list="bookList"
                                placeholder="Ketik atau pilih Judul Buku"
                                value={
                                    books.find((book) => book.id === formData.book_id)?.title || formData.book_id
                                }
                                onChange={(e) => {
                                    const selectedBook = books.find((book) => book.title === e.target.value);
                                    if (selectedBook) {
                                        setFormData({
                                            ...formData,
                                            book_id: selectedBook.id,
                                        });
                                        setBookStock(selectedBook.stock); // Tambahkan ini
                                    } else {
                                        setFormData({
                                            ...formData,
                                            book_id: e.target.value,
                                        });
                                        setBookStock(""); // Reset jika tidak ditemukan
                                    }
                                }}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            <datalist id="bookList">
                                {books.map((book) => (
                                    <option key={book.id} value={book.title} />
                                ))}
                            </datalist>

                            <input
                                type="text"
                                value={bookStock !== "" ? bookStock : ""}
                                readOnly
                                placeholder="Stok Buku"
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                            />

                            {/* <div>
                                <label className="block text-sm font-medium text-gray-700">Tanggal Pinjam</label>
                                <input
                                    type="date"
                                    value={formData.borrowDate}
                                    onChange={(e) => setFormData({ ...formData, borrowDate: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div> */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tanggal Jatuh Tempo</label>
                                <input
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>

                            {/* {isEditMode && (
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    <option value="DIPINJAM">Dipinjam</option>
                                    <option value="DIKEMBALIKAN">Dikembalikan</option>
                                    <option value="TERLAMBAT">Terlambat</option>
                                </select>
                            )} */}
                            {/* {isEditMode && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tanggal Pengembalian</label>
                                    <input
                                        type="date"
                                        value={formData.returnDate}
                                        onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                </div>
                            )} */}
                            {isEditMode && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tanggal Pengembalian</label>
                                        <input
                                            type="date"
                                            value={formData.returnDate}
                                            onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Status Pengembalian</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                        >
                                            <option value="DIKEMBALIKAN">Dikembalikan</option>
                                            <option value="TERLAMBAT">Terlambat</option>
                                            <option value="HILANG">Hilang</option>
                                        </select>
                                    </div>
                                </>
                            )}

                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={closeModal}
                            >
                                Batal
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? "Menyimpan..." : isEditMode ? "Update" : "Simpan"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default KelolaPeminjaman;