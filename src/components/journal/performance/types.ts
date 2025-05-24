export type PerformanceData = {
  date: string;
  profit: number;
  trades: number;
  winningPairs?: number;
};

export type PairPerformanceData = {
  name: string;
  value: number;
};

export interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export interface PieChartTooltipProps {
  active?: boolean;
  payload?: any[];
}
