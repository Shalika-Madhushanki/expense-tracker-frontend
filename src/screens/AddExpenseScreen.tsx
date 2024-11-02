import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  NumberInput,
  TextInput,
  DatePicker,
  Picker,
  SearchPicker,
} from "../components";
import { Dialog, DotLoading, Button, Space } from "antd-mobile";

import {
  createExpense,
  fetchExpenseRecord,
  updateExpense,
} from "../services/expenseService";
import { formatDateToDDMMYYYY } from "../utils/DateUtils";
import { Expense } from "./HomeScreen";
import {
  paidByList,
  categoryList,
  CategoryItem,
  PaidByItem,
  findCategoryByText,
  findPaidByByText,
} from "../constants/sheet";
import PageHeader from "../components/PageHeader";

const AddExpenseScreen: React.FC = () => {
  const today = new Date();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const operation = pathname.split("/")[2];

  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [category, setCategory] = useState<CategoryItem | null>(null);
  const [paidBy, setPaidBy] = useState<PaidByItem | null>(null);
  const [date, setDate] = useState<Date>(today);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  useEffect(() => {
    if (operation === "edit") {
      const fetchExpenseData = async () => {
        try {
          const data = await fetchExpenseRecord(id);
          if (data) {
            setInitialData(data);
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
    }
  }, []);

  const setInitialData = (data: Expense) => {
    setAmount(data.amount);
    setDescription(data.description);
    setComments(data.comments);

    const categoryItem = findCategoryByText(data.category);
    setCategory(categoryItem);

    const paidByItem = findPaidByByText(data.paidBy);
    setPaidBy(paidByItem);

    const [day, month, year] = data.date.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    setDate(new Date(date));
  };
  const handleSubmit = () => {
    const result = {
      id,
      amount: amount,
      description: description,
      comments: comments,
      category: category?.value,
      paidBy: paidBy?.value,
      date: date,
    };
    callCreateExpenseApi(result);
  };

  const callCreateExpenseApi = async (data: Expense) => {
    setError("");
    setIsLoading(true);
    setIsDialogVisible(true);
    const inputDate = new Date(data.date);
    const formattedDay = formatDateToDDMMYYYY(inputDate);
    data.date = formattedDay;
    try {
      if (operation === "edit") {
        await updateExpense(id, data);
      } else {
        await createExpense(data);
      }
      resetFormData();
      setError("");
      setIsLoading(false);
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof Error) {
        if (error.message === "Token expired") {
          navigate("/login");
        }
        console.error("error message: ", error.message);
        setError(error.message);
      } else {
        setError(
          `Error occurred ${operation === "edit" ? "updating" : "creating "} creating the record.`,
        );
      }
    }
  };

  const resetFormData = () => {
    setAmount(0);
    setDescription("");
    setComments("");
    setCategory(null);
    setPaidBy(null);
    setDate(today);
  };

  const handleAmountOnChange = (value: number) => {
    setAmount(value);
  };
  const handleDescriptionOnChange = (value: string) => {
    setDescription(value);
  };
  const handleCommentsOnChange = (value: string) => {
    setComments(value);
  };
  const handleCategoryOnChange = (value: CategoryItem) => {
    setCategory(value);
  };
  const handlePaidByOnChange = (value: PaidByItem) => {
    setPaidBy(value);
  };
  const handleDateOnChange = (value: Date) => {
    setDate(value);
  };
  const handleCloseDialog = () => {
    setIsDialogVisible(false);
    if (!error) {
      navigate("/dashboard/home");
    }
  };
  return (
    <>
      <PageHeader
        headerText={`${operation === "edit" ? "Update" : "Create"} Expense`}
        onLeftActionClickHandler={() => {
          navigate("/dashboard/home");
        }}
      />
      <div className="form-content" style={{ padding: "10px" }}>
        <NumberInput
          onChangeHandler={handleAmountOnChange}
          label="Amount"
          placeholder="0"
          value={amount}
        />
        <TextInput
          onChangeHandler={handleDescriptionOnChange}
          label="Description"
          placeholder="Hoffer"
          value={description}
        ></TextInput>
        <TextInput
          onChangeHandler={handleCommentsOnChange}
          label="Comments"
          placeholder="Vegitables & Fruits"
          value={comments}
        ></TextInput>

        <SearchPicker
          data={category}
          items={categoryList}
          instruction="Expense Category?"
          label="Category"
          onSelect={handleCategoryOnChange}
        />

        <Picker
          data={paidBy}
          items={paidByList}
          instruction="Who did the payment?"
          label="Paid By"
          onSelect={handlePaidByOnChange}
        />
        <DatePicker onChangeHandler={handleDateOnChange} date={date} />

        <span style={{ color: "red" }}>{error}</span>
        {/* </Space> */}

        <Button
          type="submit"
          block
          onClick={handleSubmit}
          color="primary"
          size="large"
        >
          {operation === "edit" ? "Update" : "Create"}
        </Button>
      </div>

      <Dialog
        visible={isDialogVisible}
        content={
          isLoading ? (
            <div>
              <span>Record is being added</span>
              <DotLoading />
            </div>
          ) : (
            <div>
              <span>
                {error ? (
                  <>
                    <strong>Error occurred!</strong>
                    <br />
                    {error}
                  </>
                ) : (
                  "Record added successfully!"
                )}
              </span>
            </div>
          )
        }
        closeOnAction
        onClose={handleCloseDialog}
        actions={[
          {
            key: "cancel",
            text: "Close",
            onClick: handleCloseDialog,
            disabled: isLoading,
          },
        ]}
      />
    </>
  );
};

export default AddExpenseScreen;
