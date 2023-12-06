"use client";
import { batchCreateResources } from "@api/resources/route.client";
import { batchCreateRequestSchema } from "@api/resources/route.schema";
import ResourceTile from "@components/ResourceTile";
import { prisma } from "@server/db/client";
import { Resource } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";

interface IDisplayResources {
  resources: Resource[];
  showRole: boolean;
}

// TODO (johnny) - Create button and use setState to set the isEdit
const DisplayResources = (props: IDisplayResources) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <button className="flex w-44 items-center justify-between rounded-xl border border-dark-teal px-4 py-2.5">
          <p className="text-base font-normal">Add resource</p>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button className="cursor-pointer text-dark-teal">
          <span className="mr-2 text-base font-normal">Edit</span>
          <FontAwesomeIcon icon={faPencil} className="inline" />
        </button>
      </div>
      <div className="mt-6 grid items-start gap-6 self-stretch md:grid-cols-2 ">
        {props.resources.map((eachResource) => (
          <ResourceTile
            key={eachResource.id}
            resource={eachResource}
            isEdit={false}
            showRole={props.showRole}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayResources;
