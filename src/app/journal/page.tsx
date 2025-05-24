import { Metadata } from "next";
import JournalClientPage from "@/components/journal/JournalClientPage";

export const metadata: Metadata = {
  title: "Journal de Trading",
  description: "Journal de trading pour suivre vos performances",
};

export const dynamic = 'force-dynamic';

export default function JournalPage() {
  return <JournalClientPage />;
} 