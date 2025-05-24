"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// SubscriptionPage component definition
export default function SubscriptionPage() {
  // State to manage subscription status and trial period
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [trialActive, setTrialActive] = useState(true); // Assume trial is active for first-time users

  // Function to handle subscription activation
  const handleSubscribe: React.MouseEventHandler = (e) => {
    alert("Abonnement activé avec succès !");
    setIsSubscribed(true);
    setTrialActive(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Abonnement</h1>
      {isSubscribed ? (
        <p className="text-green-600">Vous êtes abonné ! Merci de votre confiance.</p>
      ) : trialActive ? (
        <div>
          <p className="mb-4">Vous êtes en période d'essai gratuite ! Voulez-vous vous abonner maintenant ?</p>
          <button
            onClick={handleSubscribe}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            S'abonner maintenant
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4">Votre période d'essai est terminée. Abonnez-vous pour continuer.</p>
          <button
            onClick={handleSubscribe}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            S'abonner
          </button>
        </div>
      )}
      <div className="mt-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}