import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ActionSheet, Card, Dialog, List, Space, Toast } from "antd-mobile";

import { Expense } from "./HomeScreen";
import {
  deleteExpenseRecord,
  fetchExpenseRecord,
} from "../services/expenseService";
import PageHeader from "../components/PageHeader";
import { Action } from "antd-mobile/es/components/action-sheet";

const ViewExpenseScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string>("");
  const [expense, setExpense] = useState<Expense>({
    id: 0,
    amount: 0,
    description: "",
    category: "",
    comments: "",
    paidBy: "",
    date: "",
  });

  const actions: Action[] = [
    {
      text: "Modify",
      key: "edit",
      disabled: false,
      onClick: () => navigate(`/expenses/edit/${id}`),
    },
    {
      text: "Delete",
      key: "delete",
      description: "Data cannot be restored after deletion",
      danger: true,
      bold: true,
      onClick: () =>
        Dialog.confirm({
          content: "Are you sure you want to delete the record?",
          cancelText: "Cancel",
          confirmText: "OK",
          onConfirm: async () => {
            const res = await deleteExpense(id);
            if (res) {
              Toast.show({
                icon: "fail",
                content: "Record deletion failed",
                position: "bottom",
              });
            } else {
              Toast.show({
                icon: "success",
                content: "Record deletion successful",
                position: "bottom",
              });
              navigate("/dashboard/home");
            }
          },
        }),
    },
  ];

  const deleteExpense = async (id: string) => {
    try {
      const data = await deleteExpenseRecord(id);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Token expired") {
          navigate("/login");
        }
        setError(error.message);
        console.error("Error fetching expenses:", error);
      } else {
        setError("Error occurred while fetching data");
      }
      return true;
    }
  };

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const data = await fetchExpenseRecord(id);
        if (data) {
          setExpense(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Token expired") {
            navigate("/login");
          }
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
        onLeftActionClickHandler={() => {
          navigate("/dashboard/home");
        }}
        onRightActionClickHandler={() => {
          setVisible(true);
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
              <List.Item extra={expense.paidBy || "Unknown"}>
                Who's paid?
              </List.Item>
              <List.Item extra={expense.date}>Date</List.Item>
            </List>
          </Space>
        </Card>
      </div>
      <div>{error}</div>
      <ActionSheet
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default ViewExpenseScreen;
