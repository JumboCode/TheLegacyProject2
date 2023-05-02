import { File } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

export interface ITagProps {
  name: string;
  color: string;
}

const Tag = ({ name, color }: ITagProps) => {
  return (
    <div
      className={`${color} h-15 w-fit whitespace-nowrap rounded-lg py-2 px-3 text-center text-off-white`}
    >
      <span className=""> {name} </span>
    </div>
  );
};

export type IFileCardProps = Pick<
  File,
  "id" | "name" | "lastModified" | "url" | "Tags"
>;

const FileCard = ({
  id,
  name,
  lastModified: intialLastModified,
  url,
  Tags,
}: IFileCardProps) => {
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
      // TODAY
      dateString =
        "today at " + lastModified.toLocaleTimeString(undefined, timeOptions);
    }
    if (
      lastModified.getDay() == currentDate.getDay() - 1 &&
      lastModified.getHours() > currentDate.getHours()
    ) {
      // YESTERDAY
      dateString =
        "yesterday at " +
        lastModified.toLocaleTimeString(undefined, timeOptions);
    }
  } else {
    // ALL OTHER TIMES
    dateString = lastModified.toLocaleDateString(undefined, dateOptions);
  }

  return (
    <div className="flex aspect-square flex-col justify-between rounded-lg border bg-off-white p-5 text-left font-sans drop-shadow-md hover:cursor-pointer hover:bg-taupe-hover">
      <div className="flex flex-col">
        <span className="mb-1 text-lg font-semibold"> {name} </span>
        <a
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          onClick={async () => {
            const date = new Date();
            setLastModified(date);
            const res = await fetch(`/api/file/${id}/update`, {
              method: "POST",
            });
            const newFile = await res.json();
            if (newFile.error) {
              console.error(newFile.error);
              return;
            }
            setLastModified(new Date(newFile.lastModified));
          }}
        >
          <span className="mb-1 w-[20px] text-slate-400 hover:text-purple-800">
            Link
          </span>
        </a>
        <span> Last opened {dateString} </span>
      </div>
      {/* Row of Tags */}
      <div className="flex flex-row flex-nowrap gap-2 overflow-x-scroll">
        {Tags.map((name) => (
          <div key={name} className="">
            <Tag name={name} color={"bg-tag-rust"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileCard;
