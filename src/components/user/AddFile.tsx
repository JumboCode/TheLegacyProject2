"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { TagProps, tagList } from "@components/Tag";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createFile } from "@api/file/route.client";
import { File as PrismaFile } from "@prisma/client";
import { Popup } from "@components/container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useApiThrottle } from "@hooks";
import { updateFile } from "@api/file/[fileId]/route.client";

type AddFileProps = {
  showAddFilePopUp: boolean;
  setShowAddFilePopUp: Dispatch<SetStateAction<boolean>>;
  seniorId: string;
  files: PrismaFile[];
  folder: string;
  editFile?: PrismaFile;
  setEditFile: React.Dispatch<React.SetStateAction<PrismaFile | undefined>>;
};

const TagOptions = ({
  selectedTags,
  setSelectedTags,
}: {
  selectedTags: TagProps[];
  setSelectedTags: React.Dispatch<React.SetStateAction<TagProps[]>>;
}) => {
  return (
    <div className="flex grid-flow-row flex-wrap">
      {tagList.map((tag) => (
        <div key={tag.name}>
          <input
            type="checkbox"
            id={tag.name}
            className="size-40 my-5 hidden"
            onClick={() => {
              if (!selectedTags.includes(tag) && selectedTags.length < 3) {
                setSelectedTags([...selectedTags, tag]);
              } else {
                setSelectedTags(selectedTags.filter((i) => i != tag));
              }
            }}
          />
          <label
            htmlFor={tag.name}
            className={`${
              selectedTags.includes(tag)
                ? "bg-white text-[#22555A]"
                : "hover:bg-white hover:text-[#22555A]"
            } m-2 ml-[-2px] inline-block rounded-full border-2 
            p-2`}
          >
            {tag.name}
          </label>
        </div>
      ))}
    </div>
  );
};

const TagSelector = ({
  selectedTags,
  setSelectedTags,
}: {
  selectedTags: TagProps[];
  setSelectedTags: React.Dispatch<React.SetStateAction<TagProps[]>>;
}) => {
  return (
    <div>
      <div className="text-neutral-600 mb-1 h-[34px] w-full font-['merriweather'] text-2xl">
        Tags
      </div>
      <div className="text-lg font-thin">
        Select min of 1, max of 3 <span className="text-red-400">*</span>
      </div>
      <TagOptions
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
    </div>
  );
};

const AddFile = ({
  showAddFilePopUp,
  setShowAddFilePopUp,
  seniorId,
  files,
  editFile,
  setEditFile,
}: AddFileProps) => {
  const currFiles = Object.values(files);
  const excludeDates = currFiles.map((fileObj) => fileObj.date);
  const excludedDatesString = excludeDates
    .map((dateObj) => dateObj.toDateString())
    .filter((date) => editFile?.date.toDateString() !== date ?? true);

  const [startDate, setStartDate] = useState(() => new Date());

  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<TagProps[]>([]);

  const handleResetState = () => {
    setStartDate(new Date());
    setSelectedTags([]);
    setShowAddFilePopUp(!showAddFilePopUp);
    setEditFile(undefined);
  };

  const { fetching: fetchingCreateFile, fn: throttledCreateFile } =
    useApiThrottle({
      fn: createFile,
      callback: (res) => {
        if (res.code === "SUCCESS") {
          handleResetState();
          router.refresh();
        } else {
          setError(true);
        }
      },
    });
  const { fetching: fetchingUpdateFile, fn: throttleUpdateFile } =
    useApiThrottle({
      fn: updateFile,
      callback: (res) => {
        if (res.code === "SUCCESS_UPDATE") {
          handleResetState();
          router.refresh();
        } else {
          setError(true);
        }
      },
    });

  const fetching = fetchingCreateFile || fetchingUpdateFile;

  React.useEffect(() => {
    if (editFile != undefined) {
      setStartDate(editFile.date);
      setSelectedTags(
        tagList.filter((tag) => editFile.Tags.includes(tag.name))
      );
    }
  }, [editFile]);

  if (!showAddFilePopUp) {
    return null;
  }

  return !error ? (
    <Popup className="h-[32rem] w-full overflow-y-auto sm:h-[44rem] sm:w-[36rem]">
      <div className="flex-col justify-between rounded-[16px] text-white">
        <div className="mb-5 mt-4 text-3xl font-bold"> Create New File</div>
        <div className="text-neutral-600 mb-3 h-[34px] w-full text-2xl font-thin">
          Select Date
        </div>
        <div className="inline-bl w-full">
          <div className="text-2xl text-[#22555A]">
            <DatePicker
              showIcon
              icon={
                <FontAwesomeIcon icon={faCalendar} className="text-dark-teal" />
              }
              wrapperClassName="w-full relative"
              calendarIconClassname="text-3xl text-blue-600 mt-[7px] absolute right-2"
              className="mb-4 h-16 w-full cursor-pointer rounded-lg pl-4"
              selected={startDate}
              onChange={(date) => date && setStartDate(date)}
              dateFormat="dd MMMM yyyy"
              excludeDates={excludeDates}
            />
            {excludedDatesString.includes(startDate.toDateString()) ? (
              <p className="text-center text-xs text-red-400">
                ***ERROR: Please pick a date that you have not created a file
                for***
              </p>
            ) : null}
          </div>
        </div>
        <TagSelector
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <div className="flex w-full flex-row justify-center">
          <button
            className="mx-2 my-4 w-full max-w-[9rem] rounded-[16px] bg-white p-3 text-2xl font-medium text-[#22555A] drop-shadow-md hover:bg-offer-white"
            onClick={handleResetState}
          >
            Cancel
          </button>
          <button
            className="mx-2 my-4 w-full max-w-[9rem] rounded-[16px] p-3 text-2xl font-medium text-[#22555A] drop-shadow-md hover:bg-offer-white enabled:bg-white disabled:bg-gray-500 disabled:text-gray-700"
            disabled={
              selectedTags.length == 0 ||
              excludedDatesString.includes(startDate.toDateString())
            }
            onClick={async () => {
              editFile == null
                ? await throttledCreateFile({
                    body: {
                      date: startDate,
                      filetype: "Google Document",
                      url: "",
                      Tags: selectedTags.map((tagProp) => tagProp.name),
                      seniorId: seniorId,
                    },
                  })
                : await throttleUpdateFile({
                    fileId: editFile.id,
                    body: {
                      ...editFile,
                      date: startDate,
                      Tags: selectedTags.map((tagProp) => tagProp.name),
                    },
                  });
            }}
          >
            {fetching ? "Loading..." : editFile == null ? "Create" : "Update"}
          </button>
        </div>
      </div>
    </Popup>
  ) : (
    <Popup>
      <div className="flex h-full flex-col items-center justify-between text-white">
        <span className="text-lg">
          There was an error adding your file. Please reach out to your club
          administrator for assistance.
        </span>
        <button
          className="w-full max-w-[10rem] rounded bg-white p-3 font-serif font-normal text-dark-teal"
          onClick={handleResetState}
        >
          Confirm
        </button>
      </div>
    </Popup>
  );
};

export default AddFile;
