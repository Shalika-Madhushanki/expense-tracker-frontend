import React, { useState } from "react";

import { paidByList, categoryList } from "../constants/sheet";
import {
  NumberInput,
  TextInput,
  DatePicker,
  Picker,
  SearchPicker,
} from "../components";
import { Dialog, Divider, DotLoading, Button, Space } from "antd-mobile";

import { createExpense } from "../services/expenseService";
import { useNavigate } from "react-router-dom";
import { formatDateToDDMMYYYY } from "../utils/DateUtils";

const AddExpenseScreen: React.FC = () => {
  const today = new Date();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");
  const [category, setCategory] = useState(null);
  const [paidBy, setPaidBy] = useState(null);
  const [date, setDate] = useState(today);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const handleSubmit = () => {
    const result = {
      amount: amount,
      description: description,
      comments: comments,
      category: category?.value,
      paidBy: paidBy?.value,
      date: date,
    };
    callApiFunction(result);
  };

  const callApiFunction = async (data) => {
    setError("");
    setIsLoading(true);
    setIsDialogVisible(true);
    const inputDate = new Date(data.date);
    const formattedDay = formatDateToDDMMYYYY(inputDate);
    data.date = formattedDay;
    try {
      await createExpense(data);
      resetFormData();
      setError("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error message: ", error.message);
      setError(error.message || "Error occurred creating the record.");
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

  const handleAmountOnChange = (value) => {
    setAmount(value);
  };
  const handleDescriptionOnChange = (value) => {
    setDescription(value);
  };
  const handleCommentsOnChange = (value) => {
    setComments(value);
  };
  const handleCategoryOnChange = (d) => {
    setCategory(d);
  };
  const handlePaidByOnChange = (d) => {
    setPaidBy(d);
  };
  const handleDateOnChange = (value) => {
    setDate(value);
  };
  // const handleCancel = () => {
  //   setIsDialogVisible(false);
  // };
  const handleCloseDialog = () => {
    setIsDialogVisible(false);
    if (!error) {
      navigate("/dashboard/home"); // Navigate only if there is no error
    }
  };
  return (
    <Space block direction="vertical" style={styles.container}>
      <Space block direction="vertical">
        <Divider style={{ marginBottom: 0 }}>Record Expense</Divider>

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

        <span style={{ color: "red" }}>{error.message}</span>
      </Space>

      <Button
        type="submit"
        block
        onClick={handleSubmit}
        color="primary"
        size="large"
      >
        Submit
      </Button>

      <Dialog
        visible={isDialogVisible}
        content={
          isLoading ? (
            <div style={styles.loadingContainer}>
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
            disabled: isLoading, // Disable the button while loading
          },
        ]}
      />
    </Space>
  );
};

const styles = {
  container: {
    marginTop: -20,
    padding: "10px",
  },
};

export default AddExpenseScreen;
