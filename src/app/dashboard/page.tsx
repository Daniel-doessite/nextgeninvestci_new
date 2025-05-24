import React from "react";

export default function Dashboard() {
  // Simulation des infos utilisateur
  const user = {
    email: "hisakamashinagata20@gmail.com",
    name: "Hisakami Shinagata",
    balance: 12500.75,
    lastActivities: [
      { date: "2024-06-10", action: "Achat BTC", amount: 0.05, asset: "BTC" },
      { date: "2024-06-09", action: "Vente ETH", amount: 1.2, asset: "ETH" },
      { date: "2024-06-08", action: "Dépôt", amount: 5000, asset: "USD" },
    ],
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 12 }}>
      <h1>Bienvenue, {user.name} !</h1>
      <p>Email : <b>{user.email}</b></p>
      <h2>Solde du portefeuille</h2>
      <div style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        {user.balance.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
      </div>
      <h2>Dernières activités</h2>
      <ul>
        {user.lastActivities.map((act, idx) => (
          <li key={idx}>
            {act.date} : {act.action} {act.amount} {act.asset}
          </li>
        ))}
      </ul>
    </div>
  );
} 