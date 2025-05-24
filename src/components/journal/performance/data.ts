import { PerformanceData, PairPerformanceData } from "./types";

// Génère des données correspondant exactement au graphique de la seconde photo
const generateMarketData = (): PerformanceData[] => {
  // Points extraits de la seconde photo avec plus de précision
  const points = [
    { x: 1, y: 15 },
    { x: 2, y: 28 },
    { x: 3, y: 20 },
    { x: 4, y: 5 },
    { x: 5, y: -10 },
    { x: 6, y: -30 },
    { x: 7, y: -38 },
    { x: 8, y: -25 },
    { x: 9, y: -15 },
    { x: 10, y: 10 },
    { x: 11, y: 30 },
    { x: 12, y: 40 },
    { x: 13, y: 30 },
    { x: 14, y: 10 },
    { x: 15, y: -20 },
    { x: 16, y: -38 },
    { x: 17, y: -25 },
    { x: 18, y: -10 },
    { x: 19, y: 15 },
    { x: 20, y: 42 },
    { x: 21, y: 65 },
    { x: 22, y: 80 },
    { x: 23, y: 75 },
    { x: 24, y: 60 },
    { x: 25, y: 45 },
    { x: 26, y: 30 },
    { x: 27, y: 20 },
    { x: 28, y: 25 },
    { x: 29, y: 40 },
    { x: 30, y: 55 },
    { x: 31, y: 60 },
    { x: 32, y: 50 },
    { x: 33, y: 35 },
    { x: 34, y: 25 },
    { x: 35, y: 15 },
    { x: 36, y: 0 },
    { x: 37, y: -20 },
    { x: 38, y: -25 },
    { x: 39, y: -15 },
    { x: 40, y: 0 },
    { x: 41, y: 10 },
    { x: 42, y: 25 },
    { x: 43, y: 40 },
    { x: 44, y: 55 },
    { x: 45, y: 65 },
    { x: 46, y: 60 },
    { x: 47, y: 55 },
    { x: 48, y: 58 },
  ];

  // Convertir les points en données formatées avec moins de points pour l'affichage
  // On garde un point tous les 2 pour que la courbe soit plus lisible
  return points.filter((_, index) => index % 1 === 0).map(point => {
    // Pour l'axe X, on utilise des dates qui correspondent aux jours du mois
    const dayNumber = Math.ceil(point.x / 2);
    const formattedDay = (dayNumber % 31 || 31).toString().padStart(2, '0');
    const month = '05';
    
    return {
      date: `${formattedDay}/${month}`,
      profit: point.y,
      trades: Math.max(1, Math.round(Math.random() * 3 + 1)),
      winningPairs: Math.max(0, Math.round(Math.abs(point.y) / 30))
    };
  });
};

export const performanceData: PerformanceData[] = generateMarketData();

export const pairPerformanceData: PairPerformanceData[] = [
  { name: 'EUR/USD', value: 35 },
  { name: 'GBP/JPY', value: 25 },
  { name: 'BTC/USD', value: 15 },
  { name: 'USD/CAD', value: 15 },
  { name: 'AUD/USD', value: 10 },
];

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];
