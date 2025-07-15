import axios from "./api/axios.js";

// const getAllBorrows = async () => {
//   const response = await axios.get("/borrows");
//   return response.data.data;
// };

const getAllBorrows = async ({ page = 1, limit = 10 }) => {
  const response = await axios.get(`/borrows?page=${page}&limit=${limit}`);
  return response.data.data;
};

const searchBorrow = async (keyword, field = "user") => {
    const response = await axios.get(`/borrows/search`, {
        params: { keyword, field },
    });
    return response.data.data;
};

const createBorrow = async (data) => {
  const response = await axios.post("/borrows", data);
  return response.data.data;
};

const returnBorrow = async (id, data) => {
    const response = await axios.put(`/borrows/${id}/return`, data);
    return response.data.data;
};

const getUserBorrows = async () => {
  const response = await axios.get("/borrows/user");
  return response.data.data;
};

const deleteBorrow = async (id) => {
  const response = await axios.delete(`/borrows/${id}`);
  return response.data.data;
};

export {
  getAllBorrows,
  searchBorrow,
  createBorrow,
  returnBorrow,
  getUserBorrows,
  deleteBorrow,
}