const convertToDate = (date: string | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return new Date(date)
    .toLocaleDateString("en-US", options)
    .replace(/\//gi, "_");
};

const convertToHour = (date: string): number => {
  return new Date(date).getHours();
};

const daysOfWeekNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getStartDateOfWeek = (week: number, year: number): string => {
  const date = new Date(year, 0, 1 + (week - 1) * 7);
  date.setDate(date.getDate() + (0 - date.getDay())); // 0 - Sunday

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

const getEndDateOfWeek = (week: number, year: number): string => {
  const date = new Date(year, 0, 1 + (week - 1) * 7);
  date.setDate(date.getDate() + (6 - date.getDay())); // 6 - Saturday

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const getDayOfWeekByNum = (dayNumber: number): string => {
  return daysOfWeekNames[dayNumber];
};

const getWeekNumber = (date?: string): number => {
  let currentDate = new Date();
  if (date) currentDate = new Date(date);
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000),
  );
  const weekNumber = Math.ceil(days / 7);
  return weekNumber;
};

const getDayOfWeekByDate = (date?: string): number => {
  let d;
  if (date) d = new Date(date);
  else d = new Date();
  return d.getDay();
};

// TODO
// Need to refactor
// const distributeTimeLoad = (sideSlot: number[]): void => {
//   const MINUTES_IN_HOUR = 60;
//   for (let i = 0; i < sideSlot.length; i++) {
//     const slot = sideSlot[i];
//     if (sideSlot[i] > MINUTES_IN_HOUR) {
//       const remainder =
//         slot >= MINUTES_IN_HOUR
//           ? Math.abs(slot - MINUTES_IN_HOUR)
//           : slot % MINUTES_IN_HOUR;

//       sideSlot[i] = 60;

//       if (i + 1 < 24) sideSlot[i + 1] += remainder;
//     }
//   }
// };

export {
  convertToDate,
  convertToHour,
  getDayOfWeekByNum,
  getStartDateOfWeek,
  getEndDateOfWeek,
  getWeekNumber,
  getDayOfWeekByDate,
};
