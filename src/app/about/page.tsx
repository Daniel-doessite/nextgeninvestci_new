import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">À propos de NextGenInvest CI</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            NextGenInvest CI est une plateforme innovante dédiée aux investisseurs ivoiriens,
            offrant des outils et des ressources pour améliorer vos compétences en trading.
          </p>
          <p className="text-lg mb-4">
            Notre mission est de démocratiser l'accès aux marchés financiers en Côte d'Ivoire
            et de fournir une formation de qualité aux traders débutants et expérimentés.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
} 