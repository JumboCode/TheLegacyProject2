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
      students: true,
    },
  });
  const resources = await prisma.resource.findMany({
    where: {
      access: {
        isEmpty: true,
      },
    },
  });

  return (
    <div className="mt-6 flex flex-col gap-y-6">
      <div className="text-2xl font-bold text-[#000022]">
        {chapter.chapterName}
      </div>
      <DisplayChapterInfo chapter={chapter} resources={resources} />
    </div>
  );
};

export default UserHomePage;
