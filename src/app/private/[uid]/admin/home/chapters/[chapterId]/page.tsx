import { prisma } from "@server/db/client";
import { DisplayChapter } from "@components/admin";

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

  const chapterRequests = await prisma.userRequest.findMany({
    where: { chapterId: params.chapterId, approved: "PENDING" },
  });
  const requestUsers = await prisma.user.findMany({
    where: { id: { in: chapterRequests.map((req) => req.uid) } },
  });

  return (
    <DisplayChapter
      chapter={chapter}
      uid={params.uid}
      requestUsers={requestUsers}
    />
  );
};

export default ChapterPage;
