import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';

interface MonthlySessionsData {
  name: string;
  sessions: number;
}

interface MonthlySessionsChartProps {
  data: MonthlySessionsData[];
  title?: string; // Added title prop
}

const MonthlySessionsChart: React.FC<MonthlySessionsChartProps> = ({ data, title = "Pro Monat" }) => {
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
              />
              <Bar
                dataKey="sessions"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlySessionsChart;