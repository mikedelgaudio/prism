export const validString = (string: string | undefined): boolean => {
  if (!string) return false;
  if (string.length === 0) return false;
  if (!string.trim().length) return false;
  return true;
};

export const toHoursAndMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
};

export const toDateTitle = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export const toLocalDateTime = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export const convertToQueryTimestamp = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return new Date(date)
    .toLocaleDateString("en-US", options)
    .replace(/\//gi, "_");
};

export const colors = {
  indigo: {
    "50": "#f3f6fc",
    "100": "#e7edf7",
    "200": "#c9d8ee",
    "300": "#99b8e0",
    "400": "#6293ce",
    "500": "#4d82c3",
    "600": "#2d5b9c",
    "700": "#264a7e",
    "800": "#234069",
    "900": "#223758",
  },
};

export const getStartDateOfWeek = (week: number, year: number): string => {
  const date = new Date(year, 0, 1 + (week - 1) * 7);
  date.setDate(date.getDate() + (0 - date.getDay())); // 0 - Sunday

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

export const getEndDateOfWeek = (week: number, year: number): string => {
  const date = new Date(year, 0, 1 + (week - 1) * 7);
  date.setDate(date.getDate() + (6 - date.getDay())); // 6 - Saturday

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const getWeekNumber = (date?: string): number => {
  let currentDate = new Date();
  if (date) currentDate = new Date(date);
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000),
  );
  const weekNumber = Math.ceil(days / 7);
  return weekNumber;
};

export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
