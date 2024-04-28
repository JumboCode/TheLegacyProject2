"use client";

import { Prisma } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { TileEdit } from "./TileGrid/TileEdit";
import { InfoTile } from "./TileGrid";
import { fullName } from "@utils";
import { deleteChapter } from "@api/chapter/[chapterId]/route.client";
import { useRouter } from "next/navigation";
import SearchableContainer from "./SearchableContainer";
import ChapterRequest from "./ChapterRequest";
import DropDownContainer from "./container/DropDownContainer";
import { useApiThrottle } from "@hooks";
import React from "react";
import { Spinner } from "./skeleton";

type ChapterWithUserAndChapterRequest = Prisma.ChapterGetPayload<{
  include: { students: true; chapterRequest: true };
}>;

type AdminHomePageProps = {
  chapters: ChapterWithUserAndChapterRequest[];
};

const AdminHomePage = ({ chapters }: AdminHomePageProps) => {
  const router = useRouter();

  const [deleteChapterId, setDeleteChapterId] = React.useState("");
  const { fetching, fn: throttleDeleteChapter } = useApiThrottle({
    fn: deleteChapter,
    callback: () => {
      setDeleteChapterId("");
      router.refresh();
    },
  });

  return (
    <SearchableContainer
      elements={chapters}
      column_count={2}
      search={(elem, filter) => elem.chapterName.includes(filter)}
      display={(chapter) => {
        const prez = chapter.students.find(
          (user) => user.role == "CHAPTER_LEADER"
        );

        const options: Parameters<typeof TileEdit>[0]["options"] = [];

        options.push({
          name: "Remove Chapter",
          onClick: () => {
            setDeleteChapterId(chapter.id);
            throttleDeleteChapter(chapter.id);
          },
          color: "#ef6767",
          icon: <FontAwesomeIcon icon={faTrashCan} />,
        });

        return (
          <InfoTile
            key={chapter.id}
            title={chapter.chapterName}
            href={`/private/admin/home/chapters/${chapter.id}`}
            information={[
              { key: "Location", value: chapter.location },
              {
                key: "Members",
                value: chapter.students.length,
              },
              {
                key: "Chapter Leader",
                value:
                  prez != undefined
                    ? fullName(prez)
                    : "This chapter has no chapter leader",
              },
              {
                key: "Email",
                value: prez?.email ?? "",
              },
            ]}
            topRightButton={
              fetching && chapter.id === deleteChapterId ? (
                <Spinner width={8} height={8} />
              ) : !fetching ? (
                <TileEdit
                  options={options}
                  editIconProps={
                    <FontAwesomeIcon
                      className="fa-lg cursor-pointer"
                      icon={faEllipsis}
                    />
                  }
                />
              ) : null
            }
            moreInformation={
              <DropDownContainer defaultExpand={false}>
                <ChapterRequest
                  chapterRequest={chapter.chapterRequest}
                  ContainerNode={({ children }) => (
                    <div className="flex h-fit w-full flex-col gap-y-4 bg-white">
                      {children}
                    </div>
                  )}
                  readonly
                  title=""
                />
              </DropDownContainer>
            }
          />
        );
      }}
    />
  );
};

export default AdminHomePage;
