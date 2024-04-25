"use client";

import { Prisma, UserRequest } from "@prisma/client";
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
import { useApiThrottle } from "@hooks";
import { Spinner } from "@components/skeleton";

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

  const [fetchingForChapterId, setFetchingForChapterId] = React.useState("");
  const {
    fetching: fetchingHandleJoinChapterRequest,
    fn: throttleHandleJoinChapterRequest,
  } = useApiThrottle({
    fn: handleJoinChapterRequest,
    callback: () => router.refresh(),
  });
  const {
    fetching: fetchingManageChapterRequest,
    fn: throttleHandleManageChapterRequest,
  } = useApiThrottle({
    fn: handleManageChapterRequest,
    callback: () => {
      setFetchingForChapterId("");
      router.refresh();
    },
  });
  const fetching =
    fetchingHandleJoinChapterRequest || fetchingManageChapterRequest;

  return (
    <div className="flex h-full w-full flex-col gap-y-6 py-[104px]">
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
                  key: "Chapter Leader",
                  value:
                    prez != undefined
                      ? fullName(prez)
                      : "This chapter has no chapter leader",
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
                fetching && fetchingForChapterId === chapter.id ? (
                  <Spinner width={8} height={8} />
                ) : joinRequest == null ? (
                  <button
                    className="rounded bg-dark-teal px-5 py-2 text-sm text-white transition duration-300 ease-in-out hover:-translate-y-1"
                    onClick={() => {
                      setFetchingForChapterId(chapter.id);
                      throttleHandleJoinChapterRequest({
                        body: { chapterId: chapter.id },
                      });
                    }}
                  >
                    Join
                  </button>
                ) : joinRequest.chapterId === chapter.id ? (
                  <button
                    className="rounded bg-dark-teal px-5 py-2 text-sm text-white transition duration-300 ease-in-out hover:-translate-y-1"
                    onClick={() => {
                      setFetchingForChapterId(chapter.id);
                      throttleHandleManageChapterRequest({
                        body: { userId: userContext.user.id },
                      });
                    }}
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
