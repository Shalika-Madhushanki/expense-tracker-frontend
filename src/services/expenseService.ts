import { Expense } from "../screens/HomeScreen";
import { apiCall } from "./api";

const EXPENSE_ENDPOINT = "/expenses";

export const createExpense = (data: Expense) => {
  return apiCall(EXPENSE_ENDPOINT, "POST", data);
};

export const updateExpense = (id: number, data: Expense) => {
  return apiCall(`${EXPENSE_ENDPOINT}/${id}`, "PUT", data);
};

export const fetchExpenses = () => {
  return apiCall(EXPENSE_ENDPOINT, "GET", {});
};

export const fetchExpenseRecord = (id: string) => {
  return apiCall(`${EXPENSE_ENDPOINT}/${id}`, "GET", {});
};

export const deleteExpenseRecord = (id: string) => {
  return apiCall(`${EXPENSE_ENDPOINT}/${id}`, "DELETE", {});
};

export const fetchExpensesByMonth = (year: number, month: number) => {
  return apiCall(
    `${EXPENSE_ENDPOINT}/by-month?year=${year}&month=${month}`,
    "GET",
    {},
  );
};
