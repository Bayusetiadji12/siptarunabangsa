import axios from "./api/axios.js";

const getAllCategory = async ({ page = 1, limit = 10 }) => {
  const response = await axios.get(`/categorys?page=${page}&limit=${limit}`);
  return response.data.data;
};

const searchCategory = async (keyword) => {
  const response = await axios.get(`/categorys/search?keyword=${keyword}`);
  return response.data.data;
};

// (Jika tersedia di backend)
const getSingleCategory = async (id) => {
  const response = await axios.get(`/categorys/${id}`);
  return response.data;
};

// const insertCategory = async (category) => {
//   if (!_checkInput(category)) return;

//   const { name, image } = category;
//   const formData = new FormData();
//   formData.append("name", name);
//   if (image) formData.append("image", image);

//   try {
//     const res = await axios.post("/categorys", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     if (res.status === 201 || res.status === 200) {
//       swal({
//         title: "Berhasil!",
//         text: "Kategori berhasil ditambahkan.",
//         icon: "success",
//         button: "Ok",
//       }).then(() => (window.location.href = "/admin/kategori"));
//     }
//   } catch (err) {
//     swal({
//       title: "Gagal!",
//       text: err?.response?.data?.message || "Terjadi kesalahan.",
//       icon: "error",
//       button: "Ok",
//     });
//   }
// };

const createCategory = async (data) => {
  const response = await axios.post("/categorys", data); // sesuaikan endpoint API kamu
  return response.data.data;
};

// const updateCategory = async (id, category) => {
//   if (!_checkInput(category)) return;

//   const { name, image } = category;
//   const formData = new FormData();
//   formData.append("name", name);
//   if (image) formData.append("image", image);

//   try {
//     const res = await axios.put(`/categorys/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     if (res.status === 200) {
//       swal({
//         title: "Berhasil!",
//         text: "Kategori berhasil diperbarui.",
//         icon: "success",
//         button: "Ok",
//       }).then(() => (window.location.href = "/admin/kategori"));
//     }
//   } catch (err) {
//     swal({
//       title: "Gagal!",
//       text: err?.response?.data?.message || "Terjadi kesalahan.",
//       icon: "error",
//       button: "Ok",
//     });
//   }
// };

const updateCategory = async (id, data) => {
  const res = await axios.put(`/categorys/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
};

const deleteCategory = async (id) => {
  const res = await axios.delete(`/categorys/${id}`); // Sesuaikan endpoint API
  return res.data.data;
};
// const deleteCategory = async (id) => {
//   try {
//     const res = await axios.delete(`/categorys/${id}`);
//     if (res.status === 200) {
//       swal({
//         title: "Berhasil!",
//         text: "Kategori berhasil dihapus.",
//         icon: "success",
//         button: "Ok",
//       }).then(() => window.location.reload());
//     }
//   } catch (err) {
//     swal({
//       title: "Gagal!",
//       text: err?.response?.data?.message || "Terjadi kesalahan.",
//       icon: "error",
//       button: "Ok",
//     });
//   }
// };

export {
  getAllCategory,
  getSingleCategory,
  // insertCategory,
  createCategory,
  updateCategory,
  searchCategory,
  deleteCategory,
};
