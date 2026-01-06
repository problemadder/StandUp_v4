import React from 'react';
import MonthlySessionsChart from "@/components/MonthlySessionsChart";
import { MonthlySessionsData } from "@/hooks/use-session-manager";

interface YearlyChartsProps {
  currentYearData: MonthlySessionsData[];
  previousYearData: MonthlySessionsData[];
}

const YearlyCharts: React.FC<YearlyChartsProps> = ({ currentYearData, previousYearData }) => {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      <MonthlySessionsChart data={currentYearData} title={`Pro Monat (${currentYear})`} />
      <MonthlySessionsChart data={previousYearData} title={`Pro Monat (${previousYear})`} />
    </div>
  );
};

export default YearlyCharts;