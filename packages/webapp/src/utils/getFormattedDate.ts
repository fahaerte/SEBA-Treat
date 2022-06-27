export const getFormattedDateFromString = (date: string | Date) => {
  return new Date(date).toLocaleString("de-DE");
};
