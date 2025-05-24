import { useState } from "react";
import { TrendingUp, BarChart3, PieChart, Eye, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SummaryCards = () => {
  const [showPerformance, setShowPerformance] = useState(true);
  const [showRatio, setShowRatio] = useState(true);
  const [showSuccessRate, setShowSuccessRate] = useState(true);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="dark:bg-[#131722] bg-background border dark:border-gray-800 border-gray-200 text-foreground">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-muted-foreground text-sm font-medium">Performance Totale</h3>
            <button 
              onClick={() => setShowPerformance(!showPerformance)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showPerformance ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          
          {showPerformance ? (
            <>
              <div className="flex items-center">
                <span className="text-3xl font-bold text-green-500">+1 050 €</span>
              </div>
              <div className="text-muted-foreground text-sm mt-1">
                <span>Au cours des 30 derniers jours</span>
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
            <h3 className="text-muted-foreground text-sm font-medium">Rapport Gain/Perte</h3>
            <button 
              onClick={() => setShowRatio(!showRatio)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showRatio ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          
          {showRatio ? (
            <>
              <div className="flex items-center">
                <span className="text-3xl font-bold">2.4</span>
              </div>
              <div className="text-muted-foreground text-sm mt-1">
                <span>Pour chaque € perdu, vous gagnez 2,4€</span>
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
            <h3 className="text-muted-foreground text-sm font-medium">Taux de Réussite</h3>
            <button 
              onClick={() => setShowSuccessRate(!showSuccessRate)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showSuccessRate ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          
          {showSuccessRate ? (
            <>
              <div className="flex items-center">
                <span className="text-3xl font-bold">67%</span>
              </div>
              <div className="text-muted-foreground text-sm mt-1">
                <span>24 métiers gagnants sur 36</span>
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

export default SummaryCards;
