import React, { useEffect, useState } from "react";
import { FaBook, FaUsers, FaClipboardList } from "react-icons/fa";
import AdminLayout from "../../components/adminComponent/AdminLayout";
import Card from "../../components/adminComponent/AdminCard";
import { getAllBooks } from "../../utils/book";
import { getAllUsers } from "../../utils/user";
import { getAllBorrows } from "../../utils/borrow";

const AdminDashboard = () => {
  const [bookCount, setBookCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [borrowCount, setBorrowCount] = useState(0);

  // const fetchData = async () => {
  //   try {
  //     const books = await getAllBooks();
  //     setBookCount(books.pagination.total_books);

  //     const users = await getAllUsers({page: 1, limit: 10});
  //     setUserCount(users.pagination.total_users);

  //     const borrows = await getAllBorrows({page: 1, limit: 10});
  //     setBorrowCount(borrows.pagination.total_borrows);
  //   } catch (error) {
  //     console.error("Gagal mengambil data:", error);
  //   }
  // };

  const fetchData = async () => {
  try {
    const books = await getAllBooks();
    setBookCount(books.pagination?.total_books || books.data?.length || books.length || 0);

    const users = await getAllUsers({ page: 1, limit: 10 });
    setUserCount(users.pagination?.total_users || users.data?.length || users.length || 0);

    const borrows = await getAllBorrows({ page: 1, limit: 10 });
    setBorrowCount(borrows.pagination?.total_borrows || borrows.data?.length || borrows.length || 0);
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-6">Dashboard Admin</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Total Buku"
          count={bookCount}
          color="blue"
          to="/admin/books"
          icon={FaBook}
        />
        <Card
          title="Total Anggota"
          count={userCount}
          color="green"
          to="/admin/members"
          icon={FaUsers}
        />
        <Card
          title="Total Peminjaman"
          count={borrowCount}
          color="yellow"
          to="/admin/borrows"
          icon={FaClipboardList}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
