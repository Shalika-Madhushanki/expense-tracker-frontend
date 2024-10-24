import React from "react";
import { Space, TextArea } from "antd-mobile";

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeHandler: (value: string) => void;
}
const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeHandler,
  ...rest
}) => {
  return (
    <Space block direction="vertical" style={styles.container}>
      <div style={styles.label}>{label}</div>
      <TextArea
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        autoSize
        rows={1}
        {...rest}
      />
    </Space>
  );
};

const styles = {
  container: {
    marginBottom: 15,
    paddingRight: 10,
    marginRight: 10,
  },
  label: {
    fontSize: "16px",
    color: "#999",
  },
  textInput: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
  },
};

export default TextInput;
