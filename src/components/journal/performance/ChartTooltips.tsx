import { useState, useEffect } from 'react';
import { CustomTooltipProps, PieChartTooltipProps } from "./types";

export const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
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

  const isDarkTheme = systemTheme === 'dark';

  if (active && payload && payload.length) {
    return (
      <div className={`${isDarkTheme ? 'bg-[#1e2130]' : 'bg-white'} p-3 border ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'} rounded shadow-sm`}>
        <p className="text-sm font-medium text-foreground">{`${label}`}</p>
        {payload[0] && payload[0].dataKey === "profit" && 
        <p className="text-sm text-blue-500">{`Profit: ${payload[0].value}€`}</p>
        }
        {payload[0] && payload[0].dataKey === "winningPairs" && 
          <p className="text-sm text-green-500">{`Paires Gagnantes: ${payload[0].value}`}</p>
        }
        {payload[1] && payload[1].dataKey === "profit" && 
          <p className="text-sm text-blue-500">{`Profit: ${payload[1].value}€`}</p>
        }
        {payload[1] && payload[1].dataKey === "winningPairs" && 
          <p className="text-sm text-green-500">{`Paires Gagnantes: ${payload[1].value}`}</p>
        }
        {payload.find(p => p.dataKey === "trades") && 
          <p className="text-sm text-muted-foreground">{`Trades: ${payload.find(p => p.dataKey === "trades").value}`}</p>
        }
      </div>
    );
  }

  return null;
};

export const PieChartTooltip = ({ active, payload }: PieChartTooltipProps) => {
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

  const isDarkTheme = systemTheme === 'dark';

  if (active && payload && payload.length) {
    return (
      <div className={`${isDarkTheme ? 'bg-[#1e2130]' : 'bg-white'} p-3 border ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'} rounded shadow-sm`}>
        <p className="text-sm font-medium text-foreground">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }

  return null;
};
