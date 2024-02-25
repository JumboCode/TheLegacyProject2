import PathNav from "@components/PathNav";
import FileTile from "@components/TileGrid/FileTile";
import { CardGrid } from "@components/container";
import { prisma } from "@server/db/client";

interface Params {
  params: {
    userId: string;
    chapterId: string;
    seniorId: string;
  };
}

const SeniorPage = async ({ params }: Params) => {
  const { userId, chapterId, seniorId } = params;

  // TODO(nickbar01234) - Associate each senior to a chapter
  const senior = await prisma.senior.findUniqueOrThrow({
    where: {
      id: seniorId,
    },
    include: {
      Files: true,
    },
  });

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
      ChapterID: chapterId,
    },
    include: {
      Chapter: true,
    },
  });

  return (
    <div className="flex h-full w-full flex-col gap-y-6">
      <PathNav
        pathInfo={[
          { display: "Chapters", url: "chapters" },
          { display: user.Chapter?.chapterName ?? "", url: chapterId },
          { display: user.name ?? "", url: userId },
          { display: senior.name, url: seniorId },
        ]}
      />

      <CardGrid
        title={
          <>
            <h1 className="text-2xl font-bold text-[#000022]">{senior.name}</h1>
            {senior.description.length > 0 && (
              <p className="text-[15px]">{senior.description}</p>
            )}
          </>
        }
        tiles={senior.Files.map((file) => (
          <FileTile
            key={file.id}
            id={file.id}
            date={file.date}
            url={file.url}
            Tags={file.Tags}
          />
        ))}
      />
    </div>
  );
};

export default SeniorPage;
