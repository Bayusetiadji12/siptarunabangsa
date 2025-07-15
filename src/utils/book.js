import axios from "./api/axios.js";

// const getAllBooks = async ({ page = 1, limit = 10 }) => {
//   const response = await axios.get(`/books?page=${page}&limit=${limit}`);
//   return response.data.data;
// };

const getAllBooks = async (params = { page: 1, limit: 12 }) => {
  const response = await axios.get("/books", {
    params: {
      page: params.page,
      limit: params.limit,
    },
  });
  return response.data.data;
};

const getDetailBook = async (id) => {
  const response = await axios.get(`/books/${id}`);
  return response.data.data;
};


const createBook = async (data) => {
  const response = await axios.post("/books", data);
  return response.data.data;
};

// const searchBook = async (keyword) => {
//   const response = await axios.get(`/books/search?keyword=${keyword}`);
//   return response.data.data;
// };

// const searchBook = async (keyword, category = "") => {
//   const response = await axios.get(`/books/search`, {
//     params: {
//       keyword,
//       category,
//     },
//   });
//   return response.data.data;
// };

const searchBook = async (keyword, field = "title", category = "") => {
  const response = await axios.get(`/books/search`, {
    params: {
      keyword,
      field,
      category,
    },
  });
  return response.data.data;
};

// const searchBook = async ({ query, field, category }) => {
//   const params = {
//     query,
//     field,
//   };
//   if (category) {
//     params.category = category;
//   }

//   const res = await axios.get("/books/search", { params });
//   return res.data; // pastikan backend mengembalikan array buku
// };

const updateBook = async (id, data) => {
  const response = await axios.put(`/books/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

const getBooksByCategory = async (categoryName, page = 1, limit = 12) => {
  const response = await axios.get(`/books/category/${categoryName}?page=${page}&limit=${limit}`);
  return response.data.data;
};  

const deleteBook = async (id) => {
  const response = await axios.delete(`/books/${id}`);
  return response.data.data;
};

export {
  getAllBooks,
  getDetailBook,
  createBook,
  searchBook,
  updateBook,
  getBooksByCategory,
  deleteBook
}