
import ChartTabs from "./performance/ChartTabs";
import SummaryCards from "./performance/SummaryCards";
import StatisticsCard from "./performance/StatisticsCard";
import DailyPerformanceCard from "./performance/DailyPerformanceCard";
import { performanceData, pairPerformanceData } from "./performance/data";

const PerformanceMetrics = () => {
  return (
    <div className="space-y-6">
      <SummaryCards />
      
      <div className="w-full">
        <ChartTabs 
          performanceData={performanceData}
          pairPerformanceData={pairPerformanceData}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatisticsCard />
        <DailyPerformanceCard />
      </div>
    </div>
  );
};

export default PerformanceMetrics;
