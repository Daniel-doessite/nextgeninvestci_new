
import { Card, CardContent } from "@/components/ui/card";

const StatisticsCard = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Statistiques Clés</h3>
        <div className="space-y-3">
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Profit Moyen</span>
            <span className="font-medium text-green-500">+87.5€</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Perte Moyenne</span>
            <span className="font-medium text-red-500">-36.4€</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Plus Grand Profit</span>
            <span className="font-medium text-green-500">+350.75€</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Plus Grande Perte</span>
            <span className="font-medium text-red-500">-120.30€</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Trades par Jour (Moy.)</span>
            <span className="font-medium">2.6</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Durée Moyenne de Trade</span>
            <span className="font-medium">3h 45min</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
