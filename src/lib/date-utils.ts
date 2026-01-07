export const convertIsoToEuropean = (isoDate: string): string => {
  if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    return isoDate; // Return as is if not in expected ISO format
  }
  const [year, month, day] = isoDate.split('-');
  return `${day}.${month}.${year}`;
};

export const convertEuropeanToIso = (europeanDate: string): string => {
  if (!europeanDate || !/^\d{2}\.\d{2}\.\d{4}$/.test(europeanDate)) {
    // Basic validation for DD.MM.YYYY format
    console.warn(`Invalid European date format: ${europeanDate}. Expected DD.MM.YYYY.`);
    return europeanDate; // Return as is, or throw an error, depending on desired strictness
  }
  const [day, month, year] = europeanDate.split('.');
  return `${year}-${month}-${day}`;
};