"use client";

import { Prisma, UserRequest } from "@prisma/client";
import { TileEdit } from "../TileGrid/TileEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEllipsis,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  handleJoinChapterRequest,
  handleManageChapterRequest,
} from "@api/user-request/route.client";
import { useRouter } from "next/navigation";
import { CardGrid } from "@components/container";
import { UserContext } from "@context/UserProvider";
import React from "react";
import { InfoTile } from "@components/TileGrid";
import { fullName } from "@utils";

type ChapterWithUser = Prisma.ChapterGetPayload<{
  include: { students: true };
}>;

interface UserJoinRequestProps {
  chapters: ChapterWithUser[];
  joinRequest: UserRequest | null;
}

const UserJoinRequest = (props: UserJoinRequestProps) => {
  const { chapters, joinRequest } = props;
  const userContext = React.useContext(UserContext);
  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-col gap-y-6  px-7 py-[104px]">
      <p className="text-center text-4xl"> Welcome To The Legacy Project</p>
      <p className="text-2xl font-bold">Join a Chapter Below:</p>
      <CardGrid
        column_count={2}
        tiles={chapters.map((chapter) => {
          let yearsActive =
            (new Date().getTime() - chapter.dateCreated.getTime()) / 1000;
          yearsActive /= 60 * 60 * 24;
          yearsActive = Math.abs(Math.round(yearsActive / 365.25));

          const prez = chapter.students.find(
            (user) => user.role === "CHAPTER_LEADER"
          );

          return (
            <InfoTile
              key={chapter.id}
              title={chapter.chapterName}
              information={[
                { key: "No. of members", value: chapter.students.length },
                {
                  key: "President",
                  value:
                    prez != undefined
                      ? fullName(prez)
                      : "This chapter has no president",
                },
                {
                  key: "Years active",
                  value: yearsActive,
                },
                {
                  key: "Email",
                  value: prez?.email ?? "",
                },
              ]}
              topRightButton={
                joinRequest == null ? (
                  <button
                    className="rounded bg-dark-teal px-5 py-2 text-sm text-white transition duration-300 ease-in-out hover:-translate-y-1"
                    onClick={() =>
                      handleJoinChapterRequest({
                        body: { chapterId: chapter.id },
                      }).then(() => router.refresh())
                    }
                  >
                    Join
                  </button>
                ) : joinRequest.chapterId === chapter.id ? (
                  <button
                    className="rounded bg-dark-teal px-5 py-2 text-sm text-white transition duration-300 ease-in-out hover:-translate-y-1"
                    onClick={() =>
                      handleManageChapterRequest({
                        body: { userId: userContext.user.id },
                      }).then(() => router.refresh())
                    }
                  >
                    Undo
                  </button>
                ) : null
              }
            />
          );
        })}
      />
    </div>
  );
};

export default UserJoinRequest;
