export const getFormattedDay = (date) => {
  const options = { month: "short", day: "numeric", weekday: "short" };
  return date.toLocaleDateString("en-US", options).replace(/, 2024/, "");
};

export const formatDateToDDMMYYYY = (date) => {
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (getMonth() is zero-based) and pad with zero if needed
  const year = date.getFullYear(); // Get full year

  return `${day}-${month}-${year}`; // Return date in dd-MM-yyyy format
};
