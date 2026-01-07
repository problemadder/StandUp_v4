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

export interface MonthlySessionsData {
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
  monthlySessionsCurrentYear: MonthlySessionsData[];
  monthlySessionsPreviousYear: MonthlySessionsData[];
  averageSessionsPerDay: number;
  resetAllData: () => void;
  activeDays: string[]; // Expose activeDays
  setActiveDays: (newActiveDays: string[]) => void; // Expose setActiveDays
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

  // Effect to record active days
  useEffect(() => {
    const today = getTodayDateString();
    if (!activeDays.includes(today)) {
      const updatedActiveDays = [...activeDays, today].sort(); // Keep sorted for consistency
      setActiveDaysState(updatedActiveDays);
      setLocalStorageItem("stehauf_active_days", updatedActiveDays);
    }
  }, [activeDays]);

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

  const getCompletedSessionsToday = useCallback(() => {
    const today = getTodayDateString();
    return sessions.filter(session => session.date === today && session.completed).length;
  }, [sessions]);

  const calculateAggregatedSessions = useCallback(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const previousYear = currentYear - 1;

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

    const monthlySessionsCurrentYear: MonthlySessionsData[] = Object.keys(monthlyCountsCurrentYear).map(monthIndex => ({
      name: new Date(currentYear, parseInt(monthIndex)).toLocaleString('de-DE', { month: 'short' }),
      sessions: monthlyCountsCurrentYear[parseInt(monthIndex)],
    }));

    const monthlySessionsPreviousYear: MonthlySessionsData[] = Object.keys(monthlyCountsPreviousYear).map(monthIndex => ({
      name: new Date(previousYear, parseInt(monthIndex)).toLocaleString('de-DE', { month: 'short' }),
      sessions: monthlyCountsPreviousYear[parseInt(monthIndex)],
    }));

    // Calculate average sessions per day
    const completedSessionsCount = sessions.filter(s => s.completed).length;
    const uniqueActiveDaysCount = new Set(activeDays).size;
    const averageSessionsPerDay = uniqueActiveDaysCount > 0 ? completedSessionsCount / uniqueActiveDaysCount : 0;


    return { 
      sessionsThisWeek, 
      sessionsThisMonth, 
      sessionsThisYear, 
      monthlySessionsCurrentYear, 
      monthlySessionsPreviousYear, 
      averageSessionsPerDay 
    };
  }, [sessions, activeDays]);

  const { 
    sessionsThisWeek, 
    sessionsThisMonth, 
    sessionsThisYear, 
    monthlySessionsCurrentYear, 
    monthlySessionsPreviousYear, 
    averageSessionsPerDay 
  } = calculateAggregatedSessions();

  const resetAllData = useCallback(() => {
    removeLocalStorageItem("stehauf_sessions");
    removeLocalStorageItem("stehauf_active_days");
    setSessionsState([]);
    setActiveDaysState([]);
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
    monthlySessionsCurrentYear,
    monthlySessionsPreviousYear,
    averageSessionsPerDay,
    resetAllData,
    activeDays,
    setActiveDays,
  };
};