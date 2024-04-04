import DisplayChapterInfo from "@components/DisplayChapterInfo";
import { prisma } from "@server/db/client";

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
      students: {
        where: {
          position: {
            not: "",
          },
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
