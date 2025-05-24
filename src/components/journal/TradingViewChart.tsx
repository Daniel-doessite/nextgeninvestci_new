'use client';
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Camera } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TradingViewChartProps {
  symbol?: string;
  interval?: string;
  theme?: "light" | "dark";
}

const TradingViewChart = ({ 
  symbol: initialSymbol = "FOREXCOM:EURUSD", 
  interval = "D", 
  theme: propTheme 
}: TradingViewChartProps) => {
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
  const activeTheme = propTheme || systemTheme;
  const containerRef = useRef<HTMLDivElement>(null);
  const [symbol, setSymbol] = useState(initialSymbol);
  const [inputSymbol, setInputSymbol] = useState(initialSymbol);
  const [error, setError] = useState<string | null>(null);
  const [showChart, setShowChart] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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

  const loadChart = (chartSymbol: string) => {
    if (!containerRef.current) return;
    
    setIsLoading(true);
    
    // Clear any errors
    setError(null);
    
    // Nettoyer les scripts précédents
    const existingScript = containerRef.current.querySelector('script');
    if (existingScript) {
      existingScript.remove();
    }

    // Vider le conteneur
    containerRef.current.innerHTML = '';

    try {
      // Créer un nouveau script pour TradingView
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": chartSymbol,
        "interval": interval,
        "timezone": "Europe/Paris",
        "theme": activeTheme,
        "style": "1",
        "locale": "fr",
        "enable_publishing": false,
        "hide_top_toolbar": false,
        "hide_legend": false,
        "save_image": true,
        "calendar": false,
        "hide_volume": false,
        "support_host": "https://www.tradingview.com",
        "width": "100%",
        "height": "100%",
        "toolbar_bg": activeTheme === "dark" ? "#131722" : "#f5f5f5",
        "allow_symbol_change": true,
        "studies": ["RSI@tv-basicstudies", "MACD@tv-basicstudies"],
        "show_popup_button": true,
        "popup_width": "1000",
        "popup_height": "650",
        "drawings_access": {
          "type": "all",
          "tools": ["all"]
        }
      });

      // Ajouter le widget au conteneur
      if (containerRef.current) {
        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'tradingview-widget-container';
        
        const widgetDiv = document.createElement('div');
        widgetDiv.className = 'tradingview-widget-container__widget';
        widgetDiv.style.height = '100%';
        widgetDiv.style.width = '100%';
        
        widgetContainer.appendChild(widgetDiv);
        widgetContainer.appendChild(script);
        
        containerRef.current.appendChild(widgetContainer);
        
        // Événement pour détecter quand le widget est chargé
        script.onload = () => {
          setIsLoading(false);
        };
      }
    } catch (error) {
      console.error('Erreur lors du chargement du graphique:', error);
      setError('Impossible de charger le graphique. Veuillez vérifier le symbole et réessayer.');
      setIsLoading(false);
    }
  };

  const handleSymbolChange = () => {
    if (!inputSymbol.trim()) {
      setError('Veuillez entrer un symbole valide');
      return;
    }
    setSymbol(inputSymbol);
    loadChart(inputSymbol);
  };

  useEffect(() => {
    loadChart(symbol);
    
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [interval, activeTheme]);

  const captureScreenshot = () => {
    // Trouver le bouton d'export d'image dans l'iframe de TradingView
    const frames = containerRef.current?.querySelectorAll('iframe');
    if (frames && frames.length > 0) {
      // Note: Cette méthode est un moyen de contournement et peut ne pas fonctionner dans tous les cas
      // à cause des restrictions de sécurité cross-origin
      try {
        const frame = frames[0];
        const exportButton = frame.contentDocument?.querySelector('[data-name="save-load-chart-image"]');
        if (exportButton) {
          (exportButton as HTMLElement).click();
        } else {
          alert('Utilisez les outils de TradingView pour capturer l\'écran (bouton appareil photo dans la barre d\'outils)');
        }
      } catch (e) {
        alert('Pour des raisons de sécurité, utilisez les outils de TradingView pour capturer l\'écran');
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Input 
          value={inputSymbol} 
          onChange={(e) => setInputSymbol(e.target.value)} 
          placeholder="FOREXCOM:EURUSD"
          className="max-w-xs"
        />
        <Button onClick={handleSymbolChange}>Charger</Button>
        </div>
        <Button 
          variant="outline" 
          onClick={captureScreenshot}
          title="Capturer le graphique"
        >
          <Camera className="h-4 w-4 mr-2" />
          Capturer
        </Button>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className={`w-full h-[450px] rounded-lg overflow-hidden relative ${activeTheme === "dark" ? "bg-[#131722]" : "bg-white"} border ${activeTheme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
        {isLoading && (
          <div className={`absolute inset-0 flex items-center justify-center ${activeTheme === "dark" ? "bg-[#131722]" : "bg-white"} z-20`}>
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className={activeTheme === "dark" ? "text-gray-300" : "text-gray-700"}>Chargement du graphique...</p>
            </div>
          </div>
        )}
        <div 
          ref={containerRef} 
          className="w-full h-full"
          style={{ 
            visibility: isLoading ? 'hidden' : 'visible' 
          }}
        >
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Graphique TradingView en temps réel. Utilisez les outils intégrés pour l'analyse technique, le dessin et la capture d'écran.
      </p>
    </div>
  );
};

export default TradingViewChart;
