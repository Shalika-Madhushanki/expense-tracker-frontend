import React, { useState } from "react";
import { Space, CalendarPicker, Button } from "antd-mobile";

interface DatePickerProps {
  date: Date;
  onChangeHandler: (value: Date) => void;
}
const DatePicker: React.FC<DatePickerProps> = ({ date, onChangeHandler }) => {
  const [visible, setVisible] = useState(false);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const minDate = new Date(currentYear, 0, 1); // January 1st of the current year
  const maxDate = new Date(currentYear, currentMonth, new Date().getDate()); // Last day of the current month

  return (
    <Space block direction="vertical">
      <div style={styles.label}>Date</div>
      <Button block onClick={() => setVisible(true)}>
        {date ? date.toDateString() : "Select Date"}
      </Button>
      <CalendarPicker
        visible={visible}
        selectionMode="single"
        defaultValue={date}
        onClose={() => setVisible(false)}
        onMaskClick={() => setVisible(false)}
        title="Select Date"
        confirmText="Confirm"
        weekStartsOn="Monday"
        onConfirm={onChangeHandler}
        min={minDate}
        max={maxDate}
      />
    </Space>
  );
};

const styles = {
  label: {
    fontSize: "16px",
    color: "#999",
    marginBottom: 2,
  },
};

export default DatePicker;
