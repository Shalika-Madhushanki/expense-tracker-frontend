import React, { useState } from "react";
import { Button, ActionSheet } from "antd-mobile";

const Picker: React.FC = ({ data, items, instruction, label, onSelect }) => {
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
