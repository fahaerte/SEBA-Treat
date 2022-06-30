export const getFormattedDateFromString = (date: string | Date) => {
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(date).toLocaleString("ens-DE", options);
};
