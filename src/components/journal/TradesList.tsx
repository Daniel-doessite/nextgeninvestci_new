
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, ChevronDown, Search, FileText } from "lucide-react";

const TradesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample trade data - would be replaced with real data in a production app
  const trades = [
    {
      id: 1,
      pair: "EUR/USD",
      type: "Buy",
      entryPrice: 1.0785,
      exitPrice: 1.0815,
      size: 0.1,
      date: "2023-06-15",
      profit: 30.00,
      status: "Closed"
    },
    {
      id: 2,
      pair: "GBP/JPY",
      type: "Sell",
      entryPrice: 156.75,
      exitPrice: 155.89,
      size: 0.05,
      date: "2023-06-14",
      profit: 45.22,
      status: "Closed"
    },
    {
      id: 3,
      pair: "BTC/USD",
      type: "Buy",
      entryPrice: 28750.50,
      exitPrice: 29125.75,
      size: 0.002,
      date: "2023-06-12",
      profit: 75.25,
      status: "Closed"
    },
    {
      id: 4,
      pair: "USD/CAD",
      type: "Sell",
      entryPrice: 1.3625,
      exitPrice: 1.3690,
      size: 0.1,
      date: "2023-06-10",
      profit: -65.00,
      status: "Closed"
    },
    {
      id: 5,
      pair: "AUD/USD",
      type: "Buy",
      entryPrice: 0.6705,
      entryPrice2: null,
      size: 0.1,
      date: "2023-06-05",
      profit: null,
      status: "Open"
    }
  ];

  const filteredTrades = trades.filter(trade => 
    trade.pair.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Exporter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            Filtrer
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full data-grid">
          <thead>
            <tr>
              <th>Date</th>
              <th>Paire</th>
              <th>Type</th>
              <th>Prix d'entrée</th>
              <th>Prix de sortie</th>
              <th>Taille</th>
              <th>Profit/Perte</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrades.map((trade) => (
              <tr key={trade.id}>
                <td>{trade.date}</td>
                <td>{trade.pair}</td>
                <td>
                  <span className={`px-2 py-1 rounded text-xs ${
                    trade.type === 'Buy' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                  }`}>
                    {trade.type}
                  </span>
                </td>
                <td>{trade.entryPrice}</td>
                <td>{trade.exitPrice || '-'}</td>
                <td>{trade.size}</td>
                <td>
                  {trade.profit !== null ? (
                    <span className={trade.profit >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {trade.profit >= 0 ? '+' : ''}{trade.profit}€
                    </span>
                  ) : '-'}
                </td>
                <td>
                  <span className={`px-2 py-1 rounded text-xs ${
                    trade.status === 'Closed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                  }`}>
                    {trade.status}
                  </span>
                </td>
                <td>
                  <div className="flex space-x-2">
                    <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-muted-foreground hover:text-red-500 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTrades.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Aucune transaction trouvée
        </div>
      )}
    </div>
  );
};

export default TradesList;
