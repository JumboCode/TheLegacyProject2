import { batchCreateResources } from "@api/resources/route.client";
import { batchCreateRequestSchema } from "@api/resources/route.schema";
import DisplayResources from "@components/DisplayResources";
import ResourceTile from "@components/ResourceTile";
import { Resource } from "@prisma/client";
import { prisma } from "@server/db/client";
import { useSelectedLayoutSegment } from "next/navigation";

// TODO (johnny-t06) - Client component to setEditMode state
const AdminResourcesPage = async () => {
  const resources = await prisma.resource.findMany();
  // console.log(resources); //TIA TODO: TO DELETE; TESTING CODE

  return (
    <DisplayResources isEdit={true} resources={resources}></DisplayResources>
  );
};

export default AdminResourcesPage;
