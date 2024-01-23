import { UserTile } from "@components/TileGrid";
import { CardGrid } from "@components/container";
import { prisma } from "@server/db/client";
import PathNav, { PathInfoType } from "@components/PathNav";
import DisplayChapterInfo from "@components/DisplayChapterInfo";

interface ChapterPageParams {
  params: {
    uid: string;
    chapterId: string;
  };
}
// Since ChapterPage is a server component, it has direct access to the dynamic route segment
const ChapterPage = async ({ params }: ChapterPageParams) => {
  // Fetch information according to a chapter
  // If no such chapter exist, throw an error
  const chapter = await prisma.chapter.findUniqueOrThrow({
    where: { id: params.chapterId },
    include: {
      students: true,
    },
  });

  const chapterPath: PathInfoType = {
    display: "Chapters",
    url: "chapters",
  };

  const currchapterPath: PathInfoType = {
    display: chapter.chapterName,
    url: params.chapterId,
  };

  // TODO(nickbar0123) - Use the information to display breadcrumb + profiles
  return (
    <div className="flex h-fit flex-col gap-y-6">
      <PathNav pathInfo={[chapterPath, currchapterPath]} />
      <div className="font-merriweather text-2xl font-bold text-[#000022]">
        {chapter.chapterName}
      </div>
      <DisplayChapterInfo
        location={chapter.location}
        noMembers={chapter.students.length}
        dateCreated={chapter.dateCreated}
      />
      <CardGrid
        title={
          <div className="font-merriweather text-xl font-bold">
            Executive Board
          </div>
        }
        tiles={chapter.students
          .filter((user) => user.role == "CHAPTER_LEADER")
          .map((user) => (
            <UserTile
              key={user.id}
              student={user}
              link={`/private/${params.uid}/admin/home/chapters/${params.chapterId}/users/${user.id}`}
            />
          ))}
      />

      <CardGrid
        title={
          <div className="font-merriweather text-xl font-bold">
            Pending (
            {
              chapter.students.filter((user) => user.approved === "PENDING")
                .length
            }
            )
          </div>
        }
        tiles={chapter.students
          .filter((user) => user.approved === "PENDING")
          .map((user) => (
            <UserTile key={user.id} student={user} link={""} />
          ))}
      />
      <CardGrid
        title={
          <div className="font-merriweather text-xl font-bold">
            Members (
            {chapter.students.filter((user) => user.role == "USER").length})
          </div>
        }
        tiles={chapter.students
          .filter((user) => user.role == "USER")
          .map((user) => (
            <UserTile
              key={user.id}
              student={user}
              link={`/private/${params.uid}/admin/home/chapters/${params.chapterId}/users/${user.id}`}
            />
          ))}
      />
    </div>
  );
};

export default ChapterPage;
