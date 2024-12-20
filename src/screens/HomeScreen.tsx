import React, { useCallback, useEffect, useState } from "react";
import { Grid, Image, List } from "antd-mobile";
import { useNavigate } from "react-router-dom";

import { fetchExpensesByMonth } from "../services/expenseService";
import PieChartComponent, {
  PieChartDataItem,
} from "../components/PieChartComponent";
import { categoryIconsMap } from "../constants/sheet";
import PageHeader from "../components/PageHeader";

export interface Expense {
  id: number;
  amount: number;
  description: string;
  category: string;
  comments: string;
  paidBy: string;
  date: string;
}

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [error, setError] = useState<string>("");
  const [chartData, setChartData] = useState<PieChartDataItem[]>([]);

  const generateCategoryByTotalList = useCallback(() => {
    const expenseAmountByCategory: { [category: string]: number } = {};

    expenseList.map((expense: Expense) => {
      if (!expenseAmountByCategory[expense.category]) {
        expenseAmountByCategory[expense.category] = 0;
      }
      expenseAmountByCategory[expense.category] += expense.amount;
    });
    const expenseByCategoryArray = Object.keys(expenseAmountByCategory).map(
      (category) => ({
        name: category,
        value: expenseAmountByCategory[category],
      }),
    );
    setChartData(expenseByCategoryArray);
  }, [expenseList]);

  useEffect(() => {
    const fetchData = async () => {
      setError("");
      try {
        const today = new Date();
        const data = await fetchExpensesByMonth(
          today.getUTCFullYear(),
          today.getUTCMonth() + 1,
        );
        if (data?.length) {
          setExpenseList(data);
        }
      } catch (error: unknown) {
        console.log("in catch");

        if (error instanceof Error) {
          if (error.message === "Token expired") {
            navigate("/login");
          }
          setError(error.message);
          console.error("Error fetching expenses:", error);
        } else {
          console.log("in catch else");

          setError("Error occurred while fetching data");
        }
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    generateCategoryByTotalList();
  }, [expenseList, generateCategoryByTotalList]);

  const getCategoryIcon = (category: string): string | undefined => {
    return categoryIconsMap.get(category);
  };

  return (
    <>
      <div className="top-section">
        <PageHeader
          headerText={"Expense Dashboard"}
          onLeftActionClickHandler={() => {
            navigate("/login");
          }}
        />
        <div className="top-section-child chart-section">
          <PieChartComponent data={chartData} />
        </div>
      </div>
      <div className="bottom-section">
        <List
          header={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "18px" }}>History</span>
            </div>
          }
        >
          {error && (
            <div
              style={{ color: "red", textAlign: "center", margin: "10px 0" }}
            >
              {error}
            </div>
          )}
          {expenseList?.length == 0 ? (
            <div
              style={{
                color: "#808080",
                textAlign: "center",
                margin: "10px 0",
              }}
            >
              No Data Found
            </div>
          ) : (
            ""
          )}
          {expenseList.map((record: Expense, index) => (
            <List.Item
              onClick={() => {
                navigate(`/expenses/view/${record.id}`);
              }}
              key={index}
              prefix={
                <Image
                  src={getCategoryIcon(record.category)}
                  style={{ borderRadius: 10, backgroundColor: "white" }}
                  fit="cover"
                  width={40}
                  height={40}
                />
              }
              description={
                record.comments + " |  " + " " + " | " + record.paidBy
              }
            >
              <Grid columns={3} gap={8}>
                <Grid.Item span={2}>
                  <div>{record.description}</div>
                </Grid.Item>
                <Grid.Item span={1}>
                  <div style={{ textAlign: "right", paddingRight: "6px" }}>
                    {record.amount} €
                  </div>
                </Grid.Item>
              </Grid>
            </List.Item>
          ))}
        </List>
      </div>
    </>
  );
};

export default HomeScreen;
