import { useState, useEffect, useCallback } from "react";
import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from "@/lib/local-storage";
import { fetchGermanPublicHolidays, isGermanPublicHoliday, PublicHoliday } from "@/lib/holiday-api";
import { Reward } from "@/lib/rewards-data";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, isWithinInterval, getMonth } from 'date-fns';
import { de } from 'date-fns/locale';

export interface Session {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM:SS
  durationMinutes: number;
  completed: boolean;
  reward: Reward;
}

export interface CombinedMonthlySessionsData {
  name: string; // Month name (e.g., 'Jan')
  currentYearSessions: number;
  previousYearSessions: number;
}

interface UseSessionManagerResult {
  sessions: Session[];
  completedSessionsToday: number;
  addSession: (reward: Reward) => void;
  setSessions: (newSessions: Session[]) => void;
  isLoadingHolidays: boolean;
  sessionsPerWeek: number; // Current week
  sessionsPerMonth: number; // Current month
  sessionsPerYear: number; // Current year total
  combinedMonthlySessions: CombinedMonthlySessionsData[];
  averageSessionsPerDayCurrentYear: number; // New
  averageSessionsPerMonthCurrentYear: number; // New
  averageSessionsPerWeekCurrentYear: number; // New
  averageSessionsPerDayPreviousYear: number; // New
  averageSessionsPerMonthPreviousYear: number; // New
  averageSessionsPerWeekPreviousYear: number; // New
  totalSessionsPreviousYear: number; // New: Total sessions for the previous year
  resetAllData: () => void;
  activeDays: string[];
  setActiveDays: (newActiveDays: string[]) => void;
  homeofficeDays: string[];
  markHomeofficeDay: (date: string) => void;
  visitedDays: string[];
  bestDaySessions: number;
  bestMonthSessions: number;
  bestWeekSessions: number;
  bestYearSessions: number;
}

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const useSessionManager = (): UseSessionManagerResult => {
  const [sessions, setSessionsState] = useState<Session[]>(() =>
    getLocalStorageItem<Session[]>("stehauf_sessions", [])
  );
  const [allHolidays, setAllHolidays] = useState<PublicHoliday[]>([]);
  const [isLoadingHolidays, setIsLoadingHolidays] = useState(true);
  const [activeDays, setActiveDaysState] = useState<string[]>(() =>
    getLocalStorageItem<string[]>("stehauf_active_days", [])
  );
  const [homeofficeDays, setHomeofficeDaysState] = useState<string[]>(() =>
    getLocalStorageItem<string[]>("stehauf_homeoffice_days", [])
  );
  const [visitedDays, setVisitedDaysState] = useState<string[]>(() =>
    getLocalStorageItem<string[]>("stehauf_visited_days", [])
  );

  // Effect to track visited days
  useEffect(() => {
    const today = getTodayDateString();
    setVisitedDaysState(prevDays => {
      if (!prevDays.includes(today)) {
        const updatedDays = [...prevDays, today].sort();
        setLocalStorageItem("stehauf_visited_days", updatedDays);
        return updatedDays;
      }
      return prevDays;
    });
  }, []);

  // Fetch holidays for current and previous year
  useEffect(() => {
    const loadHolidays = async () => {
      setIsLoadingHolidays(true);
      const currentYear = new Date().getFullYear();
      const holidaysCurrentYear = await fetchGermanPublicHolidays(currentYear);
      const holidaysPreviousYear = await fetchGermanPublicHolidays(currentYear - 1);
      setAllHolidays([...holidaysCurrentYear, ...holidaysPreviousYear]);
      setIsLoadingHolidays(false);
    };
    loadHolidays();
  }, []);

  const addSession = useCallback((reward: Reward) => {
    const now = new Date();
    const newSession: Session = {
      id: `${now.getTime()}-${Math.random().toString(36).substring(2, 9)}`,
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0],
      durationMinutes: 15,
      completed: true,
      reward: reward,
    };
    setSessionsState(prevSessions => {
      const updatedSessions = [...prevSessions, newSession];
      setLocalStorageItem("stehauf_sessions", updatedSessions);
      return updatedSessions;
    });
  }, []);

  const setSessions = useCallback((newSessions: Session[]) => {
    setSessionsState(newSessions);
    setLocalStorageItem("stehauf_sessions", newSessions);
  }, []);

  const setActiveDays = useCallback((newActiveDays: string[]) => {
    setActiveDaysState(newActiveDays);
    setLocalStorageItem("stehauf_active_days", newActiveDays);
  }, []);

  const markHomeofficeDay = useCallback((date: string) => {
    setHomeofficeDaysState(prevDays => {
      if (!prevDays.includes(date)) {
        const updatedDays = [...prevDays, date].sort();
        setLocalStorageItem("stehauf_homeoffice_days", updatedDays);
        return updatedDays;
      }
      return prevDays;
    });
  }, []);

  const getCompletedSessionsToday = useCallback(() => {
    const today = getTodayDateString();
    return sessions.filter(session => session.date === today && session.completed).length;
  }, [sessions]);

  const calculateAggregatedSessions = useCallback(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const previousYear = currentYear - 1;

    // --- Filter data for current and previous year ---
    const sessionsCurrentYear = sessions.filter(s => new Date(s.date).getFullYear() === currentYear && s.completed);
    const visitedDaysCurrentYear = visitedDays.filter(d => new Date(d).getFullYear() === currentYear);
    const homeofficeDaysCurrentYear = homeofficeDays.filter(d => new Date(d).getFullYear() === currentYear);

    const sessionsPreviousYear = sessions.filter(s => new Date(s.date).getFullYear() === previousYear && s.completed);
    const visitedDaysPreviousYear = visitedDays.filter(d => new Date(d).getFullYear() === previousYear);
    const homeofficeDaysPreviousYear = homeofficeDays.filter(d => new Date(d).getFullYear() === previousYear);

    // --- Helper to calculate averages for a specific year's data ---
    const calculateAveragesForSpecificYear = (
      sessionsForYear: Session[],
      visitedDaysForYear: string[],
      homeofficeDaysForYear: string[]
    ) => {
      const totalCompletedSessionsForYear = sessionsForYear.length;

      const allRelevantDatesForYear = Array.from(new Set([
        ...sessionsForYear.map(s => s.date),
        ...visitedDaysForYear
      ])).filter(date => !homeofficeDaysForYear.includes(date));

      // Average per day
      const averageSessionsPerDay = allRelevantDatesForYear.length > 0 ? totalCompletedSessionsForYear / allRelevantDatesForYear.length : 0;

      // Average per week
      const allRelevantWeeksForYear = new Set(
        allRelevantDatesForYear.map(d => startOfWeek(new Date(d), { locale: de }).toISOString().split('T')[0])
      );
      const averageSessionsPerWeek = allRelevantWeeksForYear.size > 0 ? totalCompletedSessionsForYear / allRelevantWeeksForYear.size : 0;

      // Average per month
      const allRelevantMonthsForYear = new Set(
        allRelevantDatesForYear.map(d => new Date(d).toISOString().substring(0, 7)) // YYYY-MM
      );
      const averageSessionsPerMonth = allRelevantMonthsForYear.size > 0 ? totalCompletedSessionsForYear / allRelevantMonthsForYear.size : 0;

      return {
        averageSessionsPerDay,
        averageSessionsPerWeek,
        averageSessionsPerMonth,
      };
    };

    const currentYearAverages = calculateAveragesForSpecificYear(
      sessionsCurrentYear,
      visitedDaysCurrentYear,
      homeofficeDaysCurrentYear
    );

    const previousYearAverages = calculateAveragesForSpecificYear(
      sessionsPreviousYear,
      visitedDaysPreviousYear,
      homeofficeDaysPreviousYear
    );

    // --- Existing calculations for current week/month/year totals ---
    const startOfCurrentWeek = startOfWeek(now, { locale: de });
    const endOfCurrentWeek = endOfWeek(now, { locale: de });
    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);

    const sessionsThisWeek = sessions.filter(session => {
      const sessionDate = new Date(session.date);
      return session.completed && isWithinInterval(sessionDate, { start: startOfCurrentWeek, end: endOfCurrentWeek });
    }).length;

    const sessionsThisMonth = sessions.filter(session => {
      const sessionDate = new Date(session.date);
      return session.completed && isWithinInterval(sessionDate, { start: startOfCurrentMonth, end: endOfCurrentMonth });
    }).length;

    // Monthly counts for chart (already correct)
    const monthlyCountsCurrentYear: { [key: number]: number } = {};
    const monthlyCountsPreviousYear: { [key: number]: number } = {};
    for (let i = 0; i < 12; i++) {
      monthlyCountsCurrentYear[i] = 0;
      monthlyCountsPreviousYear[i] = 0;
    }

    sessions.forEach(session => {
      const sessionDate = new Date(session.date);
      if (session.completed) {
        const month = getMonth(sessionDate);
        if (sessionDate.getFullYear() === currentYear) {
          monthlyCountsCurrentYear[month]++;
        } else if (sessionDate.getFullYear() === previousYear) {
          monthlyCountsPreviousYear[month]++;
        }
      }
    });

    const combinedMonthlySessions: CombinedMonthlySessionsData[] = [];
    for (let i = 0; i < 12; i++) {
      combinedMonthlySessions.push({
        name: new Date(currentYear, i).toLocaleString('de-DE', { month: 'short' }),
        currentYearSessions: monthlyCountsCurrentYear[i],
        previousYearSessions: monthlyCountsPreviousYear[i],
      });
    }

    // All-time bests (already correct)
    let bestDaySessions = 0;
    let bestMonthSessions = 0;
    let bestWeekSessions = 0;
    let bestYearSessions = 0;

    const dailyCounts: { [key: string]: number } = {};
    const monthlyCounts: { [key: string]: number } = {}; // YYYY-MM
    const weeklyCounts: { [key: string]: number } = {};
    const yearlyCounts: { [key: number]: number } = {};

    sessions.forEach(session => {
      if (session.completed) {
        const sessionDate = new Date(session.date);
        const year = sessionDate.getFullYear();
        const month = (sessionDate.getMonth() + 1).toString().padStart(2, '0'); // 01-12
        const dateString = `${year}-${month}-${sessionDate.getDate().toString().padStart(2, '0')}`;
        const monthString = `${year}-${month}`;
        const weekStartString = startOfWeek(sessionDate, { locale: de }).toISOString().split('T')[0];

        dailyCounts[dateString] = (dailyCounts[dateString] || 0) + 1;
        monthlyCounts[monthString] = (monthlyCounts[monthString] || 0) + 1;
        weeklyCounts[weekStartString] = (weeklyCounts[weekStartString] || 0) + 1;
        yearlyCounts[year] = (yearlyCounts[year] || 0) + 1;
      }
    });

    if (Object.keys(dailyCounts).length > 0) {
      bestDaySessions = Math.max(...Object.values(dailyCounts));
    }
    if (Object.keys(monthlyCounts).length > 0) {
      bestMonthSessions = Math.max(...Object.values(monthlyCounts));
    }
    if (Object.keys(weeklyCounts).length > 0) {
      bestWeekSessions = Math.max(...Object.values(weeklyCounts));
    }
    if (Object.keys(yearlyCounts).length > 0) {
      bestYearSessions = Math.max(...Object.values(yearlyCounts));
    }

    return {
      sessionsThisWeek,
      sessionsThisMonth,
      sessionsThisYear: sessionsCurrentYear.length, // Total for current year
      combinedMonthlySessions,
      averageSessionsPerDayCurrentYear: currentYearAverages.averageSessionsPerDay,
      averageSessionsPerWeekCurrentYear: currentYearAverages.averageSessionsPerWeek,
      averageSessionsPerMonthCurrentYear: currentYearAverages.averageSessionsPerMonth,
      averageSessionsPerDayPreviousYear: previousYearAverages.averageSessionsPerDay,
      averageSessionsPerWeekPreviousYear: previousYearAverages.averageSessionsPerWeek,
      averageSessionsPerMonthPreviousYear: previousYearAverages.averageSessionsPerMonth,
      totalSessionsPreviousYear: sessionsPreviousYear.length, // Total for previous year
      bestDaySessions,
      bestMonthSessions,
      bestWeekSessions,
      bestYearSessions,
    };
  }, [sessions, visitedDays, homeofficeDays]);

  const {
    sessionsThisWeek,
    sessionsThisMonth,
    sessionsThisYear,
    combinedMonthlySessions,
    averageSessionsPerDayCurrentYear,
    averageSessionsPerWeekCurrentYear,
    averageSessionsPerMonthCurrentYear,
    averageSessionsPerDayPreviousYear,
    averageSessionsPerWeekPreviousYear,
    averageSessionsPerMonthPreviousYear,
    totalSessionsPreviousYear,
    bestDaySessions,
    bestMonthSessions,
    bestWeekSessions,
    bestYearSessions,
  } = calculateAggregatedSessions();

  const resetAllData = useCallback(() => {
    removeLocalStorageItem("stehauf_sessions");
    removeLocalStorageItem("stehauf_active_days");
    removeLocalStorageItem("stehauf_homeoffice_days");
    removeLocalStorageItem("stehauf_visited_days");
    setSessionsState([]);
    setActiveDaysState([]);
    setHomeofficeDaysState([]);
    setVisitedDaysState([]);
    alert("Alle Daten wurden zurückgesetzt!");
    window.location.reload();
  }, []);

  return {
    sessions,
    completedSessionsToday: getCompletedSessionsToday(),
    addSession,
    setSessions,
    isLoadingHolidays,
    sessionsPerWeek: sessionsThisWeek,
    sessionsPerMonth: sessionsThisMonth,
    sessionsPerYear: sessionsThisYear,
    combinedMonthlySessions,
    averageSessionsPerDayCurrentYear,
    averageSessionsPerMonthCurrentYear,
    averageSessionsPerWeekCurrentYear,
    averageSessionsPerDayPreviousYear,
    averageSessionsPerMonthPreviousYear,
    averageSessionsPerWeekPreviousYear,
    totalSessionsPreviousYear,
    resetAllData,
    activeDays,
    setActiveDays,
    homeofficeDays,
    markHomeofficeDay,
    visitedDays,
    bestDaySessions,
    bestMonthSessions,
    bestWeekSessions,
    bestYearSessions,
  };
};