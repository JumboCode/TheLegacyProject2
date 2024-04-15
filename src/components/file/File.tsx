"use client";

import { File } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { formatFileDate } from "@utils";
import FileTile from "./FileTile";
import { TileEdit } from "@components/TileGrid";
import { useApiThrottle } from "@hooks";
import { deleteFile } from "@api/file/[fileId]/route.client";
import { useRouter } from "next/navigation";
import { Spinner } from "@components/skeleton";
import React from "react";

interface FileProps {
  file: File;
  setFileEdit?: React.Dispatch<React.SetStateAction<File | undefined>>;
}

const File = ({ file, setFileEdit }: FileProps) => {
  const { url, Tags } = file;

  const router = useRouter();

  const { fetching: fetchingDeleteFile, fn: throttleDeleteFile } =
    useApiThrottle({
      fn: deleteFile,
      callback: () => router.refresh(),
    });

  const fetching = fetchingDeleteFile;
  const editable = setFileEdit != undefined;

  return (
    <FileTile className="bg-dark-teal">
      <div className="flex h-full flex-col items-start gap-y-2.5 px-4 pb-6 pt-3">
        <div className="flex h-12 w-full items-center justify-between">
          <a href={url} rel="noopener noreferrer" target="_blank">
            <FontAwesomeIcon icon={faFile} color="white" size="xl" />
          </a>
          {fetching ? (
            <Spinner width={8} height={8} />
          ) : editable ? (
            <TileEdit
              options={[
                {
                  name: "Edit",
                  color: "#22555A",
                  onClick: () => setFileEdit(file),
                  icon: <FontAwesomeIcon icon={faPencil} />,
                },
                {
                  name: "Delete",
                  color: "#EF6767",
                  onClick: async (e) => {
                    e.preventDefault();
                    await throttleDeleteFile({ fileId: file.id });
                  },
                  icon: <FontAwesomeIcon icon={faTrashCan} />,
                },
              ]}
              editIconProps={{ className: "text-white" }}
            />
          ) : null}
        </div>
        <a
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          className="flex w-full flex-col items-start gap-y-2.5"
        >
          <h1 className="text-lg text-white">{formatFileDate(file.date)}</h1>
          {Tags.map((tag, idx) => (
            <div
              key={idx}
              className="w-full overflow-hidden truncate rounded-lg bg-[#F5F0EA] py-[3px] pl-2.5 text-sm text-dark-teal"
            >
              {tag}
            </div>
          ))}
        </a>
      </div>
    </FileTile>
  );
};

export default File;
