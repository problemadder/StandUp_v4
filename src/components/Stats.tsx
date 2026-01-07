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
  homeofficeDays: string[];
}

const Stats: React.FC<StatsProps> = ({
  completedSessionsToday,
  isLoadingHolidays,
  sessionsPerWeek,
  sessionsPerMonth,
  sessionsPerYear,
  averageSessionsPerDay,
  homeofficeDays,
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
        {averageSessionsPerDay > 0 && (
          <div>
            <p className="text-lg font-medium">Durchschnitt pro Tag:</p>
            <p className="text-2xl font-bold text-primary">
              {averageSessionsPerDay.toFixed(1)}
            </p>
          </div>
        )}
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
            <p className="text-lg font-medium">Jahr:</p> {/* Added the missing header here */}
            <p className="text-2xl font-bold text-primary">{sessionsPerYear}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Stats;