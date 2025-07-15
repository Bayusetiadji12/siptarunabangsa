import React, { useEffect, useState } from "react";
import { getUserBorrows } from "../../utils/borrow";
import UserNavbar from "../../components/userComponent/UserNavbar";
import UserFooter from "../../components/userComponent/UserFooter";

const HistoryPeminjamanPage = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <UserNavbar />

      <main className="flex-grow px-4 py-24 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-emerald-800 mb-6">Riwayat Peminjaman</h1>

        {loading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : borrows.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada data peminjaman.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
              <thead className="bg-emerald-100 text-emerald-800 text-sm">
                <tr>
                  <th className="p-3 text-left">Judul Buku</th>
                  <th className="p-3 text-left">Tanggal Pinjam</th>
                  <th className="p-3 text-left">Jatuh Tempo</th>
                  <th className="p-3 text-left">Tanggal Kembali</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {borrows.map((borrow) => (
                  <tr key={borrow.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{borrow.book?.title}</td>
                    <td className="p-3">{borrow.borrowDate?.split("T")[0]}</td>
                    <td className="p-3">{borrow.dueDate?.split("T")[0]}</td>
                    <td className="p-3">{borrow.returnDate ? borrow.returnDate.split("T")[0] : "-"}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          borrow.status === "DIPINJAM"
                            ? "bg-yellow-100 text-yellow-700"
                            : borrow.status === "DIKEMBALIKAN"
                            ? "bg-green-100 text-green-700"
                            : borrow.status === "TERLAMBAT"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {borrow.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <UserFooter />
    </div>
  );
};

export default HistoryPeminjamanPage;
