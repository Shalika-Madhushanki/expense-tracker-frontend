import React from "react";

interface DropdownEntryProps {
  text: string;
  onSelectInput: (value: string) => void;
}
const DropdownEntry: React.FC<DropdownEntryProps> = ({
  text,
  onSelectInput,
}) => {
  return (
    <a onClick={() => onSelectInput(text)} className="dropdown-item">
      {text}
    </a>
  );
};

export default DropdownEntry;
