import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Cette rubrique est en développement</h2>
          <p className="text-lg text-muted-foreground">En attendant, profitez de NextGen Invest !</p>
        </div>
      </main>
      <Footer />
    </div>
  );
} 