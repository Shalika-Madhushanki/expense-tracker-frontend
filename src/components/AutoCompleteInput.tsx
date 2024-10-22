import React from "react";
import DropdownEntry from "./DropdownEntry";

const AutoCompleteInput: React.FC = ({
  data = [],
  onChangeHandler,
  searchTerm,
  handleOnSelect,
}) => {

  return (
    <div className="dropdown is-active">
      <div className="dropdown-trigger"></div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <div className="field dropdown-item">
            <div className="control has-icons-left">
              <input
                onChange={onChangeHandler}
                type="text"
                value={searchTerm}
                placeholder="Your search term"
                className="input is-transparent"
              />
              <span className="icon is-left">
                <i className="fa fa-search"></i>
              </span>
            </div>
          </div>
          <hr className="dropdown-divider" />
          {data.length > 0 &&
            data.map((item, index) => {
              return (
                <DropdownEntry
                  onSelectInput={handleOnSelect}
                  key={index}
                  text={item.name}
                ></DropdownEntry>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AutoCompleteInput;
