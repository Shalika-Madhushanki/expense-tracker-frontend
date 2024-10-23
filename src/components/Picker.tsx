import React, { useState } from "react";
import { Button, ActionSheet } from "antd-mobile";
import { PaidByItem } from "../constants/sheet";

interface PickerProps {
  data: PaidByItem | null;
  items: PaidByItem[];
  instruction: string;
  label: string;
  onSelect: (value: PaidByItem) => void;
}
const Picker: React.FC<PickerProps> = ({
  data,
  items,
  instruction,
  label,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <div style={styles.container}>
      <div style={styles.label}>{label}</div>
      <Button block onClick={() => setVisible(true)}>
        {data ? data.text : "Please Select"}
      </Button>
      <ActionSheet
        extra={instruction}
        visible={visible}
        actions={items}
        onClose={() => setVisible(false)}
        closeOnAction
        onAction={onSelect}
      />
    </div>
  );
};

const styles = {
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: "16px",
    color: "#999",
    marginBottom: 12,
  },
};

export default Picker;
