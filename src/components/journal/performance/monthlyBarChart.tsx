import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MonthlyData {
  month: string;
  percentage: number;
  value: number;
}

interface MonthlyBarChartProps {
  data: MonthlyData[];
}

// Composant personnalisé pour le tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/80 backdrop-blur-sm border border-border p-2 rounded shadow-md">
        <p className="font-medium">{data.month}</p>
        <p className={`text-sm ${data.percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {data.percentage.toFixed(2)}%
        </p>
        <p className="text-xs text-muted-foreground">
          {data.value.toFixed(2)}€
        </p>
      </div>
    );
  }
  return null;
};

const MonthlyBarChart = ({ data }: MonthlyBarChartProps) => {
  // Calculer la valeur minimale et maximale pour le domaine Y
  const maxValue = Math.max(...data.map(item => item.percentage)) * 1.1;
  const minValue = Math.min(...data.map(item => item.percentage)) * 1.1;
  const yDomain = [Math.min(minValue, -1), Math.max(maxValue, 1)]; // Assurer un minimum visible

  return (
    <Card className="dark:bg-[#131722] bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Profits/Pertes par mois</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e2130"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                tickFormatter={(value) => value.substring(0, 3)}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                tickFormatter={(value) => `${value}%`}
                domain={yDomain}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="#555" />
              <Bar
                dataKey="percentage"
                radius={[4, 4, 0, 0]}
                fill="#10b981"
                barSize={30}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.percentage >= 0 ? '#10b981' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyBarChart; 