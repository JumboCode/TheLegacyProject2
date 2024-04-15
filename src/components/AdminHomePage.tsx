"use client";

import { Prisma } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { TileEdit } from "./TileGrid/TileEdit";
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
          onClick: async () => {
            return;
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
            topRightButton={<TileEdit options={options} />}
          />
        );
      }}
    />
  );
};

export default AdminHomePage;
