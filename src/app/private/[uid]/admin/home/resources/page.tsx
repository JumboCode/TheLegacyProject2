import { batchCreateResources } from "@api/resources/route.client";
import { batchCreateRequestSchema } from "@api/resources/route.schema";
import ResourceTile from "@components/ResourceTile";
import { Resource } from "@prisma/client";
import { prisma } from "@server/db/client";
import { useSelectedLayoutSegment } from "next/navigation";

// TODO (johnny-t06) - Client component to setEditMode state
const AdminResourcesPage = async () => {
  const resources = await prisma.resource.findMany();

  // const testResource: Resource = {
  //   id: "1",
  //   access: ["USER"],
  //   title: "title",
  //   link: "link",
  // };

  return (
    <div className="grid items-start gap-4 self-stretch md:grid-cols-2 ">
      {resources.map((eachResource) => (
        <ResourceTile key={eachResource.id} resource={eachResource} />
      ))}
    </div>
  );
};

export default AdminResourcesPage;
