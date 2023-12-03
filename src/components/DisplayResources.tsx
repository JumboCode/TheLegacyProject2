"use client";
import { batchCreateResources } from "@api/resources/route.client";
import { batchCreateRequestSchema } from "@api/resources/route.schema";
import ResourceTile from "@components/ResourceTile";
import { prisma } from "@server/db/client";
import { Resource } from "@prisma/client";

interface IDisplayResources {
  isEdit: boolean;
  // children: React.ReactNode; // TIA QUESTION WHAT IS THIS?
  resources: Resource[];
}

// TODO (johnny) - Create button and use setState to set the isEdit
const DisplayResources = (props: IDisplayResources) => {
  // const testResource: Resource = {
  //   id: "1",
  //   access: ["USER"],
  //   title: "title",
  //   link: "link",
  // };

  return (
    <div className="grid items-start gap-4 self-stretch md:grid-cols-2 ">
      {props.resources.map((eachResource) => (
        <ResourceTile
          key={eachResource.id}
          resource={eachResource}
          isEdit={props.isEdit}
        />
      ))}
    </div>
  );
};

export default DisplayResources;
