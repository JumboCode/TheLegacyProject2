import { prisma } from "@server/db/client";

interface ChapterDisplayProps {
  chapterId: string;
}

const ChapterDisplay = async (props: ChapterDisplayProps) => {
  // Fetch information according to a chapter
  // If no such chapter exist, throw an error
  const chapter = await prisma.chapter.findUniqueOrThrow({
    where: { id: props.chapterId },
    include: {
      students: true,
    },
  });

  // Use the information to display breadcrumb + profiles
  return null;
};

export default ChapterDisplay;
