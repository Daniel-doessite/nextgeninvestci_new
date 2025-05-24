import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Eye, EyeOff, BarChart, PieChart, LineChart } from "lucide-react";

const MetricsCards = () => {
  const [showTotalProfit, setShowTotalProfit] = useState(true);
  const [showWinningTrades, setShowWinningTrades] = useState(true);
  const [showBestPair, setShowBestPair] = useState(true);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="dark:bg-[#131722] bg-background border dark:border-gray-800 border-gray-200 text-foreground">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-muted-foreground text-sm font-medium">Bénéfice/Perte totale</h3>
            <button 
              onClick={() => setShowTotalProfit(!showTotalProfit)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showTotalProfit ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          
          {showTotalProfit ? (
            <>
              <div className="flex items-center">
                <span className="text-3xl font-bold">+1 245,65 €</span>
        </div>
        <div className="flex items-center mt-1 text-green-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+12,3% cette semaine</span>
              </div>
            </>
          ) : (
            <div className="h-[60px] flex items-center justify-center">
              <span className="text-muted-foreground">Contenu masqué</span>
        </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="dark:bg-[#131722] bg-background border dark:border-gray-800 border-gray-200 text-foreground">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-muted-foreground text-sm font-medium">Métiers gagnants</h3>
            <button 
              onClick={() => setShowWinningTrades(!showWinningTrades)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showWinningTrades ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          
          {showWinningTrades ? (
            <>
              <div className="flex items-center">
                <span className="text-3xl font-bold">24/36</span>
        </div>
        <div className="flex items-center mt-1 text-green-500">
                <span>Taux de réussite : 66,7 %</span>
              </div>
            </>
          ) : (
            <div className="h-[60px] flex items-center justify-center">
              <span className="text-muted-foreground">Contenu masqué</span>
        </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="dark:bg-[#131722] bg-background border dark:border-gray-800 border-gray-200 text-foreground">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-muted-foreground text-sm font-medium">Meilleure paire</h3>
            <button 
              onClick={() => setShowBestPair(!showBestPair)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showBestPair ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          
          {showBestPair ? (
            <>
              <div className="flex items-center">
                <span className="text-3xl font-bold">EUR/USD</span>
        </div>
        <div className="flex items-center mt-1 text-green-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+3,2% de rendement</span>
              </div>
            </>
          ) : (
            <div className="h-[60px] flex items-center justify-center">
              <span className="text-muted-foreground">Contenu masqué</span>
        </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
