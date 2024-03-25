"use client";

import { Prisma, Resource } from "@prisma/client";
import { CardGrid } from "./container";
import { UserTile } from "./TileGrid";
import DisplayResources from "./DisplayResources";
import React from "react";
import { UserContext } from "@context/UserProvider";

type ChapterWithUser = Prisma.ChapterGetPayload<{
  include: { students: true };
}>;

interface DisplayChapterInfoParams {
  chapter: ChapterWithUser;
  resources: Resource[];
}

const DisplayChapterInfo = ({
  chapter,
  resources,
}: DisplayChapterInfoParams) => {
  const userContext = React.useContext(UserContext);

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
      <div className="mb-12">
        <CardGrid
          title={<div className="text-xl text-[#000022]">Executive Board</div>}
          tiles={chapter.students
            .filter(
              (user) => user.role === "CHAPTER_LEADER" || user.position !== ""
            )
            .map((user) => (
              <UserTile
                key={user.id}
                student={user}
                link={`/private/${userContext.user.id}/chapter-leader/users/${user.id}`}
              />
            ))}
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
