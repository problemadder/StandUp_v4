import React, { useState, useRef } from "react";
import Timer from "@/components/Timer";
import RewardDisplay from "@/components/RewardDisplay";
import Stats from "@/components/Stats";
import YearlyCharts from "@/components/YearlyCharts";
import ResetButton from "@/components/ResetButton";
import HomeofficeButton from "@/components/HomeofficeButton";
import { useSessionManager, Session } from "@/hooks/use-session-manager";
import { getRandomReward, Reward } from "@/lib/rewards-data";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { exportAllDataToCsv, importAllDataFromCsv } from "@/lib/csv-utils";

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
    combinedMonthlySessions,
    averageSessionsPerDay,
    averageSessionsPerMonth,
    averageSessionsPerWeek,
    activeDays,
    setActiveDays,
    homeofficeDays,
    markHomeofficeDay,
    bestDaySessions,
    bestMonthSessions,
    bestWeekSessions,
    bestYearSessions,
  } = useSessionManager();
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSessionComplete = () => {
    const newReward = getRandomReward(currentReward || undefined);
    addSession(newReward);
    setCurrentReward(newReward);
  };

  const handleImportedData = (importedData: { sessions: Session[], activeDays: string[], homeofficeDays: string[] }) => {
    // Filter out duplicate sessions based on date, time, and reward content
    const combinedSessions = [...importedData.sessions, ...sessions.filter(
      existSess => !importedData.sessions.some(impSess => 
        impSess.date === existSess.date && 
        impSess.time === existSess.time && 
        JSON.stringify(impSess.reward) === JSON.stringify(existSess.reward)
      )
    )];
    setSessions(combinedSessions);

    // Combine and unique active days
    const combinedActiveDays = Array.from(new Set([...activeDays, ...importedData.activeDays])).sort();
    setActiveDays(combinedActiveDays);

    // Combine and unique homeoffice days
    importedData.homeofficeDays.forEach(day => markHomeofficeDay(day)); 
  };

  // CSV export/import logic moved here from CsvButtons.tsx
  const handleExport = () => {
    exportAllDataToCsv({ sessions, activeDays, homeofficeDays });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvString = e.target?.result as string;
        try {
          const importedData = importAllDataFromCsv(csvString);
          handleImportedData(importedData);
          alert("Daten erfolgreich importiert!");
        } catch (error) {
          console.error("Fehler beim Importieren der CSV-Datei:", error);
          alert("Fehler beim Importieren der Daten. Bitte überprüfen Sie das Dateiformat.");
        }
      };
      reader.readAsText(file);
    }
  };

  const bonusSessionCompleted = completedSessionsToday >= 5;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 sm:p-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center text-primary">
        {bonusSessionCompleted ? "Maschine!" : "StehAuf! Büro-Challenge"}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl mb-8">
        <Timer onSessionComplete={handleSessionComplete} />
        <div className="flex flex-col space-y-8">
          {/* Pass all relevant props to Stats component */}
          <Stats
            completedSessionsToday={completedSessionsToday}
            isLoadingHolidays={isLoadingHolidays}
            sessionsPerWeek={sessionsPerWeek}
            sessionsPerMonth={sessionsPerMonth}
            sessionsPerYear={sessionsPerYear}
            averageSessionsPerDay={averageSessionsPerDay}
            averageSessionsPerMonth={averageSessionsPerMonth}
            averageSessionsPerWeek={averageSessionsPerWeek}
            homeofficeDays={homeofficeDays}
            bestDaySessions={bestDaySessions}
            bestMonthSessions={bestMonthSessions}
            bestWeekSessions={bestWeekSessions}
            bestYearSessions={bestYearSessions}
          />
          <RewardDisplay reward={currentReward} />
        </div>
      </div>

      <div className="w-full max-w-5xl mb-8">
        <YearlyCharts 
          combinedMonthlySessions={combinedMonthlySessions}
        />
      </div>

      {/* New layout for all four buttons in a responsive grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <Button onClick={handleExport} className="w-full px-4 py-3 text-lg bg-primary text-primary-foreground hover:bg-primary/90">
          <Download className="mr-2 h-5 w-5" /> Export CSV
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv"
          className="hidden"
        />
        <Button onClick={handleImportClick} variant="outline" className="w-full px-4 py-3 text-lg border-secondary text-secondary hover:bg-secondary/10">
          <Upload className="mr-2 h-5 w-5" /> Import CSV
        </Button>
        <HomeofficeButton onMarkHomeoffice={markHomeofficeDay} />
        <ResetButton />
      </div>
    </div>
  );
};

export default Index;