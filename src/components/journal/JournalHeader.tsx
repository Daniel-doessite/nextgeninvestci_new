
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface JournalHeaderProps {
  showEntryForm: boolean;
  setShowEntryForm: (show: boolean) => void;
}

const JournalHeader = ({ showEntryForm, setShowEntryForm }: JournalHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Journal de Trading</h1>
        <p className="text-muted-foreground mt-2">Suivez vos performances et améliorez votre trading</p>
      </div>
      <Button 
        className="flex items-center gap-2" 
        onClick={() => setShowEntryForm(!showEntryForm)}
      >
        <PlusCircle className="h-4 w-4" />
        {showEntryForm ? "Fermer" : "Nouvelle Entrée"}
      </Button>
    </div>
  );
};

export default JournalHeader;
