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
  );
};

export default FileTile;
