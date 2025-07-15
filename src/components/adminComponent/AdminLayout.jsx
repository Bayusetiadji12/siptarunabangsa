import React from "react";
import AdminSidebar from "./AdminSide";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      <AdminSidebar />
      <div className="ml-64 flex-1 bg-gray-50 flex flex-col">
        <AdminNavbar />
        <main className="p-6 w-full">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;

