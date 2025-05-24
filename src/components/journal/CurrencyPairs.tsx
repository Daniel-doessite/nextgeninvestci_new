
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, StarIcon, Star, TrendingUp, TrendingDown, ChevronRight } from "lucide-react";

const CurrencyPairs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<'forex' | 'crypto' | 'stocks' | 'commodities'>('forex');
  const [favorites, setFavorites] = useState([
    "EUR/USD", "GBP/JPY", "BTC/USD", "ETH/USD"
  ]);

  const allPairs = {
    forex: [
      { pair: "EUR/USD", price: 1.0876, change: 0.12, volume: "High" },
      { pair: "GBP/JPY", price: 157.45, change: -0.23, volume: "Medium" },
      { pair: "USD/JPY", price: 145.23, change: 0.05, volume: "High" },
      { pair: "GBP/USD", price: 1.2654, change: -0.18, volume: "Medium" },
      { pair: "USD/CAD", price: 1.3582, change: 0.21, volume: "Medium" },
      { pair: "AUD/USD", price: 0.6724, change: 0.09, volume: "Low" },
      { pair: "NZD/USD", price: 0.6152, change: -0.11, volume: "Low" },
      { pair: "USD/CHF", price: 0.8971, change: 0.06, volume: "Medium" },
      { pair: "EUR/GBP", price: 0.8595, change: 0.14, volume: "Medium" }
    ],
    crypto: [
      { pair: "BTC/USD", price: 29845.50, change: 2.35, volume: "High" },
      { pair: "ETH/USD", price: 1875.25, change: 1.87, volume: "High" },
      { pair: "XRP/USD", price: 0.4973, change: -0.62, volume: "Medium" },
      { pair: "SOL/USD", price: 20.15, change: 3.21, volume: "Medium" },
      { pair: "ADA/USD", price: 0.3752, change: 0.85, volume: "Low" },
      { pair: "DOT/USD", price: 5.47, change: 1.12, volume: "Low" }
    ],
    stocks: [
      { pair: "AAPL", price: 187.45, change: 1.25, volume: "High" },
      { pair: "MSFT", price: 325.78, change: 0.89, volume: "High" },
      { pair: "GOOGL", price: 137.25, change: -0.45, volume: "High" },
      { pair: "AMZN", price: 129.87, change: 0.37, volume: "High" },
      { pair: "TSLA", price: 245.98, change: 3.21, volume: "High" }
    ],
    commodities: [
      { pair: "GOLD", price: 1945.70, change: 0.32, volume: "Medium" },
      { pair: "SILVER", price: 23.78, change: 0.45, volume: "Low" },
      { pair: "OIL", price: 78.45, change: -1.23, volume: "Medium" },
      { pair: "NATGAS", price: 2.87, change: -0.78, volume: "Low" }
    ]
  };

  const currentPairs = allPairs[activeTab];
  
  const filteredPairs = currentPairs.filter(item => 
    item.pair.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (pair: string) => {
    if (favorites.includes(pair)) {
      setFavorites(favorites.filter(p => p !== pair));
    } else {
      setFavorites([...favorites, pair]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une paire..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <Button 
            variant={activeTab === 'forex' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setActiveTab('forex')}
          >
            Forex
          </Button>
          <Button 
            variant={activeTab === 'crypto' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setActiveTab('crypto')}
          >
            Crypto
          </Button>
          <Button 
            variant={activeTab === 'stocks' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setActiveTab('stocks')}
          >
            Actions
          </Button>
          <Button 
            variant={activeTab === 'commodities' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setActiveTab('commodities')}
          >
            Matières Premières
          </Button>
        </div>
      </div>

      {favorites.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">Favoris</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((pair) => {
              // Find the pair data across all categories
              let pairData;
              for (const category in allPairs) {
                const found = allPairs[category as keyof typeof allPairs].find(p => p.pair === pair);
                if (found) {
                  pairData = found;
                  break;
                }
              }
              
              if (!pairData) return null;
              
              return (
                <Card key={pair} className="currency-pair active">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{pairData.pair}</h3>
                          <Star 
                            className="h-4 w-4 fill-yellow-400 text-yellow-400 cursor-pointer" 
                            onClick={() => toggleFavorite(pair)}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">Volume: {pairData.volume}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{pairData.price}</p>
                        <div className="flex items-center justify-end gap-1">
                          {pairData.change >= 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          )}
                          <span className={`text-xs ${pairData.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {pairData.change >= 0 ? '+' : ''}{pairData.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium mb-3">Toutes les Paires</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPairs.length > 0 ? (
            filteredPairs.map((item) => (
              <Card key={item.pair} className="currency-pair hover:border-primary transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{item.pair}</h3>
                        {favorites.includes(item.pair) ? (
                          <Star 
                            className="h-4 w-4 fill-yellow-400 text-yellow-400 cursor-pointer" 
                            onClick={() => toggleFavorite(item.pair)}
                          />
                        ) : (
                          <Star 
                            className="h-4 w-4 text-muted-foreground hover:text-yellow-400 cursor-pointer" 
                            onClick={() => toggleFavorite(item.pair)}
                          />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">Volume: {item.volume}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.price}</p>
                      <div className="flex items-center justify-end gap-1">
                        {item.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span className={`text-xs ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {item.change >= 0 ? '+' : ''}{item.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-muted-foreground">
              Aucune paire trouvée pour "{searchTerm}"
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Top Paires en Tendance</h3>
          <div className="space-y-4">
            {[
              { pair: "EUR/USD", direction: "up", strength: "Fort", prediction: "Potentiel de hausse" },
              { pair: "BTC/USD", direction: "up", strength: "Très Fort", prediction: "Breakout potentiel" },
              { pair: "USD/JPY", direction: "down", strength: "Modéré", prediction: "Correction attendue" },
              { pair: "GOLD", direction: "up", strength: "Fort", prediction: "Tendance haussière" },
            ].map((trend, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-none">
                <div className="flex items-center gap-3">
                  {trend.direction === 'up' ? (
                    <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  ) : (
                    <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-2">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium">{trend.pair}</h4>
                    <p className="text-xs text-muted-foreground">Trend: <span className={trend.direction === 'up' ? 'text-green-500' : 'text-red-500'}>{trend.strength}</span></p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm mr-4">{trend.prediction}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyPairs;
