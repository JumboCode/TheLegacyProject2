"use client";

import SearchableContainer from "@components/SearchableContainer";
import { File as PrismaFile, Prisma } from "@prisma/client";
import { formatFileDate } from "@utils";
import { File } from "@components/file";
import AddFile from "@components/file/AddFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faClose } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuid } from "uuid";

interface DisplayProps {
  editable: boolean;
  senior: Prisma.SeniorGetPayload<{ include: { Students: true; Files: true } }>;
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
  const { editable, senior } = props;
  const addFileId = uuid();

  return (
    <div className="flex flex-col gap-y-6">
      {/* @TODO - Firstname + lastname */}
      <h1 className="text-4xl font-bold text-[#000022]">{senior.name}</h1>
      <p>{senior.description}</p>
      <div className="flex flex-wrap gap-2">
        {editable && (
          <div className="flex w-48 cursor-pointer items-center justify-between rounded-lg border border-amber-red px-4 py-1.5">
            <span className="text-amber-red">Assign new student</span>
            <FontAwesomeIcon icon={faCaretDown} className="text-amber-red" />
          </div>
        )}
        {senior.Students.map((student) => (
          <div
            key={student.id}
            className="rounded-3xl bg-amber-red px-4 py-1.5 text-white"
          >
            {student.name}
          </div>
        ))}
      </div>
      <SearchableContainer
        display={(file) => <File key={file.id} file={file} />}
        elements={FILES} // TODO(nickbar01234) - Replace with real data
        search={(file, filter) => formatFileDate(file.date).includes(filter)}
        addElementComponent={<AddFile key={addFileId} />}
      />
    </div>
  );
};

export default DisplaySenior;
