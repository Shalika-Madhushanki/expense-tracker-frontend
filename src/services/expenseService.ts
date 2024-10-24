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

export const fetchExpenses = () => {
  console.log("Fetching expenses");
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

export const fetchExpenseRecord = (id: number) => {
  console.log("Fetching expenses");
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
