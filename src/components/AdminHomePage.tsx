"use client";

import SearchBar from "@components/SearchBar";
import { ChapterTile } from "@components/TileGrid/ChapterTile";
import { useContext, useState } from "react";
import { Prisma } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { TileEdit } from "./TileGrid/TileEdit";
import { UserContext } from "src/context/UserProvider";

type ChapterWithUser = Prisma.ChapterGetPayload<{
  include: { students: true };
}>;

type AdminHomePageProps = {
  chapters: ChapterWithUser[];
};

const AdminHomePage = ({ chapters }: AdminHomePageProps) => {
  const [filter, setFilter] = useState("");
  const userContext = useContext(UserContext);

  return (
    <>
      <div className="flex w-full gap-2.5">
        <SearchBar setFilter={setFilter} />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-6">
        {chapters
          .filter((chapter) =>
            chapter.chapterName.toLowerCase().includes(filter.toLowerCase())
          )
          .map((chapter, index) => {
            let yearsActive =
              (new Date().getTime() - chapter.dateCreated.getTime()) / 1000;
            yearsActive /= 60 * 60 * 24;
            yearsActive = Math.abs(Math.round(yearsActive / 365.25));

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
              <ChapterTile
                key={index}
                title={chapter.chapterName}
                president={prez?.name ?? ""}
                numMembers={chapter.students.length}
                yearsActive={yearsActive}
                emailPresident={prez?.email ?? ""}
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
                href={`/private/${userContext.user.id}/admin/home/chapters/${chapter.id}`}
              />
            );
          })}
      </div>
    </>
  );
};

export default AdminHomePage;
