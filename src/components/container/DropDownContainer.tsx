"use client";

import React from "react";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DropDownContainerProps {
  classname?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
}

const DropDownContainer = (props: DropDownContainerProps) => {
  const [showItems, setShowItems] = React.useState(true);

  const handleClick = () => {
    setShowItems(!showItems);
  };

  return (
    <div className={props.classname ?? ""}>
      <div className="flex cursor-pointer" onClick={handleClick}>
        <div className="pr-2">
          <FontAwesomeIcon
            className="fa-fw"
            icon={showItems ? faCaretDown : faCaretRight}
          />
        </div>
        {props.title}
      </div>
      <div
        className={`overflow-auto ${
          showItems ? "h-fit max-h-[512px] pb-4 md:max-h-[1024px]" : "max-h-0"
        }`}
        style={
          showItems
            ? { transition: "max-height 0.3s ease" }
            : { transition: "max-height 0.1s ease" }
        }
      >
        {props.children}
      </div>
    </div>
  );
};

export default DropDownContainer;
