"use client";

import { Prisma, Resource, User, UserRequest } from "@prisma/client";
import { CardGrid } from "./container";
import { UserTile } from "./TileGrid";
import DisplayResources from "./DisplayResources";
import React from "react";
import { UserContext } from "@context/UserProvider";
import PendingCard from "@components/PendingCard";
import { fullName } from "@utils";
import { RoleToUrlSegment } from "@constants/RoleAlias";
import { sortedStudents } from "@utils";

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

  const students =
    user.role === "ADMIN"
      ? chapter.students
      : chapter.students.filter(
          (user) => user.role === "CHAPTER_LEADER" || user.position !== ""
        );

  return (
    <div className="w-full">
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
      {userRequests && (
        <div className="mb-12">
          <h1 className="mb-6 text-xl">{`Pending (${userRequests.length})`}</h1>
          {userRequests.length > 0 ? (
            <CardGrid
              column_count={2}
              tiles={userRequests.map((user, index) => {
                return (
                  <PendingCard
                    key={index}
                    name={fullName(user.user)}
                    uid={user.user.id}
                  />
                );
              })}
            />
          ) : (
            <h1 className="font-light">
              {"This chapter has no pending members."}
            </h1>
          )}
        </div>
      )}

      <div className="mb-12">
        <CardGrid
          title={
            <div className="text-xl text-[#000022]">
              {user.role === "ADMIN"
                ? `Members (${chapter.students.length})`
                : "Executive Board"}
            </div>
          }
          tiles={sortedStudents(students).map((student) => {
            const link =
              user.role === "USER"
                ? ""
                : `/private/${user.id}/${RoleToUrlSegment[user.role]}` +
                  `${
                    user.role === "ADMIN" ? `/home/chapters/${chapter.id}` : ""
                  }` +
                  `/users/${student.id}`;
            return <UserTile key={student.id} student={student} link={link} />;
          })}
        />
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="text-xl text-[#000022]">Resources</div>
        <DisplayResources
          resources={resources}
          showRole={false}
          editable={false}
          column={3}
        />
      </div>
    </div>
  );
};

export default DisplayChapterInfo;
