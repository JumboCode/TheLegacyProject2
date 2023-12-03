import { prisma } from "@server/db/client";
import { Resource } from "@prisma/client";

interface IResourceProp {
  resource: Resource;
  isEdit: boolean;
  // onSave : () => any
}

const ResourceTile = (props: IResourceProp) => {
  return props.isEdit ? (
    <div className="flex w-full rounded-lg bg-white p-6">
      <div className="text-sm font-normal">
        {" "}
        isEDIT TODO {props.resource.title}
      </div>
    </div>
  ) : (
    <div className="flex w-full rounded-lg bg-white p-6">
      <div className="text-sm font-normal">{props.resource.title}</div>
    </div>
  );
};

export default ResourceTile;
