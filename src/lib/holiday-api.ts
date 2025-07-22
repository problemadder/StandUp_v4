import { getLocalStorageItem, setLocalStorageItem } from "./local-storage";

export interface PublicHoliday {
  date: string; // YYYY-MM-DD
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

interface CachedHolidays {
  holidays: PublicHoliday[];
  timestamp: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const fetchGermanPublicHolidays = async (year: number): Promise<PublicHoliday[]> => {
  const cacheKey = `holidays_${year}_DE`;
  const cachedData = getLocalStorageItem<CachedHolidays | null>(cacheKey, null);
  const now = Date.now();

  if (cachedData && (now - cachedData.timestamp < CACHE_DURATION)) {
    console.log(`Using cached holidays for ${year}`);
    return cachedData.holidays;
  }

  console.log(`Fetching holidays for ${year} from API...`);
  try {
    const response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/DE`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PublicHoliday[] = await response.json();
    setLocalStorageItem(cacheKey, { holidays: data, timestamp: now });
    return data;
  } catch (error) {
    console.error(`Error fetching public holidays for ${year}:`, error);
    // Fallback to empty array if API fails
    return [];
  }
};

export const isGermanPublicHoliday = (date: Date, holidays: PublicHoliday[]): boolean => {
  const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
  return holidays.some(holiday => holiday.date === dateString);
};