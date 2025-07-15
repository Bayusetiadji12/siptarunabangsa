// import React, { useState, useEffect, useRef } from "react";
// import { Search, Filter } from "lucide-react";
// import Navbar from "../../components/userComponent/UserNavbar";
// import Footer from "../../components/userComponent/UserFooter";
// import BookCard from "../../components/userComponent/BookCard";
// import Pagination from "../../components/adminComponent/Pagination";
// import { searchBook, getAllBooks, getBooksByCategory } from "../../utils/book";
// import { getAllCategory } from "../../utils/category";

// const CariBuku = () => {
//   const [searchQuery, setSearchQuery] = useState("");
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

// const fetchCategories = async () => {
//   try {
//     const res = await getAllCategory({ page: 1, limit: 10 });
//     setCategories(res.data);
//   } catch (error) {
//     console.error("Gagal mengambil kategori:", error);
//   }
// };

// // const fetchBooks = async (page = 1) => {
// //   try {
// //     setLoading(true);

// //     if (selectedCategory) {
// //       // Jika ada kategori dipilih, ambil data dari endpoint kategori
// //       const data = await getBooksByCategory(selectedCategory);
// //       setBooks(data);
// //       setPagination({
// //         page: 1,
// //         total_page: 1,
// //         total_books: data.length,
// //       });
// //     } else {
// //       // Jika tidak ada filter kategori, ambil semua dengan pagination
// //       const res = await getAllBooks({ page, limit: itemsPerPage });
// //       const { data, pagination } = res;
// //       setBooks(data);
// //       setPagination(pagination);
// //     }
// //   } catch (error) {
// //     console.error("Gagal mengambil buku:", error);
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// const fetchBooks = async (page = 1) => {
//   try {
//     setLoading(true);
//     let res;

//     if (selectedCategory) {
//       // Gunakan filter berdasarkan kategori
//       res = await getBooksByCategory(selectedCategory);
//       setBooks(res.data); // karena tidak ada pagination dari endpoint ini
//       setPagination({ page: 1, total_page: 1, total_books: res.data.length });
//     } else {
//       // Gunakan endpoint biasa
//       res = await getAllBooks({ page, limit: itemsPerPage });
//       const { data, pagination } = res;
//       setBooks(data);
//       setPagination(pagination);
//     }
//   } catch (error) {
//     console.error("Gagal mengambil buku:", error);
//     setBooks([]);
//     setPagination({ page: 1, total_page: 1, total_books: 0 });
//   } finally {
//     setLoading(false);
//   }
// };


// useEffect(() => {
//   if (!isSearching) {
//     fetchBooks(currentPage);
//   }
// }, [currentPage, isSearching, selectedCategory]);

// //   const handleSearch = async () => {
// //     if (!searchQuery.trim()) return;
// //     try {
// //       setLoading(true);
// //       setIsSearching(true);
// //       const results = await searchBook(searchQuery);
// //       setBooks(results);
// //       setPagination({ page: 1, total_page: 1, total_books: results.length });
// //     } catch (error) {
// //       console.error("Gagal mencari buku:", error);
// //       setBooks([]);
// //       setPagination({ page: 1, total_page: 1, total_books: 0 });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// const handleSearch = async () => {
//   if (!searchQuery.trim()) return;
//   try {
//     setLoading(true);
//     setIsSearching(true);
//     const results = await searchBook(searchQuery, selectedCategory); // kirim kategori juga
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
//     setSelectedCategory("");
//     fetchBooks(1);
//     setCurrentPage(1);
//   };

//   const handleDetail = (book) => {
//     alert(
//       `Detail Buku:\n\nJudul: ${book.title}\nPenulis: ${book.author || "Tanpa Penulis"}\nTahun: ${book.year}`
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#e2dcdc] relative">
//       <Navbar />

//       {/* Search & Filter */}
//       <div className="bg-[#837f7f] px-6 py-4 flex flex-col md:flex-row justify-center items-center gap-4 relative">
//         {/* Search Input */}
//         <div className="w-full md:w-1/2 flex items-center bg-white rounded-lg shadow-md px-4 py-2 space-x-2">
//           <input
//             type="text"
//             placeholder="Cari"
//             className="w-full outline-none"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") handleSearch();
//             }}
//           />
//           <button onClick={handleSearch}>
//             <Search className="text-gray-600 hover:text-black" />
//           </button>
//           {isSearching && (
//             <button
//               onClick={handleClearSearch}
//               className="ml-2 text-sm text-red-600 underline"
//             >
//               Reset
//             </button>
//           )}
//         </div>

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
//         <div className="flex justify-center px-6">
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
import { Filter } from "lucide-react";
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
    const results = await searchBook(searchQuery, searchField, selectedCategory); // ← kirim field
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
    <div className="min-h-screen bg-[#e2dcdc] relative pt-20">
      <Navbar />

      {/* Search & Filter */}
      <div className="bg-emerald-700 px-6 py-4 flex flex-col md:flex-row justify-center items-center gap-4 relative">
        {/* SearchBar */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          onClear={handleClearSearch}
          isSearching={isSearching}
          searchField={searchField}
          setSearchField={setSearchField}
        />

        {/* Filter Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowCategoryMenu((prev) => !prev)}
            className="bg-white px-3 py-2 rounded-lg shadow-md flex items-center gap-2"
          >
            <Filter className="text-gray-700" size={18} />
            <span className="text-sm text-gray-700">
              {selectedCategory || "Kategori"}
            </span>
          </button>

          {/* Dropdown */}
          {showCategoryMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-20">
              <ul className="max-h-64 overflow-auto text-sm">
                <li
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    selectedCategory === "" ? "font-semibold text-blue-600" : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory("");
                    setCurrentPage(1);
                    setShowCategoryMenu(false);
                  }}
                >
                  Semua Kategori
                </li>
                {categories.length === 0 ? (
                  <li className="px-4 py-2 text-gray-500">Tidak ada kategori</li>
                ) : (
                  categories.map((cat) => (
                    <li
                      key={cat.id}
                      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                        selectedCategory === cat.name
                          ? "font-semibold text-blue-600"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setCurrentPage(1);
                        setShowCategoryMenu(false);
                      }}
                    >
                      {cat.name}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Book Grid */}
      <div className="px-6 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">
            Memuat data...
          </p>
        ) : books.length > 0 ? (
          books.map((book, index) => (
            <BookCard key={index} book={book} onDetail={handleDetail} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            Tidak ada buku ditemukan.
          </p>
        )}
      </div>

      {/* Pagination */}
      {!isSearching && pagination.total_page > 1 && (
        <div className="flex justify-center px-6">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.total_page}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CariBuku;
