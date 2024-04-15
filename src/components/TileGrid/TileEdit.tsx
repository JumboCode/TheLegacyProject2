import cn from "classnames";
import React, { useEffect, useRef, useState } from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const Icons = [
  {
    name: "edit",
    path: "M2.08333 8.41659H2.66667L6.26042 4.82284L5.67708 4.2395L2.08333 7.83325V8.41659ZM8.04167 4.21867L6.27083 2.46867L6.85417 1.88534C7.01389 1.72561 7.21007 1.64575 7.44271 1.64575C7.67535 1.64575 7.87153 1.72561 8.03125 1.88534L8.61458 2.46867C8.77431 2.62839 8.85764 2.8211 8.86458 3.04679C8.87153 3.27249 8.79514 3.4652 8.63542 3.62492L8.04167 4.21867ZM7.4375 4.83325L3.02083 9.24992H1.25V7.47909L5.66667 3.06242L7.4375 4.83325ZM5.96875 4.53117L5.67708 4.2395L6.26042 4.82284L5.96875 4.53117Z",
    fill: "#22555A",
  },
  {
    name: "trash",
    path: "M2.91669 9.25C2.68752 9.25 2.49134 9.1684 2.32815 9.00521C2.16495 8.84201 2.08335 8.64583 2.08335 8.41667V3H1.66669V2.16667H3.75002V1.75H6.25002V2.16667H8.33335V3H7.91669V8.41667C7.91669 8.64583 7.83509 8.84201 7.6719 9.00521C7.5087 9.1684 7.31252 9.25 7.08335 9.25H2.91669ZM7.08335 3H2.91669V8.41667H7.08335V3ZM3.75002 7.58333H4.58335V3.83333H3.75002V7.58333ZM5.41669 7.58333H6.25002V3.83333H5.41669V7.58333Z",
    fill: "#EF6767",
  },
];

interface ITileEditMenu {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  options: {
    name: React.ReactNode;
    onClick: React.MouseEventHandler;
    color: string;
    icon: React.ReactNode;
  }[];
  icons: { name: string; path: string; fill: string }[];
}

function TileEditMenu({ visible, setVisible, options, icons }: ITileEditMenu) {
  return (
    <div
      className={cn(
        visible ? "flex" : "hidden",
        "absolute right-0 z-10 flex-col rounded-[6px] bg-white text-center drop-shadow-md"
      )}
    >
      <form method="dialog">
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <button
              className="w-full rounded-md px-4 py-2 hover:bg-offer-white"
              style={{
                color: option.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onClick={(e) => {
                option.onClick(e);
                setVisible(false);
              }}
            >
              <span className="mr-4 whitespace-nowrap">{option.name}</span>
              {option.icon}
            </button>
            {index !== options.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </form>
    </div>
  );
}

export interface TileEditProps {
  options: {
    name: React.ReactNode;
    onClick: React.MouseEventHandler;
    color: string;
    icon: React.ReactNode;
  }[];
  editIconProps?: Omit<FontAwesomeIconProps, "icon">;
}

export function TileEdit({
  options,
  editIconProps = { className: "cursor-pointer" },
}: TileEditProps) {
  const [visible, setVisible] = useState(false);

  const tileEditRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tileEditRef.current &&
        !tileEditRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };

    // Adding event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Cleaning up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return options.length > 0 ? (
    <div ref={tileEditRef} className="relative">
      <button onClick={() => setVisible(!visible)} type="button">
        <FontAwesomeIcon icon={faEllipsisVertical} {...editIconProps} />
      </button>
      <TileEditMenu
        visible={visible}
        setVisible={setVisible}
        options={options}
        icons={Icons}
      />
    </div>
  ) : null;
}
