import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, List, Space } from "antd-mobile";

import { Expense } from "./HomeScreen";
import { fetchExpenseRecord } from "../services/expenseService";
import { isTokenExpired } from "../utils/JwtUtils";
import PageHeader from "../components/PageHeader";

const ViewExpenseScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState<Expense>({
    id: 0,
    amount: 0,
    description: "",
    category: "",
    comments: "",
    paidBy: "",
    date: "",
  });

  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchExpenseData = async () => {
      const token = localStorage.getItem("token");
      if (token && isTokenExpired(token)) {
        navigate("/login");
        return Promise.reject(
          new Error("Token expired, redirecting to login."),
        );
      }
      try {
        const data = await fetchExpenseRecord(id);
        if (data) {
          setExpense(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          console.error("Error fetching expenses:", error);
        } else {
          setError("Error occurred while fetching data");
        }
      }
    };
    fetchExpenseData();
  }, []);
  return (
    <>
      <PageHeader
        headerText="Expense Details"
        onClickHandler={() => {
          navigate("/dashboard/home");
        }}
      />
      <div style={{ padding: "16px" }}>
        <Card>
          <Space direction="vertical" block>

            <List>
              <List.Item
                extra={
                  <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                    {expense.amount} €
                  </span>
                }
              >
                Amount
              </List.Item>
              <List.Item extra={expense.description || "N/A"}>
                Description
              </List.Item>
              <List.Item extra={expense.category || "N/A"}>Category</List.Item>
              <List.Item extra={expense.comments || "No comments"}>
                Comments
              </List.Item>
              <List.Item extra={expense.paidBy || "Unknown"}>Who's paid?</List.Item>
              <List.Item extra={expense.date}>Date</List.Item>
            </List>
          </Space>
        </Card>
      </div>
    </>
  );
};

export default ViewExpenseScreen;
