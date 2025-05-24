"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, TrendingUp, PieChart, LineChart, Download, Plus, Save, ArrowRight, AlertTriangle } from "lucide-react";
import TradingViewChart from "./TradingViewChart";
import ProfitsChart from "./performance/ProfitsChart";
import MonthlyBarChart from "./performance/monthlyBarChart";
import ConstancyChart from "./performance/ConstancyChart";
import MetricsCards from "./metrics/MetricsCards";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { performanceData } from "./performance/data";

// Données simulées pour l'exemple
const monthlyPerformance = [
  { month: "Janvier", percentage: 1.99, value: 2.00 },
  { month: "Février", percentage: 5.34, value: 5.34 },
  { month: "Mars", percentage: -1.67, value: -1.68 },
  { month: "Avril", percentage: 8.22, value: 8.20 },
  { month: "Mai", percentage: 11.35, value: 11.20 },
  { month: "Juin", percentage: -0.70, value: -0.70 },
  { month: "Juillet", percentage: 3.90, value: 3.90 },
  { month: "Août", percentage: 7.48, value: 7.48 },
  { month: "Septembre", percentage: 6.26, value: 6.25 },
  { month: "Octobre", percentage: -0.33, value: -0.33 },
  { month: "Novembre", percentage: -2.84, value: -2.85 },
  { month: "Décembre", percentage: 2.69, value: 2.69 }
];

// Métriques
const metrics = [
  {
    name: "Profits/Pertes",
    value: 41.7,
    unit: "%",
    change: 12.3,
    positiveColor: "text-green-500",
    negativeColor: "text-red-500"
  },
  {
    name: "Risk/Reward",
    value: 41.6,
    progressBar: {
      percentage: 76,
      positiveColor: "bg-green-500"
    }
  },
  {
    name: "Ratio moyen",
    value: 5.51,
    additionalInfo: {
      positive: 4.24,
      negative: -0.77
    }
  },
  {
    name: "Win Rate",
    value: 50,
    unit: "%",
    progressBar: {
      percentage: 50,
      positiveColor: "bg-green-500", 
      negativeColor: "bg-red-500"
    },
    additionalInfo: {
      positive: 12,
      negative: 12
    }
  },
  {
    name: "Drawdown",
    value: -3.42,
    additionalInfo: {
      negative: -3.42,
      positive: 96.58
    }
  }
];

// Analyses simulées
const analyses = [
  {
    id: 1,
    title: "Analyse hebdomadaire EUR/USD",
    date: "15/06/2024",
    content: "Support important à 1.0850, résistance à 1.0950. Tendance baissière à court terme.",
    notes: "Surveiller la décision de la BCE jeudi."
  },
  {
    id: 2,
    title: "Analyse mensuelle indices",
    date: "01/06/2024",
    content: "CAC40 en consolidation après la forte hausse du mois dernier.",
    notes: "Attendre la clôture mensuelle pour confirmer."
  }
];

// Erreurs détectées automatiquement
const systemErrors = [
  {
    id: 1,
    date: "12/06/2024",
    type: "Taille de position",
    description: "Position trop importante sur EUR/JPY (5% du capital)",
    impact: "Risque élevé"
  },
  {
    id: 2,
    date: "08/06/2024",
    type: "Drawdown",
    description: "3 pertes consécutives sur la même journée",
    impact: "Moyen"
  },
  {
    id: 3,
    date: "03/06/2024",
    type: "Stop loss",
    description: "Stop loss trop éloigné par rapport à l'objectif de profit",
    impact: "Moyen"
  }
];

// Données d'exemple pour la démonstration (copiées depuis ConstancyChart.tsx)
const demoData = [
  { date: '01/01', value: 0, baseline: 0 },
  { date: '15/01', value: 3.2, drawdown: -0.8, baseline: 0 },
  { date: '01/02', value: 6.4, baseline: 0 },
  { date: '15/02', value: 5.1, drawdown: -1.3, baseline: 0 },
  { date: '01/03', value: 8.2, baseline: 0 },
  { date: '15/03', value: 9.6, baseline: 0 },
  { date: '01/04', value: 8.0, drawdown: -1.6, baseline: 0 },
  { date: '15/04', value: 12.5, baseline: 0 },
  { date: '01/05', value: 16.2, baseline: 0 },
  { date: '15/05', value: 19.8, baseline: 0 },
  { date: '01/06', value: 18.3, drawdown: -1.5, baseline: 0 },
  { date: '15/06', value: 22.6, baseline: 0 },
  { date: '01/07', value: 26.9, baseline: 0 },
  { date: '15/07', value: 31.4, baseline: 0 },
  { date: '01/08', value: 35.8, baseline: 0 },
  { date: '15/08', value: 37.5, baseline: 0 },
  { date: '01/09', value: 35.2, drawdown: -2.3, baseline: 0 },
  { date: '15/09', value: 38.5, baseline: 0 },
  { date: '01/10', value: 41.7, baseline: 0 }
];

const JournalOverview = () => {
  const [newErrorText, setNewErrorText] = useState("");
  const [userErrors, setUserErrors] = useState([
    { id: 1, date: "14/06/2024", description: "Entrée précipitée sans attendre confirmation" },
    { id: 2, date: "05/06/2024", description: "Trading émotionnel après une perte" }
  ]);
  const [newNote, setNewNote] = useState("");
  const [activeAnalysis, setActiveAnalysis] = useState<number | null>(null);
  
  const totalPerformance = monthlyPerformance.reduce((acc, item) => acc + item.percentage, 0);

  const addUserError = () => {
    if (newErrorText.trim()) {
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
      setUserErrors([
        ...userErrors,
        {
          id: userErrors.length + 1,
          date: formattedDate,
          description: newErrorText
        }
      ]);
      setNewErrorText("");
    }
  };

  const saveNote = (analysisId: number) => {
    if (newNote.trim()) {
      // Dans une application réelle, nous enverrions cette note au backend
      console.log(`Note sauvegardée pour l'analyse ${analysisId}: ${newNote}`);
      setNewNote("");
      setActiveAnalysis(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Métriques principales */}
      <MetricsCards metrics={metrics} />

      {/* Pertes maximales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Pertes maximales journalières</div>
          <div className="text-xs">0.00%/1%</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Pertes maximales hebdomadaires</div>
          <div className="text-xs">0.00%/3%</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Pertes maximales mensuelles</div>
          <div className="text-xs">2.69%/10%</div>
        </div>
              </div>

      {/* Onglets */}
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="border-b w-full justify-start rounded-none px-0 bg-transparent space-x-6">
          <TabsTrigger value="dashboard" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
            <BarChart2 className="h-4 w-4 mr-2" />
            Tableau de bord
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
            <LineChart className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="trades" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
            Trades
          </TabsTrigger>
          <TabsTrigger value="analyses" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
            Analyses
          </TabsTrigger>
          <TabsTrigger value="errors" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
            Mes erreurs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          {/* Table des performances mensuelles */}
          <Card className="dark:bg-[#131722] bg-card">
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-gray-800">
                    <th className="py-3 px-4 text-left">Année</th>
                    {monthlyPerformance.map((month) => (
                      <th key={month.month} className="py-3 px-4 text-center">{month.month.substring(0, 3)}</th>
                    ))}
                    <th className="py-3 px-4 text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="dark:hover:bg-gray-900">
                    <td className="py-3 px-4">2024</td>
                    {monthlyPerformance.map((month) => (
                      <td key={month.month} className={`py-3 px-4 text-center ${month.percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {month.percentage.toFixed(2)}%
                        <div className="text-xs">{month.value.toFixed(2)}€</div>
                      </td>
                    ))}
                    <td className={`py-3 px-4 text-center ${totalPerformance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {totalPerformance.toFixed(2)}%
                      <div className="text-xs">41.60€</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
          
          {/* Graphique TradingView (toujours visible) */}
          <Card className="dark:bg-[#131722] bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Graphique TradingView</CardTitle>
          </CardHeader>
          <CardContent>
              <TradingViewChart />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6">
          {/* Graphique d'évolution du capital */}
          <Card className="dark:bg-[#131722] bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Évolution capital</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfitsChart data={performanceData} />
            </CardContent>
          </Card>
          
          {/* Graphique des profits/pertes par mois */}
          <MonthlyBarChart data={monthlyPerformance} />
          
          {/* Graphique de constance */}
          <ConstancyChart title="Constance des performances" data={demoData} />
        </TabsContent>
        
        <TabsContent value="trades">
          <Card>
            <CardContent className="py-4">
              <div className="text-center text-muted-foreground p-4">
                Contenu des trades (en construction)
            </div>
          </CardContent>
        </Card>
        </TabsContent>
        
        <TabsContent value="analyses" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Mes analyses</h3>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle analyse
            </Button>
          </div>
          
          {analyses.map((analysis) => (
            <Card key={analysis.id} className="dark:bg-[#131722] bg-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">{analysis.title}</CardTitle>
                  <Badge variant="outline">{analysis.date}</Badge>
      </div>
          </CardHeader>
          <CardContent>
                <p className="text-sm mb-4">{analysis.content}</p>
                
                <div className="border-t border-border pt-3 mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">Notes</h4>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setActiveAnalysis(activeAnalysis === analysis.id ? null : analysis.id)}
                    >
                      {activeAnalysis === analysis.id ? "Annuler" : "Ajouter une note"}
                    </Button>
                  </div>
                  
                  {analysis.notes && <p className="text-sm text-muted-foreground">{analysis.notes}</p>}
                  
                  {activeAnalysis === analysis.id && (
                    <div className="mt-3 space-y-2">
                      <Textarea 
                        placeholder="Ajouter une note..." 
                        className="min-h-[80px]"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button size="sm" onClick={() => saveNote(analysis.id)}>
                          <Save className="h-4 w-4 mr-2" />
                          Enregistrer
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0 justify-end">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="errors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Erreurs notées par l'utilisateur */}
            <Card className="dark:bg-[#131722] bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Erreurs notées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Décrire une erreur à ne pas répéter..." 
                    value={newErrorText}
                    onChange={(e) => setNewErrorText(e.target.value)}
                  />
                  <Button onClick={addUserError}>Ajouter</Button>
                </div>
                
                <div className="space-y-2 mt-4">
                  {userErrors.map((error) => (
                    <div key={error.id} className="flex items-start p-3 border-b border-border">
                      <ArrowRight className="h-4 w-4 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm">{error.description}</p>
                        <p className="text-xs text-muted-foreground">{error.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Erreurs détectées par le système */}
            <Card className="dark:bg-[#131722] bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Erreurs détectées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {systemErrors.map((error) => (
                    <div key={error.id} className="flex items-start p-3 border-b border-border">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <div className="flex items-center">
                          <p className="text-sm font-medium mr-2">{error.type}</p>
                          <Badge 
                            variant="outline" 
                            className={
                              error.impact === "Élevé" ? "text-red-500 border-red-500" : 
                              error.impact === "Moyen" ? "text-amber-500 border-amber-500" : 
                              "text-blue-500 border-blue-500"
                            }
                          >
                            {error.impact}
                          </Badge>
                        </div>
                        <p className="text-sm">{error.description}</p>
                        <p className="text-xs text-muted-foreground">{error.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JournalOverview;
