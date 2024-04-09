import { prisma } from "@server/db/client";
import DisplayChapterInfo from "@components/DisplayChapterInfo";

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

  const userRequests = await prisma.userRequest.findMany({
    where: {
      approved: "PENDING",
    },
    include: { user: true },
  });
  const resources = await prisma.resource.findMany();

  return (
    <DisplayChapterInfo
      chapter={chapter}
      userRequests={userRequests}
      resources={resources}
    />
  );
};

export default ChapterPage;
