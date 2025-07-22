import React, { useState } from "react";
import Timer from "@/components/Timer";
import RewardDisplay from "@/components/RewardDisplay";
import Stats from "@/components/Stats";
import CsvButtons from "@/components/CsvButtons";
import MonthlySessionsChart from "@/components/MonthlySessionsChart";
import ResetButton from "@/components/ResetButton";
import { useSessionManager, Session } from "@/hooks/use-session-manager";
import { getRandomReward, Reward } from "@/lib/rewards-data"; // This import will change later

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
    monthlySessions,
    averageSessionsPerDay,
  } = useSessionManager();
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);

  const handleSessionComplete = () => {
    // This will be updated to use useRewardManager later
    const newReward = getRandomReward(currentReward || undefined);
    addSession(newReward);
    setCurrentReward(newReward);
  };

  const handleImportedSessions = (importedSessions: Session[]) => {
    const combinedSessions = [...sessions, ...importedSessions.filter(
      impSess => !sessions.some(existSess => existSess.id === impSess.id)
    )];
    setSessions(combinedSessions);
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

      {/* Bestehende CSV-Buttons für Session-Daten */}
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full max-w-5xl mb-8">
        <CsvButtons sessions={sessions} onImport={handleImportedSessions} />
      </div>

      {/* Monatschart */}
      <div className="w-full max-w-5xl mb-8">
        <MonthlySessionsChart data={monthlySessions} />
      </div>

      {/* Reset-Button (und später die neuen Reward-CSV-Buttons) */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* RewardCsvButtons werden hier hinzugefügt */}
        <ResetButton />
      </div>
    </div>
  );
};

export default Index;