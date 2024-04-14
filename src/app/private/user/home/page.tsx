import DisplayChapterInfo from "@components/DisplayChapterInfo";
import { prisma } from "@server/db/client";
import { getServerSessionOrRedirect } from "@server/utils";

const UserHomePage = async () => {
  const session = await getServerSessionOrRedirect();
  if (session.user?.ChapterID != null) {
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
    const resources = await prisma.resource.findMany({
      where: {
        access: {
          isEmpty: true,
        },
      },
    });

    return <DisplayChapterInfo chapter={chapter} resources={resources} />;
  } else {
    return null;
  }
};

export default UserHomePage;
