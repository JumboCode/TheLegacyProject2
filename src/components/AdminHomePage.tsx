"use client";

import { useContext } from "react";
import { Prisma } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { TileEdit } from "./TileGrid/TileEdit";
import { UserContext } from "src/context/UserProvider";
import { InfoTile } from "./TileGrid";
import { fullName } from "@utils";
import SearchableContainer from "./SearchableContainer";

type ChapterWithUser = Prisma.ChapterGetPayload<{
  include: { students: true };
}>;

type AdminHomePageProps = {
  chapters: ChapterWithUser[];
};

const AdminHomePage = ({ chapters }: AdminHomePageProps) => {
  const userContext = useContext(UserContext);

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
            console.log("This worked");
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
                key: "President",
                value:
                  prez != undefined
                    ? fullName(prez)
                    : "This chapter has no president",
              },
              {
                key: "Email",
                value: prez?.email ?? "",
              },
            ]}
            topRightButton={
              <TileEdit
                options={options}
                icon={
                  <FontAwesomeIcon
                    className="fa-lg cursor-pointer"
                    icon={faEllipsis}
                  />
                }
              />
            }
          />
        );
      }}
    />
  );
};

export default AdminHomePage;
