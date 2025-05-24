import { useState } from "react";

export default function Register() {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!otpSent) {
        // Logic to send OTP
        await new Promise((res) => setTimeout(res, 1000));
        setOtpSent(true);
        alert("OTP envoyé à votre email !");
      } else {
        // Logic to verify OTP and complete registration
        await new Promise((res) => setTimeout(res, 1000));
        window.location.href = "/welcome";
      }
    } catch (err) {
      setError("Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {/* ...existing code for email, password, etc... */}
      {otpSent && (
        <div>
          <label>Code OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
      )}
      <button type="submit" disabled={loading}>
        {loading ? "Chargement..." : otpSent ? "Valider OTP" : "S'inscrire"}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}
