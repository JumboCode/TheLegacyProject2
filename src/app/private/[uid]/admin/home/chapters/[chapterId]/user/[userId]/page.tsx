import PathNav from "@components/PathNav";
import { UserTile } from "@components/TileGrid";
import { prisma } from "@server/db/client";

interface Params {
  params: {
    userId: string;
    chapterId: string;
  };
}

const UserPage = async ({ params }: Params) => {
  const { userId, chapterId } = params;

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId, ChapterID: chapterId },
    include: {
      Seniors: true,
      Chapter: true,
    },
  });

  return (
    <>
      <PathNav
        pathInfo={[
          { display: "Chapters", url: "chapters" },
          { display: user.Chapter?.chapterName ?? "", url: chapterId },
          { display: user.name ?? "", url: userId },
        ]}
      />
      {/* TODO(nickbar01234) - Add pronouns */}
      <h1 className="mt-6 text-2xl font-bold text-[#002]">{user.name ?? ""}</h1>
      <div className="mt-6 flex flex-wrap gap-10">
        {user.Seniors.map((senior) => (
          <UserTile key={senior.id} senior={senior} link="" />
        ))}
      </div>
    </>
  );
};

export default UserPage;
