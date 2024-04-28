"use client";

import React from "react";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DropDownContainerProps {
  containerClassName?: string;
  elementsClassName?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  defaultExpand?: boolean;
}

const DropDownContainer = (props: DropDownContainerProps) => {
  const [showItems, setShowItems] = React.useState(props.defaultExpand ?? true);
  const animationDivRef = React.useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowItems(!showItems);
    if (animationDivRef.current) {
      // Prevent scroll bar from rendering
      animationDivRef.current.style["overflow"] = "hidden";
    }
  };

  return (
    <div className={props.containerClassName ?? ""}>
      <div className="flex cursor-pointer" onClick={handleClick}>
        <div className="pr-2">
          <FontAwesomeIcon
            className="fa-fw"
            icon={showItems ? faCaretDown : faCaretRight}
          />
        </div>
        {props.title ?? (
          <p className="w-fit cursor-pointer text-dark-teal underline">
            Show more
          </p>
        )}
      </div>
      <div
        ref={animationDivRef}
        className={`overflow-hidden py-2 ${
          showItems ? "max-h-[512px] md:max-h-[1024px]" : "max-h-0"
        }`}
        style={
          showItems
            ? { transition: "max-height 1s ease" }
            : { transition: "max-height 0.3s ease" }
        }
        onTransitionEnd={(ref) =>
          (ref.currentTarget.style["overflow"] = "auto")
        }
      >
        <div className={props.elementsClassName ?? ""}>{props.children}</div>
      </div>
    </div>
  );
};

export default DropDownContainer;
