import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DataPoint {
  date: string;
  value: number;
  drawdown?: number;
  baseline?: number;
}

interface ConstancyChartProps {
  data: DataPoint[];
  title?: string;
}

// Données d'exemple pour la démonstration
const demoData: DataPoint[] = [
  { date: '01/01', value: 0, baseline: 0 },
  { date: '15/01', value: 3.2, drawdown: -0.8, baseline: 0 },
  { date: '01/02', value: 6.4, baseline: 0 },
  { date: '15/02', value: 5.1, drawdown: -1.3, baseline: 0 },
  { date: '01/03', value: 8.2, baseline: 0 },
  { date: '15/03', value: 9.6, baseline: 0 },
  { date: '01/04', value: 8.0, drawdown: -1.6, baseline: 0 },
  { date: '15/04', value: 12.5, baseline: 0 },
  { date: '01/05', value: 16.2, baseline: 0 },
  { date: '15/05', value: 19.8, baseline: 0 },
  { date: '01/06', value: 18.3, drawdown: -1.5, baseline: 0 },
  { date: '15/06', value: 22.6, baseline: 0 },
  { date: '01/07', value: 26.9, baseline: 0 },
  { date: '15/07', value: 31.4, baseline: 0 },
  { date: '01/08', value: 35.8, baseline: 0 },
  { date: '15/08', value: 37.5, baseline: 0 },
  { date: '01/09', value: 35.2, drawdown: -2.3, baseline: 0 },
  { date: '15/09', value: 38.5, baseline: 0 },
  { date: '01/10', value: 41.7, baseline: 0 }
];

// Composant personnalisé pour le tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    let valueChange = 0;
    let color = "text-gray-500";
    
    if (payload.length > 1) {
      const currentValue = data.value;
      const previousIndex = demoData.findIndex(item => item.date === label) - 1;
      
      if (previousIndex >= 0) {
        const previousValue = demoData[previousIndex].value;
        valueChange = currentValue - previousValue;
        
        if (valueChange > 0) {
          color = "text-green-500";
        } else if (valueChange < 0) {
          color = "text-red-500";
        }
      }
    }
    
    return (
      <div className="bg-background/90 backdrop-blur-sm border border-border p-3 rounded shadow-md">
        <p className="font-medium mb-1">{data.date}</p>
        <p className="text-sm">
          Valeur: <span className="font-medium">{data.value.toFixed(2)}%</span>
        </p>
        {valueChange !== 0 && (
          <p className={`text-sm ${color}`}>
            {valueChange > 0 ? '+' : ''}{valueChange.toFixed(2)}%
          </p>
        )}
        {data.drawdown && (
          <p className="text-sm text-red-500">
            Drawdown: {data.drawdown.toFixed(2)}%
          </p>
        )}
      </div>
    );
  }
  return null;
};

const ConstancyChart = ({ data = demoData, title = "Évolution de la constance" }: ConstancyChartProps) => {
  // Analyse des données pour obtenir des statistiques
  const latestValue = data[data.length - 1].value;
  const drawdowns = data.filter(item => item.drawdown).map(item => item.drawdown || 0);
  const maxDrawdown = drawdowns.length > 0 ? Math.min(...drawdowns) : 0;
  
  // Calculer le degré de constance (ratio entre la performance finale et les drawdowns)
  const constancyScore = Math.abs(latestValue / maxDrawdown).toFixed(1);
  
  // Déterminer la qualité de la constance
  let constancyQuality = "Moyenne";
  let constancyColor = "bg-amber-500";
  
  if (Number(constancyScore) > 10) {
    constancyQuality = "Excellente";
    constancyColor = "bg-green-500";
  } else if (Number(constancyScore) > 5) {
    constancyQuality = "Bonne";
    constancyColor = "bg-emerald-500";
  } else if (Number(constancyScore) < 3) {
    constancyQuality = "Faible";
    constancyColor = "bg-red-500";
  }

  return (
    <Card className="dark:bg-[#131722] bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Score: {constancyScore}</Badge>
            <div className={`h-2 w-2 rounded-full ${constancyColor}`}></div>
            <span className="text-sm">{constancyQuality}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" vertical={false} />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                tickMargin={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 'dataMax + 5']}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="#555" />
              
              {/* Afficher les drawdowns comme des zones rouges */}
              {data
                .filter(point => point.drawdown)
                .map((point, index) => {
                  const pointIndex = data.findIndex(d => d.date === point.date);
                  if (pointIndex > 0) {
                    return (
                      <ReferenceLine
                        key={`dd-${index}`}
                        x={point.date}
                        stroke="#ef4444"
                        strokeDasharray="3 3"
                        strokeWidth={1.5}
                      />
                    );
                  }
                  return null;
                })}
              
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#10B981" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: '#131722' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex space-x-4 text-sm text-muted-foreground px-2">
          <div>
            <span className="inline-block h-3 w-3 bg-green-500 opacity-20 mr-2 rounded"></span>
            Zone de progression
          </div>
          <div>
            <span className="inline-block h-3 w-3 rounded mr-2 border border-red-500"></span>
            Points de drawdown
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConstancyChart; 