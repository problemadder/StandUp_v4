import { useState, useEffect, useCallback } from "react";
import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from "@/lib/local-storage";
import { fetchGermanPublicHolidays, isGermanPublicHoliday, PublicHoliday } from "@/lib/holiday-api"; // Import PublicHoliday
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

interface MonthlySessionsData {
  name: string; // Month name
  sessions: number;
}

interface UseSessionManagerResult {
  sessions: Session[];
  completedSessionsToday: number;
  addSession: (reward: Reward) => void;
  setSessions: (newSessions: Session[]) => void;
  isLoadingHolidays: boolean;
  sessionsPerWeek: number;
  sessionsPerMonth: number;
  sessionsPerYear: number;
  monthlySessions: MonthlySessionsData[];
  averageSessionsPerDay: number; // Added average sessions per day
  resetAllData: () => void; // Added reset function
}

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const useSessionManager = (): UseSessionManagerResult => {
  const [sessions, setSessionsState] = useState<Session[]>(() =>
    getLocalStorageItem<Session[]>("stehauf_sessions", [])
  );
  const [allHolidays, setAllHolidays] = useState<PublicHoliday[]>([]);
  const [isLoadingHolidays, setIsLoadingHolidays] = useState(true);

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

  const getCompletedSessionsToday = useCallback(() => {
    const today = getTodayDateString();
    return sessions.filter(session => session.date === today && session.completed).length;
  }, [sessions]);

  const calculateAggregatedSessions = useCallback(() => {
    const now = new Date();

    const startOfCurrentWeek = startOfWeek(now, { locale: de });
    const endOfCurrentWeek = endOfWeek(now, { locale: de });
    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);
    const startOfCurrentYear = startOfYear(now);
    const endOfCurrentYear = endOfYear(now);

    const sessionsThisWeek = sessions.filter(session => {
      const sessionDate = new Date(session.date);
      return session.completed && isWithinInterval(sessionDate, { start: startOfCurrentWeek, end: endOfCurrentWeek });
    }).length;

    const sessionsThisMonth = sessions.filter(session => {
      const sessionDate = new Date(session.date);
      return session.completed && isWithinInterval(sessionDate, { start: startOfCurrentMonth, end: endOfCurrentMonth });
    }).length;

    const sessionsThisYear = sessions.filter(session => {
      const sessionDate = new Date(session.date);
      return session.completed && isWithinInterval(sessionDate, { start: startOfCurrentYear, end: endOfCurrentYear });
    }).length;

    const monthlyCounts: { [key: number]: number } = {};
    for (let i = 0; i < 12; i++) {
      monthlyCounts[i] = 0;
    }

    sessions.forEach(session => {
      const sessionDate = new Date(session.date);
      if (session.completed && sessionDate.getFullYear() === now.getFullYear()) {
        const month = getMonth(sessionDate);
        monthlyCounts[month]++;
      }
    });

    const monthlySessionsData: MonthlySessionsData[] = Object.keys(monthlyCounts).map(monthIndex => ({
      name: new Date(now.getFullYear(), parseInt(monthIndex)).toLocaleString('de-DE', { month: 'short' }),
      sessions: monthlyCounts[parseInt(monthIndex)],
    }));

    // Calculate average sessions per day
    const completedSessions = sessions.filter(s => s.completed);
    const uniqueDates = new Set(completedSessions.map(s => s.date));
    const averageSessionsPerDay = uniqueDates.size > 0 ? completedSessions.length / uniqueDates.size : 0;


    return { sessionsThisWeek, sessionsThisMonth, sessionsThisYear, monthlySessionsData, averageSessionsPerDay };
  }, [sessions]);

  const { sessionsThisWeek, sessionsThisMonth, sessionsThisYear, monthlySessionsData, averageSessionsPerDay } = calculateAggregatedSessions();

  const resetAllData = useCallback(() => {
    removeLocalStorageItem("stehauf_sessions");
    setSessionsState([]);
    alert("Alle Daten wurden zurückgesetzt!");
    window.location.reload(); // Reload to ensure full state reset
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
    monthlySessions: monthlySessionsData,
    averageSessionsPerDay,
    resetAllData,
  };
};