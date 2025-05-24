import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface MetricData {
  name: string;
  value: number | string;
  unit?: string;
  change?: number;
  positiveColor?: string;
  negativeColor?: string;
  additionalInfo?: {
    positive?: number | string;
    negative?: number | string;
  };
  progressBar?: {
    percentage: number;
    positiveColor?: string;
    negativeColor?: string;
  }
}

interface MetricsCardsProps {
  metrics: MetricData[];
}

const MetricsCards = ({ metrics }: MetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      {metrics.map((metric, index) => (
        <Card key={index} className="dark:bg-[#131722] bg-card">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">{metric.name}</div>
            <div className={`text-2xl font-bold ${
              typeof metric.value === 'number' && metric.value > 0 
                ? metric.positiveColor || 'text-green-500' 
                : typeof metric.value === 'number' && metric.value < 0 
                  ? metric.negativeColor || 'text-red-500' 
                  : ''
            }`}>
              {typeof metric.value === 'number' ? metric.value.toFixed(2) : metric.value}
              {metric.unit && <span className="text-sm ml-1">{metric.unit}</span>}
            </div>
            
            {metric.change !== undefined && (
              <div className="flex items-center">
                <TrendingUp className={`h-3 w-3 mr-1 ${metric.change > 0 ? 'text-green-500' : 'text-red-500'}`} />
                <span className={`text-xs ${metric.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}% cette semaine
                </span>
              </div>
            )}
            
            {metric.progressBar && (
              <div className="w-full bg-gray-800 h-1 mt-2">
                <div 
                  className={metric.progressBar.percentage >= 50 
                    ? (metric.progressBar.positiveColor || 'bg-green-500') 
                    : (metric.progressBar.negativeColor || 'bg-red-500')
                  } 
                  style={{ width: `${metric.progressBar.percentage}%`, height: '4px' }}
                ></div>
              </div>
            )}
            
            {metric.additionalInfo && (
              <div className="flex justify-between text-xs mt-1">
                {metric.additionalInfo.positive !== undefined && (
                  <span className="text-green-500">{metric.additionalInfo.positive}</span>
                )}
                {metric.additionalInfo.negative !== undefined && (
                  <span className="text-red-500">{metric.additionalInfo.negative}</span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards; 