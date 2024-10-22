/* eslint-disable react/prop-types */
import React from 'react';
const DropdownEntry = ({ text, onSelectInput }) => {
  return <a onClick = {()=>onSelectInput(text)} className="dropdown-item">{text}</a>;
};

export default DropdownEntry;
