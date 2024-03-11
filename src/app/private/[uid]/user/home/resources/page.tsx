import DisplayResources from "@components/DisplayResources";
import { prisma } from "@server/db/client";

const UserResourcesPage = async () => {
  const resources = await prisma.resource.findMany({
    where: {
      access: {
        isEmpty: true,
      },
    },
  });
  return (
    <DisplayResources showRole={false} resources={resources} editable={false} />
  );
};

export default UserResourcesPage;
