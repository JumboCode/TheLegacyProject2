import DisplayResources from "@components/DisplayResources";
import { prisma } from "@server/db/client";

const AdminResourcesPage = async () => {
  const resources = await prisma.resource.findMany();

  return <DisplayResources showRole={true} resources={resources} />;
};

export default AdminResourcesPage;
