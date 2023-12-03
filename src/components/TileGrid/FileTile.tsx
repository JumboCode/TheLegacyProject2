"use client";

import { File } from "@prisma/client";
import { useState } from "react";
import Tag, { tagMap } from "../Tag";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

export type IFileTileProps = Pick<
  File,
  "id" | "name" | "lastModified" | "url" | "Tags"
>;

const FileTile = ({
  id,
  name,
  lastModified: intialLastModified,
  url,
  Tags,
}: IFileTileProps) => {
  const [lastModified, setLastModified] = useState(intialLastModified);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const currentDate = new Date();
  let dateString = "";

  if (
    lastModified.getFullYear() == currentDate.getFullYear() &&
    lastModified.getMonth() == currentDate.getMonth()
  ) {
    if (
      lastModified.getDay() == currentDate.getDay() &&
      lastModified.getHours() <= currentDate.getHours()
    ) {
      // Today
      dateString =
        "today at " + lastModified.toLocaleTimeString(undefined, timeOptions);
    }
    if (
      lastModified.getDay() == currentDate.getDay() - 1 &&
      lastModified.getHours() > currentDate.getHours()
    ) {
      // Yesterday
      dateString =
        "yesterday at " +
        lastModified.toLocaleTimeString(undefined, timeOptions);
    }
  } else {
    // All other times
    dateString = lastModified.toLocaleDateString(undefined, dateOptions);
  }

  return (
    <Link href={url}>
      <div className="flex h-56 w-48 flex-col items-start gap-y-2.5 rounded-lg bg-dark-teal px-4 py-6">
        <FontAwesomeIcon icon={faFile} color="white" size="xl" />
        <h1 className="mb-1 text-white">
          {new Date().toISOString().split("T")[0]}
        </h1>
        {Tags.map((tag, idx) => (
          <div
            key={idx}
            className="w-full overflow-hidden truncate rounded-lg bg-[#F5F0EA] py-[3px] pl-2.5 text-sm text-dark-teal"
          >
            {tag}
          </div>
        ))}
      </div>
    </Link>
    //     <div className="relative w-auto flex flex-col flex-nowrap aspect-square justify-center items-center rounded \  bg-white hover:bg-off-white text-base drop-shadow-md">
    // <div className="flex aspect-square flex-col rounded bg-white p-8 text-left font-sans drop-shadow-md hover:cursor-pointer hover:bg-off-white">
    //   <Link href={url ?? "/home"}>
    //     <div className="flex flex-col">
    //       <span className="mb-2 text-lg font-semibold"> {name} </span>
    //       <a
    //         href={url}
    //         rel="noopener noreferrer"
    //         target="_blank"
    //         onClick={async () => {
    //           const date = new Date();
    //           setLastModified(date);
    //           const res = await fetch(`/api/file/${id}/update`, {
    //             method: "POST",
    //           });
    //           const newFile = await res.json();
    //           if (newFile.error) {
    //             console.error(newFile.error);
    //             return;
    //           }
    //           setLastModified(new Date(newFile.lastModified));
    //         }}
    //       ></a>
    //       <span> Opened {dateString} </span>
    //       {/* Row of Tags */}
    //       <div className="justify-left mt-20 flex flex-row gap-x-2 overflow-scroll">
    //         {Tags.map((name, i) => (
    //           <Tag key={i} name={name} color={tagMap.get(name) ?? ""} />
    //         ))}
    //       </div>
    //     </div>
    //   </Link>
    // </div>
  );
};

export default FileTile;
