import DisplayResources from "@components/DisplayResources";
import { prisma } from "@server/db/client";

const ChapterLeaderResourcesPage = async () => {
  const resources = await prisma.resource.findMany({
    where: {
      access: {
        has: "CHAPTER_LEADER",
      },
    },
  });
  return (
    <DisplayResources showRole={false} resources={resources} editable={false} />
  );
};

export default ChapterLeaderResourcesPage;
