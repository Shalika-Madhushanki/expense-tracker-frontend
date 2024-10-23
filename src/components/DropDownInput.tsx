import React from "react";

interface DropDownInputProps {
  name: string;
  label: string;
  optionsList: OptionItem[];
  value: string;
  onChangeHandler: (value: OptionItem) => void;
  className: string;
}
interface OptionItem {
  name: string;
  value: string;
}

const DropDownInput: React.FC<DropDownInputProps> = ({
  name,
  label,
  optionsList,
  value,
  onChangeHandler,
  className,
}) => {
  return (
    <div>
      <label className={className}>
        {label} :
        <select
          name={name}
          value={value}
          onChange={onChangeHandler}
          className={`${className}-input`}
        >
          {optionsList.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};

export default DropDownInput;
