'use client';

import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import MessageContainer from "@/components/messages/MessageContainer";
import { useAuth } from "@/hooks/useAuth";

export default function MessagesPage() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <MessageContainer 
          currentUserId={user?.id}
          formatDate={(date) => new Date(date).toLocaleString()}
        />
      </main>
      <Footer />
    </div>
  );
} 