import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { Calendar } from "antd-mobile";
import PieChartComponent, {
  PieChartDataItem,
} from "../components/PieChartComponent";
import { fetchExpensesByMonth } from "../services/expenseService";
import { Expense } from "./HomeScreen";

const StatisticsPage: React.FC = () => {
  const navigate = useNavigate();
  const [expenseList, setExpenseList] = useState([]);
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
    generateCategoryByTotalList();
  }, [expenseList, generateCategoryByTotalList]);

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
    fetchData();
  }, []);

  const defaultSingle = new Date();

  const onPageChangeHandler = async (year: number, month: number) => {
    try {
      const data = await fetchExpensesByMonth(year, month);
      setExpenseList(data);
    } catch (error) {
      //error
    }
  };

  return (
    <>
      <PageHeader
        onLeftActionClickHandler={() => {
          navigate("/dashboard/home");
        }}
        headerText="Statistics"
      />
      <Calendar
        selectionMode="single"
        defaultValue={defaultSingle}
        onChange={(val) => {
          console.log(val);
        }}
        onPageChange={onPageChangeHandler}
      />
      <div className="chart-section">
        <PieChartComponent data={chartData} />
      </div>
    </>
  );
};

export default StatisticsPage;
