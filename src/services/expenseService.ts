import { apiCall } from "./api";

const EXPENSE_ENDPOINT = "/expenses";

export const createExpense = (data) => {
  const token = localStorage.getItem("token");

  return apiCall(EXPENSE_ENDPOINT, "POST", data, {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });
};

export const fetchExpenses = () => {
  const token = localStorage.getItem("token");

  return apiCall(
    EXPENSE_ENDPOINT,
    "GET",
    {},
    {
      Authorization: `Bearer ${token}`,
    },
  );
};
