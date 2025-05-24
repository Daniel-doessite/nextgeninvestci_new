import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataPoint {
  date: string;
  value: number;
}

interface PerformanceBarChartProps {
  data: DataPoint[];
  title?: string;
}

// Données d'exemple pour la démonstration
const demoData: DataPoint[] = [
  { date: '01/05', value: 1.2 },
  { date: '02/05', value: 3.8 },
  { date: '04/05', value: -1.5 },
  { date: '05/05', value: 5.6 },
  { date: '07/05', value: 8.2 },
  { date: '08/05', value: -0.7 },
  { date: '10/05', value: 2.3 },
  { date: '13/05', value: 5.1 },
  { date: '14/05', value: 4.2 },
  { date: '16/05', value: -1.3 },
  { date: '19/05', value: -1.8 },
  { date: '20/05', value: 0.0 },
  { date: '22/05', value: 1.7 },
];

// Composant personnalisé pour le tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const isPositive = value >= 0;
    
    return (
      <div className="bg-background/90 backdrop-blur-sm border border-border p-2 rounded shadow-md">
        <p className="font-medium">{label}</p>
        <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{value.toFixed(2)}%
        </p>
      </div>
    );
  }
  return null;
};

const PerformanceBarChart = ({ data = demoData, title = "Performance journalière" }: PerformanceBarChartProps) => {
  // Analyse des données
  const positiveValues = data.filter(item => item.value > 0);
  const negativeValues = data.filter(item => item.value < 0);
  
  const totalPositive = positiveValues.reduce((sum, item) => sum + item.value, 0);
  const totalNegative = negativeValues.reduce((sum, item) => sum + item.value, 0);
  
  const winRate = (positiveValues.length / (data.length - data.filter(item => item.value === 0).length) * 100).toFixed(1);

  return (
    <Card className="dark:bg-[#131722] bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            Win rate: <span className="font-medium text-green-500">{winRate}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" vertical={false} />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                tickFormatter={(value) => `${value > 0 ? '+' : ''}${value}%`}
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="#555" />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                background={{ fill: 'transparent' }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value >= 0 ? '#059669' : '#e11d48'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex justify-between px-2 text-sm">
          <div>
            <span className="text-green-500 font-medium">+{totalPositive.toFixed(2)}%</span>
            <span className="text-muted-foreground ml-1">gains</span>
          </div>
          <div>
            <span className="text-red-500 font-medium">{totalNegative.toFixed(2)}%</span>
            <span className="text-muted-foreground ml-1">pertes</span>
          </div>
          <div>
            <span className="font-medium">{(totalPositive + totalNegative).toFixed(2)}%</span>
            <span className="text-muted-foreground ml-1">total</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceBarChart; 