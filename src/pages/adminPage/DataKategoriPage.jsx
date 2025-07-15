// import React, { useEffect, useState } from "react";
// import {
//   getAllCategory,
//   createCategory,
//   deleteCategory,
//   updateCategory,
//   searchCategory,
// } from "../../utils/category";
// import { confirmDelete, showDeleteSuccess } from "../../utils/confirmDelete";
// import AdminLayout from "../../components/adminComponent/AdminLayout";
// import Pagination from "../../components/adminComponent/Pagination";
// import SearchBar from "../../components/adminComponent/SearchBar";

// const DataCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     total_page: 1,
//     total_categories: 0,
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isSearching, setIsSearching] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [newCategory, setNewCategory] = useState("");
//   const [newImage, setNewImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editCategoryId, setEditCategoryId] = useState(null);
//   const itemsPerPage = 10;

//   const fetchCategories = async () => {
//     try {
//       const res = await getAllCategory({ page: currentPage, limit: itemsPerPage });
//       const { data, pagination } = res;
//       setCategories(data);
//       setPagination(pagination);
//     } catch (error) {
//       console.error("Gagal fetch kategori:", error);
//     }
//   };

//   const fetchSearchResult = async () => {
//     if (!searchTerm.trim()) {
//       setIsSearching(false);
//       fetchCategories();
//       return;
//     }

//     try {
//       setIsSearching(true);
//       const res = await searchCategory(searchTerm);
//       setCategories(res);
//       setPagination({ page: 1, total_page: 1, total_categories: res.length });
//     } catch (error) {
//       console.error("Pencarian gagal:", error.message);
//       setCategories([]);
//       setPagination({ page: 1, total_page: 1, total_categories: 0 });
//     }
//   };

//   const handleSubmitCategory = async () => {
//     if (!newCategory.trim()) return;
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("name", newCategory);
//     if (newImage) formData.append("image", newImage);

//     try {
//       if (isEditMode) {
//         await updateCategory(editCategoryId, formData);
//       } else {
//         await createCategory(formData);
//       }

//       await fetchCategories();
//       setShowModal(false);
//       setNewCategory("");
//       setNewImage(null);
//       setIsEditMode(false);
//       setEditCategoryId(null);
//     } catch (error) {
//       console.error("Gagal menyimpan kategori:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const isConfirmed = await confirmDelete("Data kategori yang dihapus tidak dapat dikembalikan!");
//     if (!isConfirmed) return;

//     await deleteCategory(id);

//     if (isSearching) {
//       fetchSearchResult();
//     } else {
//       fetchCategories();
//     }

//     showDeleteSuccess();
//   };

//   useEffect(() => {
//     if (!isSearching) {
//       fetchCategories();
//     }
//   }, [currentPage]);

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       fetchSearchResult();
//     }, 500);
//     return () => clearTimeout(delayDebounce);
//   }, [searchTerm]);

//   return (
//     <AdminLayout>
//       <h2 className="text-2xl font-semibold mb-4">Data Kategori</h2>

//       <div className="flex items-center mb-4">
//         <button className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded" onClick={() => {
//           setShowModal(true);
//           setIsEditMode(false);
//           setNewCategory("");
//           setNewImage(null);
//         }}>
//           + Tambah Data
//         </button>
//         <div className="ml-auto mr-12">
//           <SearchBar
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Cari kategori..."
//           />
//         </div>
//       </div>

//       <div className="w-[1025px] pr-10 overflow-auto">
//         <table className="w-full text-sm bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-gray-200 text-gray-700 font-semibold text-left">
//             <tr>
//               <th className="px-4 py-3">No</th>
//               <th className="px-4 py-3">Kategori</th>
//               <th className="px-4 py-3">Gambar</th>
//               <th className="px-4 py-3 text-center">Aksi</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((category, index) => (
//               <tr
//                 key={category.id}
//                 className={`border-b hover:bg-orange-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
//               >
//                 <td className="px-4 py-2">{(pagination.page - 1) * itemsPerPage + index + 1}</td>
//                 <td className="px-4 py-2">{category.name}</td>
//                 <td className="px-4 py-2">
//                   {category.image && (
//                     <img src={category.image} alt={category.name} className="w-16 h-12 object-cover rounded" />
//                   )}
//                 </td>
//                 <td className="px-4 py-2 text-center">
//                   <button
//                     className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
//                     onClick={() => {
//                       setShowModal(true);
//                       setIsEditMode(true);
//                       setEditCategoryId(category.id);
//                       setNewCategory(category.name);
//                       setNewImage(null);
//                     }}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                     onClick={() => handleDelete(category.id)}
//                   >
//                     Hapus
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {categories.length === 0 && (
//               <tr>
//                 <td colSpan="4" className="text-center py-4 text-gray-500">
//                   Tidak ada kategori ditemukan.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="w-[1025px] pr-10 mt-1 flex items-center justify-between">
//         <p className="text-sm text-gray-500 m-0">
//           Showing {(pagination.page - 1) * itemsPerPage + 1} to { (pagination.page - 1) * itemsPerPage + categories.length } of {pagination.total_categories} entries
//         </p>
//         <div className="flex items-center">
//           {!isSearching && (
//             <Pagination
//               currentPage={pagination.page}
//               totalPages={pagination.total_page}
//               onPageChange={setCurrentPage}
//             />
//           )}
//         </div>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
//             <h3 className="text-xl font-semibold mb-4">
//               {isEditMode ? "Edit Kategori" : "Tambah Kategori"}
//             </h3>
//             <input
//               type="text"
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//               placeholder="Nama kategori"
//               className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setNewImage(e.target.files[0])}
//               className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
//             />
//             <div className="flex justify-end gap-2">
//               <button
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
//                 onClick={() => {
//                   setShowModal(false);
//                   setNewCategory("");
//                   setNewImage(null);
//                   setIsEditMode(false);
//                 }}
//               >
//                 Batal
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
//                 onClick={handleSubmitCategory}
//                 disabled={loading}
//               >
//                 {loading ? "Menyimpan..." : isEditMode ? "Update" : "Simpan"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </AdminLayout>
//   );
// };

// export default DataCategory;

import React, { useEffect, useState } from "react";
import {
  getAllCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  searchCategory,
} from "../../utils/category";
import { confirmDelete, showDeleteSuccess } from "../../utils/confirmDelete";
import { Pencil, Trash2, Plus } from "lucide-react";
import AdminLayout from "../../components/adminComponent/AdminLayout";
import Pagination from "../../components/adminComponent/Pagination";
import SearchBar from "../../components/adminComponent/SearchBar";


const DataCategory = () => {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    total_page: 1,
    total_categories: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const itemsPerPage = 10;

  const fetchCategories = async () => {
    try {
      const res = await getAllCategory({ page: currentPage, limit: itemsPerPage });
      const { data, pagination } = res;
      setCategories(data);
      setPagination(pagination);
    } catch (error) {
      console.error("Gagal fetch kategori:", error);
    }
  };

  const fetchSearchResult = async () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      fetchCategories();
      return;
    }

    try {
      setIsSearching(true);
      const res = await searchCategory(searchTerm);
      setCategories(res);
      setPagination({ page: 1, total_page: 1, total_categories: res.length });
    } catch (error) {
      console.error("Pencarian gagal:", error.message);
      setCategories([]);
      setPagination({ page: 1, total_page: 1, total_categories: 0 });
    }
  };

  const handleSubmitCategory = async () => {
    if (!newCategory.trim()) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("name", newCategory);
    if (newImage) formData.append("image", newImage);

    try {
      if (isEditMode) {
        await updateCategory(editCategoryId, formData);
      } else {
        await createCategory(formData);
      }

      await fetchCategories();
      setShowModal(false);
      setNewCategory("");
      setNewImage(null);
      setIsEditMode(false);
      setEditCategoryId(null);
    } catch (error) {
      console.error("Gagal menyimpan kategori:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = await confirmDelete("Data kategori yang dihapus tidak dapat dikembalikan!");
    if (!isConfirmed) return;

    await deleteCategory(id);

    if (isSearching) {
      fetchSearchResult();
    } else {
      fetchCategories();
    }

    showDeleteSuccess();
  };

  useEffect(() => {
    if (!isSearching) {
      fetchCategories();
    }
  }, [currentPage]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSearchResult();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-4">Data Kategori</h2>

      <div className="flex items-center mb-4">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded"
          onClick={() => {
            setShowModal(true);
            setIsEditMode(false);
            setNewCategory("");
            setNewImage(null);
          }}
        >
          <Plus size={18} /> Tambah Data
        </button>

        <div className="ml-auto mr-12">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari kategori..."
          />
        </div>
      </div>


      <div className="w-[1025px] pr-10 overflow-auto">
        <table className="w-full text-sm bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700 font-semibold text-left">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Gambar</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category.id}
                className={`border-b hover:bg-orange-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="px-4 py-2">{(pagination.page - 1) * itemsPerPage + index + 1}</td>
                <td className="px-4 py-2">{category.name}</td>
                <td className="px-4 py-2">
                  {category.image && (
                    <img src={category.image} alt={category.name} className="w-16 h-12 object-cover rounded" />
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-yellow-500 text-white p-2 rounded mr-2 hover:bg-yellow-600"
                    onClick={() => {
                      setShowModal(true);
                      setIsEditMode(true);
                      setEditCategoryId(category.id);
                      setNewCategory(category.name);
                      setNewImage(null);
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 size={16} />
                  </button>

                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Tidak ada kategori ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="w-[1025px] pr-10 mt-1 flex items-center justify-between">
        <p className="text-sm text-gray-500 m-0">
          Showing {(pagination.page - 1) * itemsPerPage + 1} to {(pagination.page - 1) * itemsPerPage + categories.length} of {pagination.total_categories} entries
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
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              {isEditMode ? "Edit Kategori" : "Tambah Kategori"}
            </h3>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nama kategori"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded"
                onClick={() => {
                  setShowModal(false);
                  setNewCategory("");
                  setNewImage(null);
                  setIsEditMode(false);
                }}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded disabled:opacity-50"
                onClick={handleSubmitCategory}
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

export default DataCategory;
