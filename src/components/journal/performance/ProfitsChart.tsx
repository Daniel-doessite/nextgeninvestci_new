import { useState, useEffect } from 'react';
import { 
  ComposedChart,
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Area
} from 'recharts';
import { CustomTooltip } from './ChartTooltips';
import { PerformanceData } from './types';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, Calendar, Clock } from "lucide-react";

interface ProfitsChartProps {
  data: PerformanceData[];
}

type TimeFrame = "day" | "week" | "month" | "year" | "all";

const ProfitsChart = ({ data }: ProfitsChartProps) => {
  const [showProfits, setShowProfits] = useState(true);
  const [showWinningPairs, setShowWinningPairs] = useState(false);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("month");
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  // Observer pour détecter les changements de thème
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setSystemTheme(isDark ? 'dark' : 'light');
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  // Force le thème sombre pour correspondre à la photo
  const isDarkTheme = true; 

  // Filtrer les données en fonction de la période sélectionnée
  const getFilteredData = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() retourne 0-11
    const currentYear = currentDate.getFullYear();
    
    // Détermine la date limite en fonction de la période choisie
    let limitDate: Date;
    switch (timeFrame) {
      case "day":
        limitDate = new Date();
        limitDate.setDate(currentDate.getDate() - 1);
        break;
      case "week":
        limitDate = new Date();
        limitDate.setDate(currentDate.getDate() - 7);
        break;
      case "month":
        limitDate = new Date();
        limitDate.setMonth(currentDate.getMonth() - 1);
        break;
      case "year":
        limitDate = new Date();
        limitDate.setFullYear(currentDate.getFullYear() - 1);
        break;
      default:
        // Pour "all", on retourne toutes les données
        return data;
    }
    
    // Filtre les données en fonction de la date limite
    // Ici on assume que les dates sont au format "DD/MM" et que l'année est implicite (l'année en cours)
    return data.filter(item => {
      const [day, month] = item.date.split('/').map(Number);
      const itemDate = new Date(currentYear, month - 1, day);
      return itemDate >= limitDate;
    });
  };

  const filteredData = getFilteredData();

  const getTimeLabel = () => {
    switch (timeFrame) {
      case "day": return "24 dernières heures";
      case "week": return "7 derniers jours";
      case "month": return "30 derniers jours";
      case "year": return "12 derniers mois";
      default: return "Toutes les données";
    }
  };

  // Détermine les ticks de l'axe Y en fonction des données filtrées
  const getYAxisTicks = () => {
    if (filteredData.length === 0) return [-40, 0, 40, 80];
    
    const minProfit = Math.min(...filteredData.map(item => item.profit));
    const maxProfit = Math.max(...filteredData.map(item => item.profit));
    
    // Arrondir à la quarantaine inférieure/supérieure pour avoir moins de ticks
    const minTick = Math.floor(minProfit / 40) * 40;
    const maxTick = Math.ceil(maxProfit / 40) * 40;
    
    // Créer un tableau de ticks avec un pas de 40 au lieu de 20
    const ticks = [];
    for (let i = minTick; i <= maxTick; i += 40) {
      ticks.push(i);
    }
    
    return ticks;
  };

  const yAxisTicks = getYAxisTicks();
  const yAxisDomain = [
    Math.min(...yAxisTicks), 
    Math.max(...yAxisTicks)
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="show-profits" 
              checked={showProfits} 
              onCheckedChange={setShowProfits}
            />
            <Label htmlFor="show-profits">Afficher Bénéfices/Pertes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch 
              id="show-pairs" 
              checked={showWinningPairs} 
              onCheckedChange={setShowWinningPairs}
            />
            <Label htmlFor="show-pairs">Afficher Paires Gagnantes</Label>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={timeFrame} onValueChange={(value) => setTimeFrame(value as TimeFrame)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>24 dernières heures</span>
                </div>
              </SelectItem>
              <SelectItem value="week">
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  <span>7 derniers jours</span>
                </div>
              </SelectItem>
              <SelectItem value="month">
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  <span>30 derniers jours</span>
                </div>
              </SelectItem>
              <SelectItem value="year">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>12 derniers mois</span>
                </div>
              </SelectItem>
              <SelectItem value="all">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Tout l'historique</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">{getTimeLabel()}</span>
        </div>
      </div>

      <div className="bg-[#131722] rounded-lg p-3 border border-gray-800">
        {filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-[450px] text-muted-foreground">
            Aucune donnée disponible pour cette période
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={450}>
            <ComposedChart
              data={filteredData}
              margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
      >
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#1e2130"
                vertical={true}
                horizontal={true}
              />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                dy={10}
                interval={timeFrame === "day" ? 0 : timeFrame === "week" ? 0 : 2}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                dx={-10}
                domain={yAxisDomain}
                ticks={yAxisTicks}
                width={40}
                tickFormatter={(value) => `${value}`}
              />
              <ReferenceLine y={0} stroke="#2d3748" />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ stroke: '#4a5568', strokeWidth: 1, strokeDasharray: '5 5' }}
              />
              
              {showProfits && (
                <>
                  <Area
                    type="monotone" 
                    dataKey="profit"
                    fill="url(#colorProfit)"
                    stroke="none"
                    isAnimationActive={false}
                    connectNulls={true}
                  />
        <Line 
          type="monotone" 
          dataKey="profit" 
          name="Profit (€)" 
          stroke="#3b82f6" 
                    dot={false}
                    strokeWidth={1.5}
                    isAnimationActive={false}
                    connectNulls={true}
        />
                </>
              )}
              
              {showWinningPairs && (
                <Line 
                  type="monotone" 
                  dataKey="winningPairs" 
                  name="Paires Gagnantes" 
                  stroke="#10b981" 
                  strokeWidth={1}
                  dot={false}
                  strokeDasharray="5 5"
                  isAnimationActive={false}
                />
              )}
            </ComposedChart>
    </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ProfitsChart;
