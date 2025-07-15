import { useEffect, useState } from "react";
import { getUserProfile } from "../../utils/user.js";

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserProfile().then(setUser);
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <h2 className="text-xl font-bold mb-4">Profil Pengguna</h2>
      {user ? (
        <div>
          <p><strong>Nama:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>NIS:</strong> {user.nis}</p>
          <p><strong>Telepon:</strong> {user.phone}</p>
          <p><strong>Alamat:</strong> {user.address}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
        </div>
      ) : (
        <p>Memuat data...</p>
      )}
    </div>
  );
}

export default UserProfile;
