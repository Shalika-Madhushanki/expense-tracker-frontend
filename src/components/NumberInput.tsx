import React from "react";
import { Space, Input } from "antd-mobile";

interface NumberInputProps {
  onChangeHandler: (value: number) => void;
  label: string;
  placeholder: string;
  value: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  placeholder,
  value,
  onChangeHandler,
  ...rest
}) => {
  return (
    <Space direction="vertical" style={styles.container}>
      <div style={styles.label}>{label}</div>
      <Space block direction="horizontal" align="center">
        <p style={styles.icon}>€</p>

        <Input
          style={styles.textInput}
          placeholder={placeholder}
          value={value}
          onChange={onChangeHandler}
          rows={1}
          type="number"
          {...rest}
        />
      </Space>
    </Space>
  );
};

const styles = {
  container: {
    width: "40%",
  },
  label: {
    fontSize: "16px",
    color: "#999",
    marginBottom: -10,
  },
  icon: {
    paddingLeft: 5,
    paddingRight: 10,
    fontSize: 22,
    color: "#999",
  },
  textInput: {
    width: "40%",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
  },
};

export default NumberInput;
