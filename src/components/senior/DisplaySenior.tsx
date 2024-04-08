"use client";

import SearchableContainer from "@components/SearchableContainer";
import { Prisma, User } from "@prisma/client";
import { compareUser, formatFileDate, fullName, seniorFullName } from "@utils";
import { File } from "@components/file";
import AddFile from "@components/file/AddFile";
import { v4 as uuid } from "uuid";
import Assignment from "./assignment";
import { patchSenior } from "@api/senior/[id]/route.client";
import React from "react";

interface DisplayProps {
  editable: boolean;
  canAddFile: boolean;
  senior: Prisma.SeniorGetPayload<{
    include: { Files: true; chapter: { include: { students: true } } };
  }>;
}

const DisplaySenior = (props: DisplayProps) => {
  const { editable, canAddFile, senior } = props;
  const addFileId = uuid();

  const students = React.useMemo(
    () => senior.chapter.students.sort(compareUser),
    [senior.chapter.students]
  );

  const getAssignments = () =>
    students.filter((student) => senior.StudentIDs.includes(student.id));

  const [assigned, setAssigned] = React.useState(() => getAssignments());
  const onSave = async () => {
    await patchSenior({
      body: {
        firstname: senior.firstname,
        lastname: senior.lastname,
        location: senior.location,
        description: senior.description,
        StudentIDs: assigned.map((user) => user.id),
      },
      seniorId: senior.id,
    });
  };

  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-4xl font-bold text-[#000022]">
        {seniorFullName(senior)}
      </h1>
      <p>{senior.description}</p>
      <Assignment
        header="Assign students"
        editable={editable}
        display={(user: User) => fullName(user)}
        elements={students}
        selected={assigned}
        setSelected={setAssigned}
        onSave={onSave}
      />
      <SearchableContainer
        display={(file) => <File key={file.id} file={file} />}
        elements={senior.Files.sort(
          (fileA, fileB) => fileA.date.getTime() - fileB.date.getTime()
        )}
        search={(file, filter) => formatFileDate(file.date).includes(filter)}
        addElementComponent={
          canAddFile ? (
            <AddFile
              seniorId={senior.id}
              seniorFolder={senior.folder}
              files={senior.Files}
              key={addFileId}
            />
          ) : undefined
        }
        emptyNode={
          <p className="text-2xl font-light text-[#000022]">No files yet.</p>
        }
      />
    </div>
  );
};

export default DisplaySenior;
