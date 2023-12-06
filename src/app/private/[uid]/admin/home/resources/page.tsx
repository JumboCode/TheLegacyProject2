import DisplayResources from "@components/DisplayResources";
import { prisma } from "@server/db/client";

// TODO (johnny-t06) - Client component to setEditMode state
// Fetch respective resources to Roles (defined by route anyway)
const AdminResourcesPage = async () => {
  const resources = await prisma.resource.findMany();

  return <DisplayResources showRole={true} resources={resources} />;
};

export default AdminResourcesPage;
