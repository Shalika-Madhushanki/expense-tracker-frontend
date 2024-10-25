import React from "react";
import { LeftOutline } from "antd-mobile-icons";

interface PageHeaderProps {
  headerText: string;
  onClickHandler: () => void;
}
const PageHeader: React.FC<PageHeaderProps> = ({
  onClickHandler,
  headerText,
}) => {
  return (
    <div className="top-section-child page-header">
      <div className="back-action">
        <LeftOutline onClick={onClickHandler} className="icon" />
      </div>
      <div className="header-text">
        <h2>{headerText}</h2>
      </div>
      <div className="some-action"></div>
    </div>
  );
};
export default PageHeader;
