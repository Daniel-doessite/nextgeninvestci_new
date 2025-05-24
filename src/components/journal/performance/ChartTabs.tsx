
import { LineChart, BarChart3, PieChart } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfitsChart from "./ProfitsChart";
import PairsChart from "./PairsChart";
import ConsistencyChart from "./ConsistencyChart";
import { PerformanceData, PairPerformanceData } from "./types";

interface ChartTabsProps {
  performanceData: PerformanceData[];
  pairPerformanceData: PairPerformanceData[];
}

const ChartTabs = ({ performanceData, pairPerformanceData }: ChartTabsProps) => {
  return (
    <Tabs defaultValue="profits" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="profits" className="flex items-center gap-2">
          <LineChart className="h-4 w-4" />
          Profits
        </TabsTrigger>
        <TabsTrigger value="pairs" className="flex items-center gap-2">
          <PieChart className="h-4 w-4" />
          Paires
        </TabsTrigger>
        <TabsTrigger value="consistency" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Constance
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="profits" className="h-[500px] w-full">
        <ProfitsChart data={performanceData} />
      </TabsContent>
      
      <TabsContent value="pairs" className="h-[500px] w-full">
        <PairsChart data={pairPerformanceData} />
      </TabsContent>
      
      <TabsContent value="consistency" className="h-[500px] w-full">
        <ConsistencyChart data={performanceData} />
      </TabsContent>
    </Tabs>
  );
};

export default ChartTabs;
