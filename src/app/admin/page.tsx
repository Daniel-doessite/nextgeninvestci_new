'use client';
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function AdminPage() {
  // Vérification de l'authentification et des droits d'admin
  const { user, isAdmin } = useAuth();
  
  if (!user || !isAdmin) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Administration</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cartes d'administration */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Utilisateurs</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Gérer les utilisateurs et leurs permissions
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Contenu</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Gérer le contenu et les annonces
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Voir les statistiques d'utilisation
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 