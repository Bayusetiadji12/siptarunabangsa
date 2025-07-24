// import React, { useEffect, useState, useRef } from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import { FaUserCircle, FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";
// import { getUserProfile } from "../../utils/user";
// import Swal from "sweetalert2";

// const UserNavbar = () => {
//   const [user, setUser] = useState(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const data = await getUserProfile();
//         setUser(data);
//       } catch (error) {
//         console.error("Gagal mengambil profil:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleLogout = async () => {
//     // Show confirmation dialog
//     const result = await Swal.fire({
//       title: "Yakin ingin logout?",
//       text: "Anda akan keluar dari sistem.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, logout",
//       cancelButtonText: "Batal",
//     });

//     if (result.isConfirmed) {
//       // Clear user data from localStorage/sessionStorage
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       sessionStorage.removeItem("token");
//       sessionStorage.removeItem("user");
      
//       // Reset user state
//       setUser(null);
      
//       // Close dropdown
//       setIsDropdownOpen(false);
      
//       // Show success message and redirect
//       Swal.fire("Logout Berhasil", "Anda telah logout.", "success");
//       navigate("/");
//     }
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center border-b border-emerald-100">
//       {/* Logo */}
//       <div className="text-2xl font-extrabold bg-gradient-to-r from-emerald-500 to-emerald-800 text-transparent bg-clip-text">
//         SIP Taruna Bangsa
//       </div>

//       {/* Menu Navigasi */}
//       <div className="space-x-2 hidden md:flex">
//         <NavLink
//           to="/home"
//           className={({ isActive }) =>
//             `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
//               isActive
//                 ? "bg-emerald-100 text-emerald-700 font-semibold"
//                 : "text-gray-700 hover:text-emerald-700"
//             }`
//           }
//         >
//           Beranda
//         </NavLink>

//         <NavLink
//           to="/search"
//           className={({ isActive }) =>
//             `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
//               isActive
//                 ? "bg-emerald-100 text-emerald-700 font-semibold"
//                 : "text-gray-700 hover:text-emerald-700"
//             }`
//           }
//         >
//           Cari Buku
//         </NavLink>

//         <NavLink
//           to="/peminjaman"
//           className={({ isActive }) =>
//             `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
//               isActive
//                 ? "bg-emerald-100 text-emerald-700 font-semibold"
//                 : "text-gray-700 hover:text-emerald-700"
//             }`
//           }
//         >
//           Riwayat Peminjaman
//         </NavLink>
//       </div>

//       {/* Profil Pengguna */}
//       {user ? (
//         <div className="relative" ref={dropdownRef}>
//           <div 
//             className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
//             onClick={toggleDropdown}
//           >
//             <div className="text-right">
//               <p className="font-semibold text-gray-800">{user.name}</p>
//               <p className="text-sm text-gray-500">Pengguna</p>
//             </div>
//             <div className="flex items-center gap-2">
//               {user.image ? (
//                 <img
//                   src={user.image}
//                   alt="User Avatar"
//                   className="rounded-full w-10 h-10 object-cover border-2 border-emerald-600 shadow-md"
//                 />
//               ) : (
//                 <FaUserCircle className="w-10 h-10 text-gray-400" />
//               )}
//               <FaChevronDown 
//                 className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
//                   isDropdownOpen ? "rotate-180" : ""
//                 }`} 
//               />
//             </div>
//           </div>

//           {/* Dropdown Menu */}
//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
//               <Link
//                 to="/profile"
//                 className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//                 onClick={() => setIsDropdownOpen(false)}
//               >
//                 <FaUser className="w-4 h-4" />
//                 <span>Profil Saya</span>
//               </Link>
              
//               <hr className="my-2 border-gray-200" />
              
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
//               >
//                 <FaSignOutAlt className="w-4 h-4" />
//                 <span>Keluar</span>
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p className="text-gray-500">Memuat data...</p>
//       )}
//     </nav>
//   );
// };

// export default UserNavbar;

import React, { useEffect, useState, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaChevronDown, FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { getUserProfile } from "../../utils/user";
import Swal from "sweetalert2";

const UserNavbar = () => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (error) {
        console.error("Gagal mengambil profil:", error);
      }
    };

    fetchUser();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Yakin ingin logout?",
      text: "Anda akan keluar dari sistem.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      // Clear user data from localStorage/sessionStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      
      // Reset user state
      setUser(null);
      
      // Close dropdowns
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      
      // Show success message and redirect
      Swal.fire("Logout Berhasil", "Anda telah logout.", "success");
      navigate("/");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center border-b border-emerald-100">
        {/* Logo */}
        <div className="text-lg sm:text-xl md:text-2xl font-extrabold bg-gradient-to-r from-emerald-500 to-emerald-800 text-transparent bg-clip-text">
          <span className="hidden sm:inline">SIP Taruna Bangsa</span>
          <span className="sm:hidden">SIP Taruna Bangsa</span>
        </div>

        {/* Desktop Menu Navigasi */}
        <div className="space-x-2 hidden lg:flex">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                isActive
                  ? "bg-emerald-100 text-emerald-700 font-semibold"
                  : "text-gray-700 hover:text-emerald-700"
              }`
            }
          >
            Beranda
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                isActive
                  ? "bg-emerald-100 text-emerald-700 font-semibold"
                  : "text-gray-700 hover:text-emerald-700"
              }`
            }
          >
            Cari Buku
          </NavLink>

          <NavLink
            to="/peminjaman"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                isActive
                  ? "bg-emerald-100 text-emerald-700 font-semibold"
                  : "text-gray-700 hover:text-emerald-700"
              }`
            }
          >
            Riwayat Peminjaman
          </NavLink>
        </div>

        {/* Right Section - User Profile & Mobile Menu */}
        <div className="flex items-center space-x-2">
          {/* Desktop Profil Pengguna */}
          {user ? (
            <div className="relative hidden sm:block" ref={dropdownRef}>
              <div 
                className="flex items-center gap-2 sm:gap-4 cursor-pointer hover:bg-gray-50 rounded-lg p-1 sm:p-2 transition-colors duration-200"
                onClick={toggleDropdown}
              >
                <div className="text-right hidden md:block">
                  <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">Pengguna</p>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="User Avatar"
                      className="rounded-full w-8 h-8 sm:w-10 sm:h-10 object-cover border-2 border-emerald-600 shadow-md"
                    />
                  ) : (
                    <FaUserCircle className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                  )}
                  <FaChevronDown 
                    className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`} 
                  />
                </div>
              </div>

              {/* Desktop Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FaUser className="w-4 h-4" />
                    <span>Profil Saya</span>
                  </Link>
                  
                  <hr className="my-2 border-gray-200" />
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    <span>Keluar</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm hidden sm:block">Memuat...</p>
          )}

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-100 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={closeMobileMenu}></div>
          <div 
            ref={mobileMenuRef}
            className="fixed top-0 right-0 h-full w-64 sm:w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <span className="text-lg font-bold text-emerald-700">Menu</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile Section (Mobile) */}
              {user && (
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt="User Avatar"
                        className="rounded-full w-12 h-12 object-cover border-2 border-emerald-600 shadow-md"
                      />
                    ) : (
                      <FaUserCircle className="w-12 h-12 text-gray-400" />
                    )}
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">Pengguna</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Navigation Links */}
              <div className="flex-1 py-4">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-base font-medium transition-colors duration-300 ${
                      isActive
                        ? "bg-emerald-100 text-emerald-700 border-r-4 border-emerald-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-emerald-700"
                    }`
                  }
                  onClick={closeMobileMenu}
                >
                  Beranda
                </NavLink>

                <NavLink
                  to="/search"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-base font-medium transition-colors duration-300 ${
                      isActive
                        ? "bg-emerald-100 text-emerald-700 border-r-4 border-emerald-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-emerald-700"
                    }`
                  }
                  onClick={closeMobileMenu}
                >
                  Cari Buku
                </NavLink>

                <NavLink
                  to="/peminjaman"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-base font-medium transition-colors duration-300 ${
                      isActive
                        ? "bg-emerald-100 text-emerald-700 border-r-4 border-emerald-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-emerald-700"
                    }`
                  }
                  onClick={closeMobileMenu}
                >
                  Riwayat Peminjaman
                </NavLink>

                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-emerald-700 transition-colors duration-300"
                  onClick={closeMobileMenu}
                >
                  <FaUser className="w-4 h-4" />
                  <span>Profil Saya</span>
                </Link>
              </div>

              {/* Mobile Logout Button */}
              {user && (
                <div className="border-t border-gray-200 p-4">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    <span>Keluar</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserNavbar;