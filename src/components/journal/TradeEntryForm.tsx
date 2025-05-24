
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface TradeEntryFormProps {
  onSubmit: () => void;
}

const TradeEntryForm = ({ onSubmit }: TradeEntryFormProps) => {
  const { toast } = useToast();
  const [entryType, setEntryType] = useState<"manual" | "import">("manual");

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the form submission logic
    
    toast({
      title: "Transaction ajoutée",
      description: "Votre transaction a été enregistrée avec succès.",
    });
    
    onSubmit();
  };

  return (
    <div>
      <Tabs value={entryType} onValueChange={(v) => setEntryType(v as "manual" | "import")}>
        <TabsList className="mb-4">
          <TabsTrigger value="manual">Entrée Manuelle</TabsTrigger>
          <TabsTrigger value="import">Importer depuis TradingView</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual">
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="pair">
                  Paire de Devises
                </label>
                <Input id="pair" placeholder="Ex: EUR/USD" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="type">
                  Type d'ordre
                </label>
                <select 
                  id="type"
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                >
                  <option value="">Sélectionner</option>
                  <option value="buy">Achat (Long)</option>
                  <option value="sell">Vente (Short)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="entryPrice">
                  Prix d'entrée
                </label>
                <Input id="entryPrice" type="number" step="0.0001" placeholder="0.0000" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="exitPrice">
                  Prix de sortie
                </label>
                <Input id="exitPrice" type="number" step="0.0001" placeholder="0.0000" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="size">
                  Taille (Lots)
                </label>
                <Input id="size" type="number" step="0.01" placeholder="0.01" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="date">
                  Date de l'ordre
                </label>
                <Input id="date" type="date" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="sl">
                  Stop Loss
                </label>
                <Input id="sl" type="number" step="0.0001" placeholder="0.0000" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="tp">
                  Take Profit
                </label>
                <Input id="tp" type="number" step="0.0001" placeholder="0.0000" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="notes">
                Notes / Analyse
              </label>
              <textarea
                id="notes"
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Vos notes sur cette transaction..."
              ></textarea>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onSubmit}>
                Annuler
              </Button>
              <Button type="submit">
                Enregistrer
              </Button>
            </div>
          </form>
        </TabsContent>
        
        <TabsContent value="import">
          <div className="space-y-4">
            <div className="border border-dashed border-border rounded-lg p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Importer depuis TradingView</h3>
              <p className="text-muted-foreground mb-4">
                Glissez-déposez votre fichier d'export TradingView ou cliquez pour choisir un fichier
              </p>
              <Input type="file" className="hidden" id="tradingview-import" />
              <Button variant="outline" onClick={() => document.getElementById("tradingview-import")?.click()}>
                Choisir un fichier
              </Button>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onSubmit}>
                Annuler
              </Button>
              <Button type="button" disabled>
                Importer
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradeEntryForm;
