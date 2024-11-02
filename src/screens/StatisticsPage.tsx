import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { Calendar, Toast } from "antd-mobile";
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
        onPageChange={onPageChangeHandler}
      />
      <div className="chart-section">
        <PieChartComponent data={chartData} />
      </div>
      {/* {Toast.show({
        content: error,
        afterClose: () => {
          console.log("after");
        },
      })} */}
    </>
  );
};

export default StatisticsPage;
