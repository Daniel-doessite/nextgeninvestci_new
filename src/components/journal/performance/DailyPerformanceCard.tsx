
import { Card, CardContent } from "@/components/ui/card";

const DailyPerformanceCard = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Performance par Jour</h3>
        <div className="grid grid-cols-7 gap-2 text-center">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-sm text-muted-foreground mb-2">{day}</div>
              <div className={`w-full py-2 rounded-md text-sm font-medium ${
                i === 2 || i === 4 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 
                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              }`}>
                {i === 2 ? '-45€' : i === 4 ? '-30€' : `+${(Math.random() * 100 + 20).toFixed(0)}€`}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {i === 5 || i === 6 ? '0' : `${Math.floor(Math.random() * 5 + 1)}`} trades
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3">Meilleur jour: <span className="text-green-500">Jeudi (+180€)</span></h4>
          <h4 className="text-sm font-medium">Pire jour: <span className="text-red-500">Mercredi (-45€)</span></h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyPerformanceCard;
