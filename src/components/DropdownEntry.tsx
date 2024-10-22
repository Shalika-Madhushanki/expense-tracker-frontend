import React from "react";
const DropdownEntry: React.FC = ({ text, onSelectInput }) => {
  return (
    <a onClick={() => onSelectInput(text)} className="dropdown-item">
      {text}
    </a>
  );
};

export default DropdownEntry;
