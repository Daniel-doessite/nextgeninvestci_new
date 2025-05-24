import { useState } from "react";
import { useRouter } from "next/router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Création de l'utilisateur dans Supabase
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
      },
      body: JSON.stringify({
        email,
        password,
        options: {
          data: {
            username,
            age,
            // La photo sera gérée séparément
          }
        }
      })
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error.message || "Erreur lors de l'inscription.");
    } else {
      setSuccess("Inscription réussie ! Vérifiez votre email pour valider votre compte.");
      setTimeout(() => router.push("/auth/signin"), 2000);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h1>Inscription</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Mot de passe</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="username">Pseudo</label>
          <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="age">Âge</label>
          <input id="age" type="number" value={age} onChange={e => setAge(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="photo">Photo de profil (optionnel)</label>
          <input id="photo" type="file" accept="image/*" onChange={e => setPhoto(e.target.files?.[0] || null)} style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem", background: "green", color: "white", border: "none", cursor: "pointer" }}>S'inscrire</button>
      </form>
    </div>
  );
} 