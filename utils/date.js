// Returns Date in "DD-MM-YY" format
export const getFormattedDate = (date) => {
  return date.toISOString().slice(0, 10);
};

// Returns Date after Subtracting "N" Days
export const getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
