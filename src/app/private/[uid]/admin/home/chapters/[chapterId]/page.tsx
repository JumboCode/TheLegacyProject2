import { UserTile } from "@components/TileGrid";
import { prisma } from "@server/db/client";

interface ChapterPageParams {
  params: {
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

  // TODO(nickbar0123) - Use the information to display breadcrumb + profiles
  return (
    <div className="flex gap-x-8 pt-6">
      {chapter.students.map((user) => (
        <UserTile key={user.id} student={user} link="" />
      ))}
    </div>
  );
};

export default ChapterPage;
