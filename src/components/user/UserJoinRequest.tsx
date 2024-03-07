"use client";

import { UserRequestTile } from "@components/TileGrid/UserRequestTile";
import { Prisma, UserRequest } from "@prisma/client";
import { TileEdit } from "../TileGrid/TileEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import {
  handleJoinChapterRequest,
  handleManageChapterRequest,
} from "@api/user-request/route.client";
import { useRouter } from "next/navigation";
import { CardGrid } from "@components/container";
import { Card } from "@material-tailwind/react";

type ChapterWithUser = Prisma.ChapterGetPayload<{
  include: { students: true };
}>;

interface UserJoinRequestProps {
  chapters: ChapterWithUser[];
  joinRequest: UserRequest | null;
  uid: string;
}

const UserJoinRequest = (props: UserJoinRequestProps) => {
  const { chapters, joinRequest } = props;
  const router = useRouter();

  return (
    // TODO(nickbar01234) - Add padding bottom
    <div className="flex h-full w-full flex-col gap-y-6  px-7 pt-[104px]">
      <p className="text-center text-4xl"> Welcome To The Legacy Project</p>
      <p className="text-2xl font-bold">Join a Chapter Below:</p>
      <CardGrid
        column_count={2}
        tiles={chapters.map((chapter) => {
          const options: Parameters<typeof TileEdit>[0]["options"] = [
            {
              name: "Undo request",
              onClick: () => {
                handleManageChapterRequest({
                  body: {
                    userId: props.uid,
                  },
                }).then((res) => {
                  console.log(res);
                  router.refresh();
                });
              },
              color: "#22555A",
              icon: <FontAwesomeIcon icon={faRotateLeft} />,
            },
          ];
          return (
            <div
              className="col-span-2 flex w-full flex-col gap-y-1.5 md:col-span-1"
              key={chapter.id}
            >
              <UserRequestTile
                chapter={chapter}
                topRightButton={
                  joinRequest?.chapterId === chapter.id ? (
                    <TileEdit
                      options={options}
                      icon={<FontAwesomeIcon icon={faEllipsis} size="lg" />}
                    />
                  ) : undefined
                }
              />
              {joinRequest?.chapterId === chapter.id ? (
                <div className="w-full rounded-xl bg-[#A6A6A6] py-1 text-center text-white">
                  Request Pending
                </div>
              ) : (
                <div
                  className={`w-full rounded-xl py-1 text-center text-white 
                  ${
                    joinRequest == null
                      ? "cursor-pointer bg-dark-green hover:bg-[#1b4448]"
                      : "bg-[#A6A6A6]"
                  }`}
                  //Bug of not updating buttons
                  onClick={
                    joinRequest == null
                      ? () => {
                          handleJoinChapterRequest({
                            body: {
                              chapterId: chapter.id,
                            },
                          }).then((res) => {
                            console.log(res);
                            router.refresh();
                          });
                        }
                      : undefined
                  }
                >
                  Join
                </div>
              )}
            </div>
          );
        })}
      />
    </div>
  );
};

export default UserJoinRequest;
