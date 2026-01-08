import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface StatsProps {
  completedSessionsToday: number;
  isLoadingHolidays: boolean;
  sessionsPerWeek: number;
  sessionsPerMonth: number;
  sessionsPerYear: number;
  averageSessionsPerDay: number;
  averageSessionsPerMonth: number;
  averageSessionsPerWeek: number;
  homeofficeDays: string[];
  bestDaySessions: number;
  bestMonthSessions: number;
  bestWeekSessions: number;
  bestYearSessions: number; // Re-added prop
}

const Stats: React.FC<StatsProps> = ({
  completedSessionsToday,
  isLoadingHolidays,
  sessionsPerWeek,
  sessionsPerMonth,
  sessionsPerYear,
  averageSessionsPerDay,
  averageSessionsPerMonth,
  averageSessionsPerWeek,
  homeofficeDays,
  bestDaySessions,
  bestMonthSessions,
  bestWeekSessions,
  bestYearSessions, // Destructure re-added prop
}) => {
  const goalMet = completedSessionsToday >= 4;
  const bonusSessionCompleted = completedSessionsToday >= 5;

  const today = new Date().toISOString().split('T')[0];
  const isTodayHomeoffice = homeofficeDays.includes(today);

  return (
    <Card className="w-full">
      <CardHeader>
        {/* <CardTitle>Statistiken</CardTitle> */}
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-lg font-medium">Heute:</p>
          {isTodayHomeoffice ? (
            <p className="text-2xl font-bold text-muted-foreground">Homeoffice</p>
          ) : (
            <p className={`text-2xl font-bold ${goalMet ? "text-primary" : "text-secondary"}`}>
              {completedSessionsToday}/4
              {bonusSessionCompleted && <span className="text-sm text-muted-foreground ml-2">(Bonus!)</span>}
            </p>
          )}
        </div>

        {/* Aktuelle Zahlen (ehemals Absolut) */}
        <div className="pt-4 border-t border-muted-foreground/20">
          <p className="text-xl font-semibold mb-4 text-center">Aktuell:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-medium">Woche:</p>
              <p className="text-2xl font-bold text-primary">{sessionsPerWeek}</p>
            </div>
            <div>
              <p className="text-lg font-medium">Monat:</p>
              <p className="text-2xl font-bold text-primary">{sessionsPerMonth}</p>
            </div>
            <div>
              <p className="text-lg font-medium">Jahr:</p>
              <p className="text-2xl font-bold text-primary">{sessionsPerYear}</p>
            </div>
          </div>
        </div>

        {/* Durchschnittszahlen */}
        {(averageSessionsPerDay > 0 || averageSessionsPerMonth > 0 || averageSessionsPerWeek > 0) && (
          <div className="pt-4 border-t border-muted-foreground/20">
            <p className="text-xl font-semibold mb-4 text-center">Durchschnitt:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-medium">Tag:</p>
                <p className="text-2xl font-bold text-primary">
                  {averageSessionsPerDay.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-lg font-medium">Woche:</p>
                <p className="text-2xl font-bold text-primary">
                  {averageSessionsPerWeek.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-lg font-medium">Monat:</p>
                <p className="text-2xl font-bold text-primary">
                  {averageSessionsPerMonth.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* All-time Stats Section */}
        {(bestDaySessions > 0 || bestMonthSessions > 0 || bestWeekSessions > 0 || bestYearSessions > 0) && (
          <div className="pt-4 border-t border-muted-foreground/20">
            <p className="text-xl font-semibold mb-4 text-center">Allzeit-Rekorde</p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-lg font-medium">Bester Tag:</p>
                <p className="text-2xl font-bold text-accent">{bestDaySessions}</p>
              </div>
              <div>
                <p className="text-lg font-medium">Beste Woche:</p>
                <p className="text-2xl font-bold text-accent">{bestWeekSessions}</p>
              </div>
              <div>
                <p className="text-lg font-medium">Bester Monat:</p>
                <p className="text-2xl font-bold text-accent">{bestMonthSessions}</p>
              </div>
              <div>
                <p className="text-lg font-medium">Bestes Jahr:</p>
                <p className="text-2xl font-bold text-accent">{bestYearSessions}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Stats;