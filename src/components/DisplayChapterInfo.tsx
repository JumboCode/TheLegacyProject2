"use client";

import { Prisma, Resource } from "@prisma/client";
import { CardGrid, Popup } from "./container";
import { UserTile } from "./TileGrid";
import DisplayResources from "./DisplayResources";
import React from "react";
import { UserContext } from "@context/UserProvider";
import PendingCard from "@components/PendingCard";
import { fullName } from "@utils";
import { RoleToUrlSegment } from "@constants/RoleAlias";
import { sortedStudents } from "@utils";
import { Dropdown } from "./selector";
import { editRole } from "@api/admin/edit-role/route.client";
import { useRouter } from "next/navigation";
import DropDownContainer from "@components/container/DropDownContainer";
import { useApiThrottle } from "@hooks";

type ChapterWithUser = Prisma.ChapterGetPayload<{
  include: { students: true };
}>;

type RequestWithUser = Prisma.UserRequestGetPayload<{
  include: { user: true };
}>;

interface DisplayChapterInfoParams {
  chapter: ChapterWithUser;
  resources: Resource[];
  userRequests?: RequestWithUser[];
}

const DisplayChapterInfo = ({
  chapter,
  resources,
  userRequests,
}: DisplayChapterInfoParams) => {
  const userContext = React.useContext(UserContext);
  const { user } = userContext;
  const router = useRouter();

  const students =
    user.role === "ADMIN"
      ? chapter.students
      : chapter.students.filter(
          (user) => user.role === "CHAPTER_LEADER" || user.position !== ""
        );

  const currentPresidents = chapter.students.filter(
    (user) => user.role === "CHAPTER_LEADER"
  );
  const [displayAssignPresident, setDisplayAssignPresident] =
    React.useState(false);
  const [assignedPresidents, setAssignedPresidents] =
    React.useState(currentPresidents);
  const { fn: throttleEditRole } = useApiThrottle({
    fn: editRole,
    callback: () => router.refresh(),
  });

  const onSaveNewPresidents = async () => {
    const previousPresidents = currentPresidents.filter(
      (student) =>
        assignedPresidents.find((other) => student.id === other.id) == undefined
    );
    await throttleEditRole({
      body: {
        chapterLeaders: assignedPresidents.map((student) => student.id),
        users: previousPresidents.map((student) => student.id),
      },
    });
  };

  const resetAssignment = () => {
    setDisplayAssignPresident(false);
    setAssignedPresidents(currentPresidents);
  };

  return (
    <div className="w-full" onClick={resetAssignment}>
      {displayAssignPresident && (
        <Popup onClick={(e) => e.stopPropagation()}>
          <div className="text-3xl font-bold text-white">Assign President</div>
          <Dropdown
            header="Select student"
            elements={chapter.students}
            display={(student) => fullName(student)}
            selected={assignedPresidents}
            setSelected={setAssignedPresidents}
            onSave={onSaveNewPresidents}
          />
        </Popup>
      )}
      <div className="font-merriweather mb-4 text-2xl font-bold text-[#000022]">
        {chapter.chapterName}
      </div>
      <div className="mb-7 flex gap-x-6 overflow-x-auto">
        {[
          chapter.location,
          `${chapter.students.length} members`,
          `Active since ${chapter.dateCreated.getFullYear()}`,
        ].map((value) => (
          <div
            key={value}
            className="whitespace-nowrap rounded bg-dark-teal p-2.5 font-light text-white"
          >
            {value}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-12">
        {userRequests && (
          <DropDownContainer
            title={
              <div className="mb-6 text-xl">{`Pending (${userRequests.length})`}</div>
            }
          >
            {userRequests.length > 0 ? (
              <CardGrid
                column_count={2}
                tiles={userRequests.map((user) => {
                  return (
                    <PendingCard
                      key={user.id}
                      name={fullName(user.user)}
                      uid={user.id}
                    />
                  );
                })}
              />
            ) : (
              <h1 className="font-light">
                {"This chapter has no pending members."}
              </h1>
            )}
          </DropDownContainer>
        )}
        <DropDownContainer
          title={
            <div className="mb-6 flex justify-between text-xl text-[#000022]">
              {user.role === "ADMIN"
                ? `Members (${chapter.students.length})`
                : "Executive Board"}
            </div>
          }
        >
          <div className="flex flex-col gap-y-6">
            {user.role === "ADMIN" && (
              <div
                className="w-fit cursor-pointer rounded-lg bg-dark-teal px-4 py-3 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setDisplayAssignPresident(true);
                }}
              >
                Assign President
              </div>
            )}
            <CardGrid
              tiles={sortedStudents(students).map((student) => {
                let link = `/private/${RoleToUrlSegment[user.role]}`;
                if (user.role === "ADMIN") {
                  link += `/home/chapters/${student.ChapterID}`;
                }
                link += `/users/${student.id}`;
                return (
                  <UserTile
                    key={student.id}
                    student={student}
                    link={user.role === "USER" ? "" : link}
                  />
                );
              })}
            />
          </div>
        </DropDownContainer>
        <DropDownContainer
          title={<div className="mb-6 text-xl">Resources</div>}
        >
          <DisplayResources
            resources={resources}
            showRole={false}
            editable={false}
            column={3}
          />
        </DropDownContainer>
      </div>
    </div>
  );
};

export default DisplayChapterInfo;
