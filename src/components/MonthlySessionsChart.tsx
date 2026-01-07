import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend, // Added Legend for clarity
} from 'recharts';
import { CombinedMonthlySessionsData } from "@/hooks/use-session-manager"; // Import the new interface

interface MonthlySessionsChartProps {
  data: CombinedMonthlySessionsData[];
  title?: string;
}

const MonthlySessionsChart: React.FC<MonthlySessionsChartProps> = ({ data, title = "Sitzungen pro Monat" }) => {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  return (
    <Card className="w-full min-w-0">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                labelStyle={{ color: 'hsl(var(--primary))' }}
                formatter={(value: number, name: string) => {
                  if (name === `currentYearSessions`) {
                    return [`${value} Sitzungen`, `Aktuelles Jahr (${currentYear})`];
                  } else if (name === `previousYearSessions`) {
                    return [`${value} Sitzungen`, `Letztes Jahr (${previousYear})`];
                  }
                  return [value, name];
                }}
              />
              <Legend /> {/* Add legend to differentiate bars */}
              <Bar
                dataKey="previousYearSessions"
                fill="hsl(var(--muted-foreground) / 0.5)" // Gray and transparent
                radius={[4, 4, 0, 0]}
                name={`Letztes Jahr (${previousYear})`}
              />
              <Bar
                dataKey="currentYearSessions"
                fill="hsl(var(--primary))" // Green
                radius={[4, 4, 0, 0]}
                name={`Aktuelles Jahr (${currentYear})`}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlySessionsChart;