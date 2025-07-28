// import React, { useEffect, useState } from "react";
// import { getUserBorrows } from "../../utils/borrow";
// import UserNavbar from "../../components/userComponent/UserNavbar";
// import UserFooter from "../../components/userComponent/UserFooter";

// const HistoryPeminjamanPage = () => {
//   const [borrows, setBorrows] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBorrows = async () => {
//       try {
//         const res = await getUserBorrows();
//         setBorrows(res);
//       } catch (error) {
//         console.error("Gagal memuat riwayat:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBorrows();
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       <UserNavbar />

//       <main className="flex-grow px-4 py-24 max-w-5xl mx-auto">
//         <h1 className="text-2xl font-bold text-emerald-800 mb-6">Riwayat Peminjaman</h1>

//         {loading ? (
//           <p className="text-center text-gray-500">Memuat data...</p>
//         ) : borrows.length === 0 ? (
//           <p className="text-center text-gray-500">Belum ada data peminjaman.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
//               <thead className="bg-emerald-100 text-emerald-800 text-sm">
//                 <tr>
//                   <th className="p-3 text-left">Judul Buku</th>
//                   <th className="p-3 text-left">Tanggal Pinjam</th>
//                   <th className="p-3 text-left">Jatuh Tempo</th>
//                   <th className="p-3 text-left">Tanggal Kembali</th>
//                   <th className="p-3 text-left">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {borrows.map((borrow) => (
//                   <tr key={borrow.id} className="border-b hover:bg-gray-50">
//                     <td className="p-3">{borrow.book?.title}</td>
//                     <td className="p-3">{borrow.borrowDate?.split("T")[0]}</td>
//                     <td className="p-3">{borrow.dueDate?.split("T")[0]}</td>
//                     <td className="p-3">{borrow.returnDate ? borrow.returnDate.split("T")[0] : "-"}</td>
//                     <td className="p-3">
//                       <span
//                         className={`px-2 py-1 text-xs rounded-full font-medium ${
//                           borrow.status === "DIPINJAM"
//                             ? "bg-yellow-100 text-yellow-700"
//                             : borrow.status === "DIKEMBALIKAN"
//                             ? "bg-green-100 text-green-700"
//                             : borrow.status === "TERLAMBAT"
//                             ? "bg-red-100 text-red-700"
//                             : "bg-gray-100 text-gray-700"
//                         }`}
//                       >
//                         {borrow.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </main>

//       <UserFooter />
//     </div>
//   );
// };

// export default HistoryPeminjamanPage;

import React, { useEffect, useState } from "react";
import { getUserBorrows } from "../../utils/borrow";
import UserNavbar from "../../components/userComponent/UserNavbar";
import UserFooter from "../../components/userComponent/UserFooter";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Book,
  History,
} from "lucide-react";

const HistoryPeminjamanPage = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const res = await getUserBorrows();
        setBorrows(res);
      } catch (error) {
        console.error("Gagal memuat riwayat:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "DIPINJAM":
        return <Clock className="w-4 h-4" />;
      case "DIKEMBALIKAN":
        return <CheckCircle className="w-4 h-4" />;
      case "TERLAMBAT":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case "HILANG":
        return <AlertCircle className="w-4 h-4 text-rose-600" />;
      default:
        return <Book className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DIPINJAM":
        return "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200";
      case "DIKEMBALIKAN":
        return "bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200";
      case "TERLAMBAT":
        return "bg-gradient-to-r from-red-100 to-red-50 text-red-700 border border-red-200";
      case "HILANG":
        return "bg-gradient-to-r from-rose-100 to-rose-50 text-rose-700 border border-rose-200";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const filteredBorrows = borrows.filter(
    (borrow) => filter === "ALL" || borrow.status === filter
  );

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysOverdue = (dueDate, returnDate) => {
    if (!dueDate) return 0;
    const due = new Date(dueDate);
    const returned = returnDate ? new Date(returnDate) : new Date();
    const diffTime = returned - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const stats = {
    total: borrows.length,
    dipinjam: borrows.filter((b) => b.status === "DIPINJAM").length,
    dikembalikan: borrows.filter((b) => b.status === "DIKEMBALIKAN").length,
    terlambat: borrows.filter((b) => b.status === "TERLAMBAT").length,
    hilang: borrows.filter((b) => b.status === "HILANG").length,
  };

  const filters = ["ALL", "DIPINJAM", "DIKEMBALIKAN", "TERLAMBAT", "HILANG"];

  const statCards = [
    { icon: <Book className="text-blue-600" size={24} />, label: "Total", value: stats.total, bg: "bg-blue-100" },
    { icon: <Clock className="text-yellow-600" size={24} />, label: "Dipinjam", value: stats.dipinjam, bg: "bg-yellow-100" },
    { icon: <CheckCircle className="text-green-600" size={24} />, label: "Dikembalikan", value: stats.dikembalikan, bg: "bg-green-100" },
    { icon: <AlertCircle className="text-red-600" size={24} />, label: "Terlambat", value: stats.terlambat, bg: "bg-red-100" },
    { icon: <AlertCircle className="text-rose-600" size={24} />, label: "Hilang", value: stats.hilang, bg: "bg-rose-100" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 overflow-x-hidden">
      <UserNavbar />

      {/* Hero */}
      <div className="relative bg-gradient-to-r from-emerald-600 via-emerald-700 to-blue-600 pt-28 pb-8">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center items-center mb-4">
            <History className="text-white mr-3" size={48} />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Riwayat Peminjaman
            </h1>
          </div>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto">
            Pantau semua aktivitas peminjaman buku Anda dengan mudah
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Statistik */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {statCards.map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center">
                <div className={`${s.bg} p-3 rounded-lg`}>{s.icon}</div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{s.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Status</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {filters.map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg font-medium transition-all duration-200 cursor-pointer select-none ${
                  filter === status
                    ? "bg-emerald-600 text-white shadow-md transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                }`}
              >
                {status === "ALL" ? "Semua" : status}
              </button>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Filter aktif: <span className="font-semibold text-emerald-600">{filter === "ALL" ? "Semua Status" : filter}</span>
          </div>
        </div>

        {/* Konten akan lanjut di bagian tampilan tabel dan kartu */}
        {/* Konten */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg">Memuat riwayat peminjaman...</p>
          </div>
        ) : filteredBorrows.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
            <History className="mx-auto text-gray-300 mb-6" size={80} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {filter === "ALL"
                ? "Belum Ada Riwayat Peminjaman"
                : `Tidak Ada Data ${filter}`}
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === "ALL"
                ? "Mulai pinjam buku untuk melihat riwayat di sini"
                : `Tidak ada peminjaman dengan status ${filter.toLowerCase()}`}
            </p>
            {filter !== "ALL" && (
              <button
                onClick={() => setFilter("ALL")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors cursor-pointer select-none"
              >
                Lihat Semua Riwayat
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Desktop */}
            <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-gradient-to-r from-emerald-100 to-blue-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Judul Buku</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tanggal Pinjam</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Jatuh Tempo</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tanggal Kembali</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredBorrows.map((borrow, index) => {
                      const daysOverdue = getDaysOverdue(borrow.dueDate, borrow.returnDate);
                      return (
                        <tr key={borrow.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                                <Book className="text-emerald-600" size={20} />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900 break-words">
                                  {borrow.book?.title || "Judul tidak tersedia"}
                                </p>
                                <p className="text-sm text-gray-500">Kode Buku: {borrow.book.code}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">{formatDate(borrow.borrowDate)}</td>
                          <td className="px-6 py-4">{formatDate(borrow.dueDate)}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {formatDate(borrow.returnDate)}
                              {daysOverdue > 0 && !borrow.returnDate && (
                                <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                  +{daysOverdue} hari
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(borrow.status)}`}>
                              {getStatusIcon(borrow.status)}
                              <span className="ml-2">{borrow.status}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden space-y-4">
              {filteredBorrows.map((borrow) => {
                const daysOverdue = getDaysOverdue(borrow.dueDate, borrow.returnDate);
                return (
                  <div key={borrow.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                          <Book className="text-emerald-600" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm break-words max-w-[200px]">{borrow.book?.title || "Judul tidak tersedia"}</h3>
                          <p className="text-xs text-gray-500">ID: {borrow.id}</p>
                        </div>
                      </div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(borrow.status)}`}>
                        {getStatusIcon(borrow.status)}
                        <span className="ml-1">{borrow.status}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tanggal Pinjam</span>
                        <span className="font-medium text-gray-900">{formatDate(borrow.borrowDate)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Jatuh Tempo</span>
                        <span className="font-medium text-gray-900">{formatDate(borrow.dueDate)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tanggal Kembali</span>
                        <span className="font-medium text-gray-900 flex items-center">
                          {formatDate(borrow.returnDate)}
                          {daysOverdue > 0 && !borrow.returnDate && (
                            <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                              +{daysOverdue} hari
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center">
              <p className="text-gray-600">
                Menampilkan{" "}
                <span className="font-semibold text-emerald-600">
                  {filteredBorrows.length}
                </span>{" "}
                dari{" "}
                <span className="font-semibold">{borrows.length}</span> total
                riwayat peminjaman
              </p>
            </div>
          </div>
        )}
      </main>

      <div className="pb-8" />
      <UserFooter />
    </div>
  );
};

export default HistoryPeminjamanPage;

