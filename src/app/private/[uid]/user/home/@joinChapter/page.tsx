import { UserJoinRequest } from "@components/user";
import { prisma } from "@server/db/client";

interface UserHomePageParams {
  params: {
    uid: string;
  };
}

const UserJoinChapterPage = async ({ params }: UserHomePageParams) => {
  const chapters = await prisma.chapter.findMany({
    include: {
      students: true,
    },
  });
  const joinRequest = await prisma.userRequest.findFirst({
    where: {
      uid: params.uid,
    },
  });

  return <UserJoinRequest chapters={chapters} joinRequest={joinRequest} />;
};

export default UserJoinChapterPage;
