import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/userPage/LoginPage";
import Register from "./pages/userPage/RegisterPage";
import Home from "./pages/userPage/HomePage";
import AdminDashboard from "./pages/adminPage/DashboardPage";
import DataUser from "./pages/adminPage/DataUserPage";
import DataKategori from "./pages/adminPage/DataKategoriPage";
import DataBuku from "./pages/adminPage/DataBukuPage";
import KelolaPeminjaman from "./pages/adminPage/DataPeminjamanPage";
import PrivateRoute from "./components/adminComponent/PrivateRoute";
import CariBuku from "./pages/userPage/CariBukuPage";
import DetailBookPage from "./pages/userPage/DetailBookPage";
import HistoryPeminjamanPage from "./pages/userPage/PeminjamanPage";
import { BiHome } from "react-icons/bi";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman bebas diakses */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<CariBuku />} />
        <Route path="/books/:id" element={<DetailBookPage />} />
        <Route path="/peminjaman" element={<HistoryPeminjamanPage />} />

        {/* Halaman admin dilindungi oleh PrivateRoute */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/members"
          element={
            <PrivateRoute>
              <DataUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <PrivateRoute>
              <DataKategori />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/books"
          element={
            <PrivateRoute>
              <DataBuku />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/borrows"
          element={
            <PrivateRoute>
              <KelolaPeminjaman />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
      // <BrowserRouter>
      //   <Routes>
      //     <Route path="/" element={<Login />} />
      //     <Route path="/register" element={<Register />} />
      //     <Route path="/user" element={<UserProfile />} />
      //     <Route path="/admin/dashboard" element={<AdminDashboard />} />
      //     <Route path="/admin/members" element={<DataUser />} />
      //     <Route path="/admin/categories" element={<DataKategori />} />
      //     <Route path="/admin/books" element={<DataBuku />} />
      //     <Route path="/admin/borrows" element={<KelolaPeminjaman />} />
      //   </Routes>
      // </BrowserRouter>
  );
}

export default App;
