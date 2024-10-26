import React from "react";
import { LeftOutline, MoreOutline } from "antd-mobile-icons";

interface PageHeaderProps {
  headerText: string;
  onLeftActionClickHandler?: () => void;
  onRightActionClickHandler?: () => void;
}
const PageHeader: React.FC<PageHeaderProps> = ({
  onLeftActionClickHandler,
  onRightActionClickHandler,
  headerText,
}) => {
  return (
    <div className="top-section-child page-header">
      <div className="back-action">
        <LeftOutline onClick={onLeftActionClickHandler} className="icon" />
      </div>
      <div className="header-text">
        <h2>{headerText}</h2>
      </div>
      <div className="some-action">
        <MoreOutline
          onClick={onRightActionClickHandler}
          className="icon"
          style={{ transform: "rotate(90deg)" }}
        />
      </div>
    </div>
  );
};
export default PageHeader;
