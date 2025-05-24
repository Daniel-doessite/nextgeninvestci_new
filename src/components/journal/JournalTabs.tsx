
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import JournalOverview from "./JournalOverview";
import TradesList from "./TradesList";
import PerformanceMetrics from "./PerformanceMetrics";
import CurrencyPairs from "./CurrencyPairs";

const JournalTabs = () => {
  return (
    <Tabs defaultValue="overview" className="mb-8">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Aperçu</TabsTrigger>
        <TabsTrigger value="trades">Transactions</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="pairs">Paires de Devises</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="animate-fade-in">
        <JournalOverview />
      </TabsContent>
      
      <TabsContent value="trades" className="animate-fade-in">
        <Card>
          <CardHeader>
            <CardTitle>Historique des Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <TradesList />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="performance" className="animate-fade-in">
        <Card>
          <CardHeader>
            <CardTitle>Métriques de Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceMetrics />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="pairs" className="animate-fade-in">
        <Card>
          <CardHeader>
            <CardTitle>Paires de Devises</CardTitle>
          </CardHeader>
          <CardContent>
            <CurrencyPairs />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default JournalTabs;
