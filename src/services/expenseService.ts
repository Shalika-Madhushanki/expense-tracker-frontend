import { Expense } from "../screens/HomeScreen";
import { apiCall } from "./api";

const EXPENSE_ENDPOINT = "/expenses";

export const createExpense = (data: Expense) => {
  const token = localStorage.getItem("token");

  return apiCall(EXPENSE_ENDPOINT, "POST", data, {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });
};

export const updateExpense = (id: number, data: Expense) => {
  const token = localStorage.getItem("token");

  return apiCall(`${EXPENSE_ENDPOINT}/${id}`, "PUT", data, {
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

export const fetchExpenseRecord = (id: string) => {
  const token = localStorage.getItem("token");

  return apiCall(
    `${EXPENSE_ENDPOINT}/${id}`,
    "GET",
    {},
    {
      Authorization: `Bearer ${token}`,
    },
  );
};

export const deleteExpenseRecord = (id: string) => {
  const token = localStorage.getItem("token");

  return apiCall(
    `${EXPENSE_ENDPOINT}/${id}`,
    "DELETE",
    {},
    { Authorization: `Bearer ${token}` },
  );
};

export const fetchExpensesByMonth = (year: number, month: number) => {
  console.log("year", year);
  console.log("month", month);

  const token = localStorage.getItem("token");

  return apiCall(
    `${EXPENSE_ENDPOINT}/by-month?year=${year}&month=${month}`,
    "GET",
    {},
    {
      Authorization: `Bearer ${token}`,
    },
  );
};
