"use client";

import { editRole } from "@api/user/[uid]/edit-role/route.client";
import PathNav, { PathInfoType } from "@components/PathNav";
import PendingCard from "@components/PendingCard";
import { UserTile } from "@components/TileGrid";
import { TileEdit } from "@components/TileGrid/TileEdit";
import { CardGrid } from "@components/container";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";
import { ChapterWithStudent } from "@server/type";
import { useRouter } from "next/navigation";
import React from "react";

interface DisplayChapterProps {
  uid: string;
  chapter: ChapterWithStudent;
  requestUsers: User[];
}

const DisplayChapter = (props: DisplayChapterProps) => {
  const { uid, chapter, requestUsers } = props;
  const router = useRouter();

  const chapterPath: PathInfoType = {
    display: "Chapters",
    url: "chapters",
  };

  const currchapterPath: PathInfoType = {
    display: chapter.chapterName,
    url: chapter.id,
  };

  const eboardMembers = React.useMemo(
    () => [
      ...chapter.students.filter((user) => user.role === "CHAPTER_LEADER"),
      ...chapter.students.filter(
        (user) => user.role === "USER" && user.position != null
      ),
    ],
    [chapter]
  );

  const members = React.useMemo(
    () =>
      chapter.students.filter(
        (user) =>
          user.role === "USER" &&
          eboardMembers.find((other) => user.id === other.id) == undefined
      ),
    [chapter, eboardMembers]
  );

  return (
    <div className="flex h-fit flex-col gap-y-6">
      <PathNav pathInfo={[chapterPath, currchapterPath]} />
      <div className=" text-2xl font-bold text-[#000022]">
        {chapter.chapterName}
      </div>
      {/* TODO(nickbar01234) - Ask Fa for new Styling changes */}
      <CardGrid
        title={<div className="text-xl font-bold">Executive Board</div>}
        tiles={eboardMembers.map((user) => (
          <UserTile
            key={user.id}
            student={user}
            link={`/private/${uid}/admin/home/chapters/${chapter.id}/users/${user.id}`}
            dropdownComponent={
              <TileEdit
                options={[
                  user.role === "CHAPTER_LEADER"
                    ? {
                        name: (
                          <span>
                            Assign <span className="font-bold">Member</span>
                          </span>
                        ),
                        onClick: () => {
                          editRole({ body: { role: "USER" } }, user.id).then(
                            () => router.refresh()
                          );
                        },
                        color: "#22555A",
                        icon: (
                          <FontAwesomeIcon
                            icon={faArrowUpFromBracket}
                            flip="vertical"
                          />
                        ),
                      }
                    : {
                        name: (
                          <span>
                            Assign <span className="font-bold">President</span>
                          </span>
                        ),
                        onClick: () => {
                          editRole(
                            { body: { role: "CHAPTER_LEADER" } },
                            user.id
                          ).then(() => router.refresh());
                        },
                        color: "#22555A",
                        icon: <FontAwesomeIcon icon={faArrowUpFromBracket} />,
                      },
                ]}
              />
            }
          />
        ))}
      />

      <CardGrid
        title={
          <div className=" text-xl font-bold">
            Pending ({requestUsers.length})
          </div>
        }
        tiles={requestUsers.map((user) => (
          <PendingCard
            key={user.id}
            name={user.name ? user.name : ""}
            uid={user.id}
          />
        ))}
      />

      <CardGrid
        title={
          <div className=" text-xl font-bold">
            Members (
            {chapter.students.filter((user) => user.role == "USER").length})
          </div>
        }
        tiles={members.map((user) => {
          return (
            <UserTile
              key={user.id}
              student={user}
              link={`/private/${uid}/admin/home/chapters/${chapter.id}/users/${user.id}`}
              dropdownComponent={
                <TileEdit
                  options={[
                    {
                      name: (
                        <span>
                          Assign <span className="font-bold">President</span>
                        </span>
                      ),
                      onClick: () => {
                        editRole(
                          { body: { role: "CHAPTER_LEADER" } },
                          user.id
                        ).then(() => router.refresh());
                      },
                      color: "#22555A",
                      icon: <FontAwesomeIcon icon={faArrowUpFromBracket} />,
                    },
                  ]}
                />
              }
            />
          );
        })}
      />
    </div>
  );
};

export default DisplayChapter;
