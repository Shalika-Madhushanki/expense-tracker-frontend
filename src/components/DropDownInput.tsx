import React from "react";

const DropDownInput: React.FC = ({
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
