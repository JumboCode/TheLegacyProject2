import { prisma } from "@server/db/client";
import { Resource } from "@prisma/client";

type ResourceProp = {
  title: string;
  role: string[];
};

const ResourceTile = (props: { resource: Resource }) => {
  return (
    <div className="flex w-full rounded-lg bg-white p-6">
      <div className="text-sm font-normal">{props.resource.title}</div>
    </div>
  );
};

// const ResourceTile = ( resource: Resource ) => {
//   return <div className="w-full rounded-lg bg-white p-6">
//   </div>;
// };

export default ResourceTile;
