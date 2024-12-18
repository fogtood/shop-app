export const dateFormatter = (dateStr) => {
  const date = new Date(dateStr);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return formattedDate;
};
