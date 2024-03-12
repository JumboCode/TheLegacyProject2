"use client";

import SearchableContainer from "@components/SearchableContainer";
import { File as PrismaFile, Prisma } from "@prisma/client";
import { formatFileDate } from "@utils";
import { File } from "@components/file";
import AddFile from "@components/file/AddFile";
import { v4 as uuid } from "uuid";
import Assigment from "./assignment";

interface DisplayProps {
  editable: boolean;
  canAddFile: boolean;
  senior: Prisma.SeniorGetPayload<{
    include: { Files: true; chapter: { include: { students: true } } };
  }>;
}

// TODO(nickbar0123) - Remove mock data
const FILES: PrismaFile[] = [
  {
    id: "1",
    date: new Date("2023-11-20"),
    filetype: "",
    url: "https://www.google.com/",
    seniorId: "",
    Tags: ["Early Childhood", "Adolecense", "Marriage"],
  },
  {
    id: "2",
    date: new Date("2023-01-20"),
    filetype: "",
    url: "https://www.google.com/",
    seniorId: "",
    Tags: ["Marriage"],
  },
  {
    id: "3",
    date: new Date("2020-12-20"),
    filetype: "",
    url: "https://www.google.com/",
    seniorId: "",
    Tags: ["Parenthood & family"],
  },
];

const DisplaySenior = (props: DisplayProps) => {
  const { editable, canAddFile, senior } = props;
  const addFileId = uuid();

  return (
    <div className="flex flex-col gap-y-6">
      {/* @TODO - Firstname + lastname */}
      <h1 className="text-4xl font-bold text-[#000022]">{`${senior.firstname} ${senior.lastname}`}</h1>
      <p>{senior.description}</p>
      <Assigment editable={editable} senior={senior} />
      <SearchableContainer
        display={(file) => <File key={file.id} file={file} />}
        elements={FILES} // TODO(nickbar01234) - Replace with real data
        search={(file, filter) => formatFileDate(file.date).includes(filter)}
        addElementComponent={canAddFile && <AddFile key={addFileId} />}
        emptyNode={
          <p className="text-2xl font-light text-[#000022]">No files yet.</p>
        }
      />
    </div>
  );
};

export default DisplaySenior;
