import cn from "classnames";
import React, { useState } from "react";
/* @TODO: Add this font globally */
import "@fontsource/merriweather";

const TileEditBreadcrumbs = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeMiterlimit="10"
    clipRule="evenodd"
    viewBox="0 0 1000 1000"
    style={{
      transform: "rotate(90deg)",
      height: "20px",
    }}
  >
    <g fill="#22555A">
      <path d="M115.104 498.827c0-41.24 33.431-74.672 74.671-74.672 41.24 0 74.672 33.432 74.672 74.672 0 41.24-33.432 74.671-74.672 74.671-41.24 0-74.671-33.431-74.671-74.671zM426.622 498.827c0-41.24 33.431-74.672 74.671-74.672 41.24 0 74.672 33.432 74.672 74.672 0 41.24-33.432 74.671-74.672 74.671-41.24 0-74.671-33.431-74.671-74.671zM738.14 498.827c0-41.24 33.432-74.672 74.672-74.672 41.24 0 74.671 33.432 74.671 74.672 0 41.24-33.431 74.671-74.671 74.671-41.24 0-74.672-33.431-74.672-74.671z"></path>
    </g>
  </svg>
);

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 10 11"
    fill="none"
  >
    <path
      d="M2.08333 8.41659H2.66667L6.26042 4.82284L5.67708 4.2395L2.08333 7.83325V8.41659ZM8.04167 4.21867L6.27083 2.46867L6.85417 1.88534C7.01389 1.72561 7.21007 1.64575 7.44271 1.64575C7.67535 1.64575 7.87153 1.72561 8.03125 1.88534L8.61458 2.46867C8.77431 2.62839 8.85764 2.8211 8.86458 3.04679C8.87153 3.27249 8.79514 3.4652 8.63542 3.62492L8.04167 4.21867ZM7.4375 4.83325L3.02083 9.24992H1.25V7.47909L5.66667 3.06242L7.4375 4.83325ZM5.96875 4.53117L5.67708 4.2395L6.26042 4.82284L5.96875 4.53117Z"
      fill="#22555A"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 10 11"
    fill="none"
  >
    <path
      d="M2.91669 9.25C2.68752 9.25 2.49134 9.1684 2.32815 9.00521C2.16495 8.84201 2.08335 8.64583 2.08335 8.41667V3H1.66669V2.16667H3.75002V1.75H6.25002V2.16667H8.33335V3H7.91669V8.41667C7.91669 8.64583 7.83509 8.84201 7.6719 9.00521C7.5087 9.1684 7.31252 9.25 7.08335 9.25H2.91669ZM7.08335 3H2.91669V8.41667H7.08335V3ZM3.75002 7.58333H4.58335V3.83333H3.75002V7.58333ZM5.41669 7.58333H6.25002V3.83333H5.41669V7.58333Z"
      fill="#EF6767"
    />
  </svg>
);

interface ITileEditMenu {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  options: { name: string; onClick: React.MouseEventHandler }[];
}

function TileEditMenu({ visible, setVisible, options }: ITileEditMenu) {
  return (
    <div
      className={cn(
        visible ? "flex" : "hidden",
        "absolute z-10 flex-col rounded bg-white text-center drop-shadow-md"
      )}
      style={{ borderRadius: "6px", paddingInline: "10px" }}
    >
      <form method="dialog">
        {options.map((option, index) => (
          <>
            <button
              key={option.name}
              className="w-full p-2 px-4 hover:bg-offer-white"
              style={{
                color: options[0] === option ? "#22555A" : "#EF6767",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onClick={(e) => {
                option.onClick(e);
                setVisible(false);
              }}
            >
              <span
                style={{
                  marginRight: "20px",
                  fontFamily: "Merriweather",
                }}
              >
                {option.name}
              </span>
              {options[0] === option ? EditIcon() : TrashIcon()}
            </button>
            {index !== options.length - 1 && <hr />}
          </>
        ))}
      </form>
    </div>
  );
}

export interface TileEditProps {
  options: { name: string; onClick: React.MouseEventHandler }[];
}

export function TileEdit({ options }: TileEditProps) {
  const [visible, setVisible] = useState(false);

  return options.length > 0 ? (
    <div
      // className="absolute right-0 top-0 w-auto p-1"
      onMouseLeave={() => {
        setVisible(false);
      }}
    >
      <button
        onClick={() => setVisible(true)}
        type="button"
        className="relative"
      >
        <TileEditBreadcrumbs />
      </button>
      <TileEditMenu
        visible={visible}
        setVisible={setVisible}
        options={options}
      />
    </div>
  ) : null;
}
