  import axios from "./api/axios.js";
  import swal from "sweetalert";

  //Register User
  const registerUser = async (userData) => {
    const response = await axios.post("/auth/register", userData);
    return response.data.data;
  };

  const loginUser = async (email, password) => {
    const response = await axios.post("/auth/login", {
      email,
      password,
    });
    return response.data.data;
  };

  //Get Profile
  const getUserProfile = async () => {
    const response = await axios.get("/users/me");
    return response.data.data;
  };

  //Logout
  // const logoutUser = async () => {
  //   try {
  //     await axios.delete("/users/logout");
  //     localStorage.removeItem("token");
  //     swal("Logout", "Berhasil keluar", "success").then(() => {
  //       window.location.href = "/login";
  //     });
  //   } catch (err) {
  //     swal("Gagal", "Gagal logout", "error");
  //   }
  // };

const logoutUser = () => {
  localStorage.removeItem("token"); // Hapus token dari localStorage
};

const getAllUsers = async (params = { page: 1, limit: 10 }) => {
  const response = await axios.get("/users", {
    params: {
      page: params.page,
      limit: params.limit,
    },
  });
  return response.data.data;
};

// const updateUser = async (id, data) => {
//   const formData = new FormData();

//   // Tambahkan data satu per satu ke FormData
//   for (const key in data) {
//     if (data[key] !== undefined && data[key] !== null) {
//       formData.append(key, data[key]);
//     }
//   }

//   const res = await axios.put(`/users/${id}`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return res.data.data;
// };


const updateUser = async (id, data) => {
  const res = await axios.put(`/users/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
};

  //Update User (send FormData)
  // const updateUser = async (userId, user) => {
  //   const formData = new FormData();
  //   for (const key in user) {
  //     formData.append(key, user[key]);
  //   }

  //   try {
  //     const res = await axios.put(`/users/${userId}`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     return res.data;
  //   } catch (err) {
  //     swal("Gagal", err?.response?.data?.message || "Terjadi kesalahan", "error");
  //   }
  // };

  //Delete User (admin)
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`);
      swal("Berhasil", "Pengguna berhasil dihapus", "success").then(() => {
        window.location.reload();
      });
    } catch (err) {
      swal("Gagal", err?.response?.data?.message || "Terjadi kesalahan", "error");
    }
  };

  //Search User
const searchUser = async (keyword) => {
  const response = await axios.get(`/users/search?keyword=${keyword}`);
  return response.data.data;
};

  export {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
    getAllUsers,
    updateUser,
    deleteUser,
    searchUser,
  };
