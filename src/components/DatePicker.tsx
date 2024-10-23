import React, { useState } from "react";
import { Space, CalendarPicker, Button } from "antd-mobile";

interface DatePickerProps {
  date: Date;
  onChangeHandler: (value: Date) => void;
}
const DatePicker: React.FC<DatePickerProps> = ({ date, onChangeHandler }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Space block direction="vertical" style={styles.container}>
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
