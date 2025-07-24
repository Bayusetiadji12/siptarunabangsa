import React, { useEffect, useState, useRef } from "react";
import { getUserProfile, updateUser } from "../../utils/user";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Swal from "sweetalert2";

const ProfilePage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    nis: "",
    phone: "",
    gender: "LAKI_LAKI",
    address: "",
    image: ""
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // Create a ref for the file input
  const fileInputRef = useRef(null);

  // Function to go back to previous page
  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

const fetchProfile = async () => {
  setLoading(true);
  try {
    const res = await getUserProfile();
    console.log("HASIL getUserProfile:", res);
    setUser(res);
    setForm(res);
  } catch (err) {
    console.error("Gagal mengambil profil", err);
  } finally {
    setLoading(false);
  }
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Format tidak didukung!',
          text: 'Format file tidak didukung. Gunakan JPG, PNG, GIF, atau WebP.',
          confirmButtonColor: '#dc2626',
          confirmButtonText: 'OK'
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'File terlalu besar!',
          text: 'Ukuran file terlalu besar. Maksimal 5MB.',
          confirmButtonColor: '#dc2626',
          confirmButtonText: 'OK'
        });
        return;
      }

      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
      setImageError(false);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setForm((prev) => ({ ...prev, image: "" }));
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Function to trigger file input when pencil button is clicked
  const handleEditImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);
  
  try {
    console.log("=== DEBUG INFO ===");
    console.log("USER:", user);
    console.log("FORM:", form);
    console.log("USER ID:", user?.id);
    console.log("SELECTED FILE:", selectedFile);
    console.log("TOKEN:", localStorage.getItem('token')); // Cek token
    
    // Validasi data wajib
    if (!user?.id) {
      throw new Error('User ID tidak ditemukan');
    }
    
    if (!form.name || form.name.trim() === '') {
      throw new Error('Nama tidak boleh kosong');
    }

    // Validasi email
    if (!form.email || form.email.trim() === '') {
      throw new Error('Email tidak boleh kosong');
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      throw new Error('Format email tidak valid');
    }
    
    let updateData;
    let isFormData = false;
    
    if (selectedFile) {
      // Menggunakan FormData untuk upload file
      updateData = new FormData();
      updateData.append('name', form.name);
      updateData.append('email', form.email);
      updateData.append('nis', form.nis || '');
      updateData.append('phone', form.phone || '');
      updateData.append('gender', form.gender);
      updateData.append('address', form.address || '');
      updateData.append('image', selectedFile);
      isFormData = true;
      console.log("USING FORMDATA");
    } else {
      // Menggunakan JSON untuk data biasa
      updateData = {
        name: form.name,
        email: form.email,
        nis: form.nis || '',
        phone: form.phone || '',
        gender: form.gender,
        address: form.address || ''
      };
      
      // Hanya tambahkan image jika ada perubahan
      if (form.image !== user.image) {
        updateData.image = form.image;
      }
      
      console.log("USING JSON");
    }
    
    console.log("UPDATE DATA:", updateData);
    console.log("IS FORM DATA:", isFormData);
    
    const result = await updateUser(user.id, updateData);
    console.log("Update result:", result);
    
    await Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Profil berhasil diperbarui!',
      confirmButtonColor: '#059669',
      confirmButtonText: 'OK',
      timer: 3000,
      timerProgressBar: true,
    });
    
    // Refresh data
    await fetchProfile();
    setSelectedFile(null);
    setPreviewUrl(null);
    
  } catch (err) {
    console.error("=== ERROR DETAILS ===");
    console.error("Error object:", err);
    console.error("Error response:", err.response);
    console.error("Error message:", err.message);
    console.error("Error status:", err.response?.status);
    console.error("Error data:", err.response?.data);
    
    let errorMessage = 'Gagal memperbarui profil. Silakan coba lagi.';
    
    if (err.response?.status === 401) {
      errorMessage = 'Sesi Anda telah berakhir. Silakan login kembali.';
    } else if (err.response?.status === 403) {
      errorMessage = 'Anda tidak memiliki izin untuk mengubah profil ini.';
    } else if (err.response?.status === 422) {
      errorMessage = 'Data yang Anda masukkan tidak valid.';
    } else if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    await Swal.fire({
      icon: 'error',
      title: 'Gagal!',
      text: errorMessage,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'OK'
    });
  } finally {
    setSaving(false);
  }
};

  useEffect(() => {
    fetchProfile();
  }, []);

  // Generate default avatar with user's initial
  const generateDefaultAvatar = (name) => {
    const initial = name ? name.charAt(0).toUpperCase() : 'U';
    const colors = [
      'bg-gradient-to-r from-purple-500 to-pink-500',
      'bg-gradient-to-r from-emerald-500 to-teal-500',
      'bg-gradient-to-r from-blue-500 to-indigo-500',
      'bg-gradient-to-r from-orange-500 to-red-500',
      'bg-gradient-to-r from-green-500 to-emerald-500',
      'bg-gradient-to-r from-cyan-500 to-blue-500'
    ];
    const colorIndex = name ? name.charCodeAt(0) % colors.length : 0;
    
    return (
      <div className={`w-full h-full rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-bold text-4xl`}>
        {initial}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
            <div className="w-16 h-16 border-4 border-transparent border-t-teal-400 rounded-full animate-spin absolute top-2 left-2"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Memuat profil...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center bg-white/80 backdrop-blur-lg hover:bg-white text-gray-700 hover:text-emerald-600 font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Kembali
          </button>
        </div>

        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-8 py-12 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full"></div>
            </div>
            
            {/* Profile Image Section */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative group">
                <div className="w-36 h-36 rounded-full bg-gradient-to-r from-white to-gray-100 p-1 shadow-2xl">
                  {(previewUrl || form.image) ? (
                    <img
                      src={previewUrl || form.image}
                      alt="Foto Profil"
                      className="w-full h-full rounded-full object-cover"
                      onError={handleImageError}
                    />
                  ) : (
                    generateDefaultAvatar(form.name)
                  )}
                </div>
                
                <button
                  onClick={handleEditImageClick}
                  type="button"
                  className="absolute bottom-2 right-2 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg border-2 border-white transform transition-all duration-200 hover:scale-110 group-hover:shadow-xl"
                  title="Ubah Foto"
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              
              {/* Remove image button (show when there's a preview or existing image) */}
              {(previewUrl || form.image) && (
                <button
                  onClick={removeImage}
                  type="button"
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105"
                  title="Hapus Foto"
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Hapus Foto
                </button>
              )}
              
              <h1 className="text-4xl font-bold text-white mt-6 mb-2">
                {form.name || "Nama Pengguna"}
              </h1>
              <p className="text-emerald-100 text-lg">
                {form.email || "email@example.com"}
              </p>
              <p className="text-emerald-100 text-sm mt-1">
                NIS: {form.nis || "Belum diisi"}
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="px-8 py-8">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Informasi Profil</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-emerald-600">
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 hover:border-emerald-300"
                    required
                  />
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-emerald-600">
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="contoh@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 hover:border-emerald-300"
                    required
                  />
                </div>

                {/* NIS */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-emerald-600">
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    NIS
                  </label>
                  <input
                    type="text"
                    name="nis"
                    value={form.nis}
                    onChange={handleChange}
                    placeholder="Nomor Induk Siswa"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 hover:border-emerald-300"
                  />
                </div>

                {/* Password (Display Only) */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value="••••••••••••"
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Password tidak dapat diubah di halaman ini
                  </p>
                </div>

                {/* Phone */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-emerald-600">
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 hover:border-emerald-300"
                  />
                </div>

                {/* Gender */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-emerald-600">
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    Jenis Kelamin
                  </label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 hover:border-emerald-300 cursor-pointer"
                  >
                    <option value="LAKI_LAKI">Laki-laki</option>
                    <option value="PEREMPUAN">Perempuan</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-emerald-600">
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Alamat
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Masukkan alamat lengkap"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 hover:border-emerald-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
                >
                  {saving ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Menyimpan...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Simpan Perubahan
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;