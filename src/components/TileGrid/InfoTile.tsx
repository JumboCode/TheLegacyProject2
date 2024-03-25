"use client";

import Link from "next/link";
import React from "react";

interface Information {
  key: string;
  value: string | number;
}

interface InfoTileProps {
  title: string;
  information: Information[];
  topRightButton?: React.ReactNode;
  moreInformation?: React.ReactNode;
  href?: string;
}

/**
 * Displays a tile with the given information.
 *
 * @param information An array of key-value pairs. Each row of the tile display 2 information, as specified by the order
 * in the array
 * @param moreInformation If present, will display a "show more" option that expands on click
 */
const InfoTile = (params: InfoTileProps) => {
  const { title, information, topRightButton, moreInformation, href } = params;

  const [shouldShowMore, setShouldShowMore] = React.useState(false);

  const onToggleShouldShowMore = () => {
    setShouldShowMore(!shouldShowMore);
  };

  return (
    <div className="flex h-fit w-full flex-col gap-y-4 rounded-lg bg-white p-6 shadow-lg">
      <div className="relative flex justify-between">
        <Link
          href={href ?? ""}
          className={`href ? "" : "cursor-default" truncate`}
        >
          <h1 className="text-2xl font-bold text-dark-teal">{title}</h1>
        </Link>
        {topRightButton ?? null}
      </div>
      <div className="h-[1px] w-full bg-dark-teal" />
      <div className="grid grid-cols-12 gap-x-2 gap-y-4">
        {information.map((info, idx) => (
          <div key={idx} className="col-span-12 md:col-span-6">
            <div className="flex flex-col">
              <div className="truncate text-sm text-[#515151]">{info.key}</div>
              <div className="truncate font-bold">{info.value}</div>
            </div>
          </div>
        ))}
      </div>
      {moreInformation != undefined ? (
        <div>
          <p
            className="mb-6 w-fit cursor-pointer text-dark-teal underline"
            onClick={onToggleShouldShowMore}
          >
            {!shouldShowMore ? "Show more" : "Show less"}
          </p>
          {shouldShowMore ? moreInformation : null}
        </div>
      ) : null}
    </div>
  );
};

export default InfoTile;
