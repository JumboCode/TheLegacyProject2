import { UserTile } from "@components/TileGrid";
import DisplayChapterInfo from "@components/DisplayChapterInfo";
import { prisma } from "@server/db/client";
import { CardGrid } from "@components/container";

interface UserHomePageParams {
  params: {
    uid: string;
  };
}

const UserHomePage = async ({ params }: UserHomePageParams) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: params.uid,
    },
  });
  const chapter = await prisma.chapter.findFirstOrThrow({
    where: {
      id: user.ChapterID ?? "",
    },
    include: {
      students: true,
    },
  });

  return (
    <div className="mt-6 flex flex-col gap-y-6">
      <div className="text-2xl font-bold text-[#000022]">
        {chapter.chapterName}
      </div>
      <DisplayChapterInfo
        location={chapter.location}
        noMembers={
          chapter.students.filter((user) => user.role == "USER").length
        }
        dateCreated={chapter.dateCreated}
      />
      <CardGrid
        title={<div className="text-xl font-bold">Executive Board</div>}
        tiles={chapter.students
          .filter((user) => user.role == "CHAPTER_LEADER")
          .map((user) => (
            <UserTile key={user.id} student={user} link="" />
          ))}
      />
    </div>
  );
};

export default UserHomePage;
