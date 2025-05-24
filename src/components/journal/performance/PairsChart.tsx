
import { 
  PieChart,
  Pie,
  Cell,
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { PieChartTooltip } from './ChartTooltips';
import { PairPerformanceData } from './types';

interface PairsChartProps {
  data: PairPerformanceData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

const PairsChart = ({ data, colors = COLORS }: PairsChartProps & { colors?: string[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<PieChartTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="flex flex-col justify-center">
        <h3 className="text-lg font-medium mb-4">Performance par Paire</h3>
        <div className="space-y-4">
          {data.map((pair, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }}></div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span>{pair.name}</span>
                  <span>{pair.value}%</span>
                </div>
                <div className="w-full bg-muted h-1.5 rounded-full mt-1">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${pair.value}%`, 
                      backgroundColor: colors[index % colors.length] 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PairsChart;
