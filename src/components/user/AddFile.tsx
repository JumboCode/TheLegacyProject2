"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import FilterDropdown from "@components/FilterDropdown";
import Tag, { TagProps, tagList } from "@components/Tag";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createFile } from "@api/file/route.client";
import { File as PrismaFile, Prisma } from "@prisma/client";
import { Checkbox, button } from "@material-tailwind/react";
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

type AddFileProps = {
  showAddFilePopUp: boolean;
  setShowAddFilePopUp: Dispatch<SetStateAction<boolean>>;
  seniorId: string;
  files: PrismaFile[];
  folder: string;
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
            className="size-40 peer my-5 hidden"
            onClick={() => {
              if (!selectedTags.includes(tag) && selectedTags.length < 3) {
                setSelectedTags([...selectedTags, tag]);
              } else {
                setSelectedTags(selectedTags.filter((i) => i != tag));
              }
            }}
          />
          {!selectedTags.includes(tag) && (
            <label
              htmlFor={tag.name}
              className="m-2 ml-[-2px] inline-block rounded-full border-2 p-2 hover:bg-white hover:text-[#22555A]"
            >
              {" "}
              {tag.name}
            </label>
          )}
          {selectedTags.includes(tag) && (
            <label
              htmlFor={tag.name}
              className="m-2 ml-[-2px] inline-block rounded-full border-2 bg-white p-2 text-[#22555A]"
            >
              {" "}
              {tag.name}
            </label>
          )}
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
  folder,
}: AddFileProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [confirm, setConfirm] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<TagProps[]>([]);

  const handleCancel = () => {
    setShowAddFilePopUp(!showAddFilePopUp);
  };

  const callAddFile = async () => {
    const response = await createFile({
      body: {
        date: startDate,
        filetype: "Google Document",
        url: "",
        Tags: selectedTags.map((tagProp) => tagProp.name),
        seniorId: seniorId,
      },
    });

    if (response.code == "SUCCESS") {
      setConfirm(true);
    } else {
      setError(true);
    }
  };
  const currFiles = Object.values(files);
  const excludeDates = currFiles.map((fileObj) => fileObj.date);

  return (
    <>
      {showAddFilePopUp && (
        // need to check for all screens
        <div className="absolute z-50 ml-[-350px] mt-[-470px] flex h-screen w-screen flex-row place-content-center items-start justify-center backdrop-blur-[2px] backdrop-brightness-75 ">
          {!confirm && !error ? (
            <div className="mt-20 flex h-2/3 w-2/5 flex-col justify-between rounded-[16px] bg-[#22555A] p-10 font-['merriweather'] text-white">
              <div className="mb-5 mt-4 text-3xl font-bold">
                {" "}
                Create New File{" "}
              </div>
              <div className="text-neutral-600 mb-3 h-[34px] w-full text-2xl font-thin">
                Select Date
              </div>
              <DatePicker
                className="mb-4 h-16 w-full rounded-lg pl-[30px] font-['merriweather'] text-2xl text-[#22555A]"
                selected={startDate}
                onChange={(date) => date && setStartDate(date)}
                dateFormat="dd MMMM yyyy"
                excludeDates={excludeDates}
              />
              <FontAwesomeIcon icon={faCalendar} />
              <TagSelector
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
              <div className="flex w-full flex-row justify-center">
                <button
                  className="mx-2 my-4 w-full max-w-[9rem] rounded-[16px] bg-white p-3 text-2xl font-medium text-[#22555A] drop-shadow-md hover:bg-offer-white"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="mx-2 my-4 w-full max-w-[9rem] rounded-[16px] p-3 text-2xl font-medium text-[#22555A] drop-shadow-md hover:bg-offer-white enabled:bg-white disabled:bg-gray-500 disabled:text-gray-700"
                  disabled={selectedTags.length == 0}
                  onClick={callAddFile}
                >
                  Create
                </button>
              </div>
            </div>
          ) : (
            <>
              {confirm ? (
                <div className="h-[250px] max-w-[35%] flex-row flex-col place-content-center gap-y-10 self-center rounded-lg bg-white p-10 text-center text-lg">
                  <span>File added successfully!</span>
                  <div className="flex w-full flex-row justify-center">
                    <button
                      className="bg-legacy-teal text-md mx-1 w-full max-w-[10rem] rounded p-3 font-serif font-normal text-white hover:bg-dark-teal"
                      onClick={() => setShowAddFilePopUp(false)}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex h-[250px] max-w-[35%] flex-col place-content-center gap-y-10 self-center rounded-lg bg-white p-10 text-center text-lg">
                  <span>
                    There was an error adding your file. Please reach out to
                    your club administrator for assistance.
                  </span>
                  <div className="flex w-full flex-row justify-center">
                    <button
                      className="bg-legacy-teal text-md disabled: mx-1 w-full max-w-[10rem] rounded p-3 font-serif font-normal text-white hover:bg-dark-teal"
                      onClick={() => setShowAddFilePopUp(false)}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AddFile;
