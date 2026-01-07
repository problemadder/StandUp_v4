import React from 'react';
import MonthlySessionsChart from "@/components/MonthlySessionsChart";
import { CombinedMonthlySessionsData } from "@/hooks/use-session-manager"; // Import the new interface

interface YearlyChartsProps {
  combinedMonthlySessions: CombinedMonthlySessionsData[]; // New prop for combined data
}

const YearlyCharts: React.FC<YearlyChartsProps> = ({ combinedMonthlySessions }) => {
  return (
    <div className="w-full"> {/* Removed grid, now single chart */}
      <MonthlySessionsChart data={combinedMonthlySessions} title="Sitzungen pro Monat" />
    </div>
  );
};

export default YearlyCharts;