// import React, { useState, useEffect, useRef } from "react";
// import { Filter } from "lucide-react";
// import Navbar from "../../components/userComponent/UserNavbar";
// import Footer from "../../components/userComponent/UserFooter";
// import BookCard from "../../components/userComponent/BookCard";
// import Pagination from "../../components/adminComponent/Pagination";
// import SearchBar from "../../components/userComponent/Search";
// import { searchBook, getAllBooks, getBooksByCategory } from "../../utils/book";
// import { getAllCategory } from "../../utils/category";

// const CariBuku = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchField, setSearchField] = useState("title");
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     total_page: 1,
//     total_books: 0,
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isSearching, setIsSearching] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [showCategoryMenu, setShowCategoryMenu] = useState(false);
//   const dropdownRef = useRef(null);
//   const itemsPerPage = 12;

//   useEffect(() => {
//     fetchCategories();
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowCategoryMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await getAllCategory({ page: 1, limit: 10 });
//       setCategories(res.data);
//     } catch (error) {
//       console.error("Gagal mengambil kategori:", error);
//     }
//   };

//   const fetchBooks = async (page = 1) => {
//     try {
//       setLoading(true);
//       let res;

//       if (selectedCategory) {
//         res = await getBooksByCategory(selectedCategory, page, itemsPerPage);
//         setBooks(res.data);
//         setPagination(res.pagination);
//       } else {
//         res = await getAllBooks({ page, limit: itemsPerPage });
//         const { data, pagination } = res;
//         setBooks(data);
//         setPagination(pagination);
//       }
//     } catch (error) {
//       console.error("Gagal mengambil buku:", error);
//       setBooks([]);
//       setPagination({ page: 1, total_page: 1, total_books: 0 });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!isSearching) {
//       fetchBooks(currentPage);
//     }
//   }, [currentPage, isSearching, selectedCategory]);

// const handleSearch = async () => {
//   if (!searchQuery.trim()) return;
//   try {
//     setLoading(true);
//     setIsSearching(true);
//     const results = await searchBook(searchQuery, searchField, selectedCategory); // ← kirim field
//     setBooks(results);
//     setPagination({
//       page: 1,
//       total_page: 1,
//       total_books: results.length,
//     });
//   } catch (error) {
//     console.error("Gagal mencari buku:", error);
//     setBooks([]);
//     setPagination({
//       page: 1,
//       total_page: 1,
//       total_books: 0,
//     });
//   } finally {
//     setLoading(false);
//   }
// };


//   const handleClearSearch = () => {
//     setSearchQuery("");
//     setIsSearching(false);
//     fetchBooks(1);
//     setCurrentPage(1);
//   };

//   const handleDetail = (book) => {
//     alert(
//       `Detail Buku:\n\nJudul: ${book.title}\nPenulis: ${book.author || "Tanpa Penulis"}\nTahun: ${book.year}`
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#e2dcdc] relative pt-20">
//       <Navbar />

//       {/* Search & Filter */}
//       <div className="bg-emerald-700 px-6 py-4 flex flex-col md:flex-row justify-center items-center gap-4 relative">
//         {/* SearchBar */}
//         <SearchBar
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           onSearch={handleSearch}
//           onClear={handleClearSearch}
//           isSearching={isSearching}
//           searchField={searchField}
//           setSearchField={setSearchField}
//         />

//         {/* Filter Button */}
//         <div className="relative" ref={dropdownRef}>
//           <button
//             onClick={() => setShowCategoryMenu((prev) => !prev)}
//             className="bg-white px-3 py-2 rounded-lg shadow-md flex items-center gap-2"
//           >
//             <Filter className="text-gray-700" size={18} />
//             <span className="text-sm text-gray-700">
//               {selectedCategory || "Kategori"}
//             </span>
//           </button>

//           {/* Dropdown */}
//           {showCategoryMenu && (
//             <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-20">
//               <ul className="max-h-64 overflow-auto text-sm">
//                 <li
//                   className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
//                     selectedCategory === "" ? "font-semibold text-blue-600" : ""
//                   }`}
//                   onClick={() => {
//                     setSelectedCategory("");
//                     setCurrentPage(1);
//                     setShowCategoryMenu(false);
//                   }}
//                 >
//                   Semua Kategori
//                 </li>
//                 {categories.length === 0 ? (
//                   <li className="px-4 py-2 text-gray-500">Tidak ada kategori</li>
//                 ) : (
//                   categories.map((cat) => (
//                     <li
//                       key={cat.id}
//                       className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
//                         selectedCategory === cat.name
//                           ? "font-semibold text-blue-600"
//                           : ""
//                       }`}
//                       onClick={() => {
//                         setSelectedCategory(cat.name);
//                         setCurrentPage(1);
//                         setShowCategoryMenu(false);
//                       }}
//                     >
//                       {cat.name}
//                     </li>
//                   ))
//                 )}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Book Grid */}
//       <div className="px-6 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {loading ? (
//           <p className="col-span-full text-center text-gray-500">
//             Memuat data...
//           </p>
//         ) : books.length > 0 ? (
//           books.map((book, index) => (
//             <BookCard key={index} book={book} onDetail={handleDetail} />
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-600">
//             Tidak ada buku ditemukan.
//           </p>
//         )}
//       </div>

//       {/* Pagination */}
//       {!isSearching && pagination.total_page > 1 && (
//         <div className="flex justify-center px-6 pb-6">
//           <Pagination
//             currentPage={pagination.page}
//             totalPages={pagination.total_page}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default CariBuku;

import React, { useState, useEffect, useRef } from "react";
import { Filter, ChevronDown, BookOpen } from "lucide-react";
import Navbar from "../../components/userComponent/UserNavbar";
import Footer from "../../components/userComponent/UserFooter";
import BookCard from "../../components/userComponent/BookCard";
import Pagination from "../../components/adminComponent/Pagination";
import SearchBar from "../../components/userComponent/Search";
import { searchBook, getAllBooks, getBooksByCategory } from "../../utils/book";
import { getAllCategory } from "../../utils/category";

const CariBuku = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("title");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    total_page: 1,
    total_books: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const dropdownRef = useRef(null);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchCategories();
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCategoryMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategory({ page: 1, limit: 10 });
      setCategories(res.data);
    } catch (error) {
      console.error("Gagal mengambil kategori:", error);
    }
  };

  const fetchBooks = async (page = 1) => {
    try {
      setLoading(true);
      let res;

      if (selectedCategory) {
        res = await getBooksByCategory(selectedCategory, page, itemsPerPage);
        setBooks(res.data);
        setPagination(res.pagination);
      } else {
        res = await getAllBooks({ page, limit: itemsPerPage });
        const { data, pagination } = res;
        setBooks(data);
        setPagination(pagination);
      }
    } catch (error) {
      console.error("Gagal mengambil buku:", error);
      setBooks([]);
      setPagination({ page: 1, total_page: 1, total_books: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSearching) {
      fetchBooks(currentPage);
    }
  }, [currentPage, isSearching, selectedCategory]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      setLoading(true);
      setIsSearching(true);
      const results = await searchBook(searchQuery, searchField, selectedCategory);
      setBooks(results);
      setPagination({
        page: 1,
        total_page: 1,
        total_books: results.length,
      });
    } catch (error) {
      console.error("Gagal mencari buku:", error);
      setBooks([]);
      setPagination({
        page: 1,
        total_page: 1,
        total_books: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    fetchBooks(1);
    setCurrentPage(1);
  };

  const handleDetail = (book) => {
    alert(
      `Detail Buku:\n\nJudul: ${book.title}\nPenulis: ${book.author || "Tanpa Penulis"}\nTahun: ${book.year}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      {/* Hero Section with Search */}
      <div className="relative bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 pt-20 sm:pt-24 pb-4 sm:pb-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          {/* Page Title */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              <BookOpen className="inline-block mr-2 sm:mr-3 mb-1 sm:mb-2" size={32} />
              <span className="hidden sm:inline">Perpustakaan Digital</span>
              <span className="sm:hidden">Perpustakaan</span>
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-2">
              Temukan ribuan koleksi buku terbaik dalam genggaman Anda
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Search Bar */}
            <div className="w-full">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch}
                onClear={handleClearSearch}
                isSearching={isSearching}
                searchField={searchField}
                setSearchField={setSearchField}
              />
            </div>

            {/* Category Filter */}
            <div className="flex justify-center">
              <div className="relative w-full sm:w-auto" ref={dropdownRef}>
                <button
                  onClick={() => setShowCategoryMenu((prev) => !prev)}
                  className="group bg-white hover:bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg border border-gray-200 flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl w-full sm:w-auto sm:min-w-[200px]"
                >
                  <Filter className="text-emerald-600 group-hover:text-emerald-700" size={18} />
                  <span className="text-gray-700 font-medium text-sm truncate">
                    {selectedCategory || "Semua Kategori"}
                  </span>
                  <ChevronDown 
                    className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      showCategoryMenu ? 'rotate-180' : ''
                    }`} 
                    size={16} 
                  />
                </button>

                {/* Enhanced Dropdown */}
                {showCategoryMenu && (
                  <div className="absolute left-0 right-0 sm:right-0 sm:left-auto mt-3 w-full sm:w-64 bg-white shadow-2xl rounded-xl border border-gray-200 z-30 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-700">Pilih Kategori</h3>
                    </div>
                    <ul className="max-h-64 sm:max-h-80 overflow-auto">
                      <li
                        className={`px-4 py-3 hover:bg-emerald-50 cursor-pointer transition-colors border-b border-gray-100 ${
                          selectedCategory === "" 
                            ? "bg-emerald-50 text-emerald-700 font-semibold border-l-4 border-emerald-500" 
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setSelectedCategory("");
                          setCurrentPage(1);
                          setShowCategoryMenu(false);
                        }}
                      >
                        <div className="flex items-center">
                          <span className="mr-3">📚</span>
                          <span className="truncate">Semua Kategori</span>
                        </div>
                      </li>
                      {categories.length === 0 ? (
                        <li className="px-4 py-6 text-gray-500 text-center italic text-sm">
                          Tidak ada kategori tersedia
                        </li>
                      ) : (
                        categories.map((cat, index) => (
                          <li
                            key={cat.id}
                            className={`px-4 py-3 hover:bg-emerald-50 cursor-pointer transition-colors ${
                              index < categories.length - 1 ? 'border-b border-gray-100' : ''
                            } ${
                              selectedCategory === cat.name
                                ? "bg-emerald-50 text-emerald-700 font-semibold border-l-4 border-emerald-500"
                                : "text-gray-700"
                            }`}
                            onClick={() => {
                              setSelectedCategory(cat.name);
                              setCurrentPage(1);
                              setShowCategoryMenu(false);
                            }}
                          >
                            <div className="flex items-center">
                              <span className="mr-3">📖</span>
                              <span className="truncate">{cat.name}</span>
                            </div>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Results Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                {isSearching ? 'Hasil Pencarian' : selectedCategory ? `Kategori: ${selectedCategory}` : 'Semua Buku'}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {loading ? 'Memuat...' : `Ditemukan ${pagination.total_books} buku`}
              </p>
            </div>
            
            {!isSearching && (
              <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg self-start sm:self-center">
                Halaman {pagination.page} dari {pagination.total_page}
              </div>
            )}
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-48 sm:h-64 md:h-80 rounded-lg sm:rounded-xl mb-3 sm:mb-4"></div>
                <div className="bg-gray-200 h-3 sm:h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-2 sm:h-3 rounded w-3/4"></div>
              </div>
            ))
          ) : books.length > 0 ? (
            books.map((book, index) => (
              <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                <BookCard book={book} onDetail={handleDetail} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 sm:py-16">
              <div className="max-w-md mx-auto px-4">
                <BookOpen className="mx-auto text-gray-300 mb-4 sm:mb-6" size={60} />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                  Tidak ada buku ditemukan
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
                  Coba ubah kata kunci pencarian atau pilih kategori lain
                </p>
                {isSearching && (
                  <button
                    onClick={handleClearSearch}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Lihat Semua Buku
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isSearching && pagination.total_page > 1 && (
          <div className="flex justify-center mt-8 sm:mt-12">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-200 p-1 sm:p-2">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.total_page}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CariBuku;