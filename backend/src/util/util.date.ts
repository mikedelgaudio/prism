const convertToDate = (date: string): string => {
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

// TODO
// Need to refactor
const distributeTimeLoad = (sideSlot: number[]): void => {
  const MINUTES_IN_HOUR = 60;
  for (let i = 0; i < sideSlot.length; i++) {
    const slot = sideSlot[i];
    if (sideSlot[i] > MINUTES_IN_HOUR) {
      const remainder =
        slot >= MINUTES_IN_HOUR
          ? Math.abs(slot - MINUTES_IN_HOUR)
          : slot % MINUTES_IN_HOUR;

      sideSlot[i] = 60;

      if (i + 1 < 24) sideSlot[i + 1] += remainder;
    }
  }
};

export { convertToDate, convertToHour, distributeTimeLoad };
