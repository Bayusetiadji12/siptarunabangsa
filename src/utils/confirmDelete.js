import Swal from "sweetalert2";

export const confirmDelete = async (message = "Data ini akan dihapus dan tidak bisa dikembalikan!") => {
  const result = await Swal.fire({
    title: "Yakin ingin menghapus?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  });

  return result.isConfirmed;
};

export const showDeleteSuccess = () => {
  Swal.fire({
    title: "Terhapus!",
    text: "Data berhasil dihapus.",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });
};
