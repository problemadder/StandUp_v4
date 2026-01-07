import React, { useState } from "react";
import Timer from "@/components/Timer";
import RewardDisplay from "@/components/RewardDisplay";
import Stats from "@/components/Stats";
import CsvButtons from "@/components/CsvButtons";
import YearlyCharts from "@/components/YearlyCharts";
import ResetButton from "@/components/ResetButton";
import { useSessionManager, Session } from "@/hooks/use-session-manager";
import { getRandomReward, Reward } from "@/lib/rewards-data";

const Index = () => {
  const {
    sessions,
    completedSessionsToday,
    addSession,
    setSessions,
    isLoadingHolidays,
    sessionsPerWeek,
    sessionsPerMonth,
    sessionsPerYear,
    monthlySessionsCurrentYear,
    monthlySessionsPreviousYear,
    averageSessionsPerDay,
    activeDays, // Get activeDays from hook
    setActiveDays, // Get setActiveDays from hook
  } = useSessionManager();
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);

  const handleSessionComplete = () => {
    const newReward = getRandomReward(currentReward || undefined);
    addSession(newReward);
    setCurrentReward(newReward);
  };

  const handleImportedData = (importedData: { sessions: Session[], activeDays: string[] }) => {
    // Filter out duplicate sessions based on ID (if any)
    const combinedSessions = [...importedData.sessions, ...sessions.filter(
      existSess => !importedData.sessions.some(impSess => impSess.id === existSess.id)
    )];
    setSessions(combinedSessions);

    // Combine and unique active days
    const combinedActiveDays = Array.from(new Set([...activeDays, ...importedData.activeDays])).sort();
    setActiveDays(combinedActiveDays);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 sm:p-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center text-primary">
        StehAuf! Büro-Challenge
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl mb-8">
        <Timer onSessionComplete={handleSessionComplete} />
        <div className="flex flex-col space-y-8">
          <Stats
            completedSessionsToday={completedSessionsToday}
            isLoadingHolidays={isLoadingHolidays}
            sessionsPerWeek={sessionsPerWeek}
            sessionsPerMonth={sessionsPerMonth}
            sessionsPerYear={sessionsPerYear}
            averageSessionsPerDay={averageSessionsPerDay}
          />
          <RewardDisplay reward={currentReward} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full max-w-5xl mb-8">
        <CsvButtons 
          sessions={sessions} 
          activeDays={activeDays} // Pass activeDays
          onImport={handleImportedData} // Updated handler
        />
      </div>

      <div className="w-full max-w-5xl mb-8">
        <YearlyCharts 
          currentYearData={monthlySessionsCurrentYear} 
          previousYearData={monthlySessionsPreviousYear} 
        />
      </div>

      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-center gap-4">
        <ResetButton />
      </div>
    </div>
  );
};

export default Index;