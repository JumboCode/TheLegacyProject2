import DisplayChapterInfo from "@components/DisplayChapterInfo";
import { prisma } from "@server/db/client";
import { getServerSessionOrRedirect } from "@server/utils";

interface UserHomePageParams {
  params: {
    uid: string;
  };
}

const UserHomePage = async ({ params }: UserHomePageParams) => {
  const session = await getServerSessionOrRedirect();
  const chapter = await prisma.chapter.findFirstOrThrow({
    where: {
      id: session.user?.ChapterID ?? "",
    },
    include: {
      students: {
        where: {
          OR: [
            {
              position: {
                not: "",
              },
            },
            {
              role: "CHAPTER_LEADER",
            },
          ],
        },
      },
    },
  });

  const resources = await prisma.resource.findMany();

  const userRequests = await prisma.userRequest.findMany({
    where: {
      chapterId: chapter.id,
      approved: "PENDING",
    },
    include: {
      user: true,
    },
  });

  return (
    <DisplayChapterInfo
      chapter={chapter}
      resources={resources}
      userRequests={userRequests}
    />
  );
};

export default UserHomePage;
