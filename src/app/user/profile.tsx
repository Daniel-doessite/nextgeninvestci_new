import { useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "/default-avatar.png",
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Logic to upload the file
      alert("Photo de profil mise à jour !");
    }
  };

  const handlePasswordChange = () => {
    // Logic to verify OTP and change password
    alert("Mot de passe changé avec succès !");
  };

  return (
    <div>
      <h1>Mon Profil</h1>
      <img src={user.profilePicture} alt="Profile" width={100} height={100} />
      <input type="file" onChange={handleFileUpload} />
      <div>
        <label>Nom</label>
        <input type="text" value={user.name} readOnly />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={user.email} readOnly />
      </div>
      <button onClick={handlePasswordChange}>Changer de mot de passe</button>
    </div>
  );
}
