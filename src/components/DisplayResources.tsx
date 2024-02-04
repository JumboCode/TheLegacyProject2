"use client";

import React from "react";
import ResourceTile from "@components/ResourceTile";
import { Resource } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuid } from "uuid";
import {
  batchCreateResources,
  batchUpdateResources,
  batchDeleteResources,
} from "@api/resources/route.client";

interface IDisplayResources {
  resources: Resource[];
  showRole: boolean;
}

interface ResourceState extends Resource {
  state: "UNEDITED" | "UPDATED" | "DELETED" | "CREATED";
}

const DisplayResources = (props: IDisplayResources) => {
  const [edit, setEdit] = React.useState(false);
  const [stateResources, setStateResources] = React.useState<ResourceState[]>(
    () =>
      props.resources.map((resource) => ({ state: "UNEDITED", ...resource }))
  );

  const onAddResource = () => {
    setStateResources((prev) => [
      ...prev,
      { state: "CREATED", id: uuid(), title: "", access: [], link: "" },
    ]);
    setEdit(true);
  };

  const onDelete = (deletedResource: Resource) => {
    setStateResources((prev) => {
      const otherResources = prev.filter(
        (resource) => resource.id !== deletedResource.id
      );
      const prevResource = prev.find(
        (prevResource) => prevResource.id === deletedResource.id
      );
      if (prevResource == undefined || prevResource.state === "CREATED") {
        return otherResources;
      } else {
        return [...otherResources, { ...prevResource, state: "DELETED" }];
      }
    });
  };

  const getResourceByState = (state: ResourceState["state"]) => {
    return stateResources
      .filter((curr) => curr.state === state)
      .map((curr) => {
        const { state, ...rest } = curr;
        return rest;
      });
  };
  /* Todo (Johnny and Tia): 
      1. Map through stateResources
        a. Have 3 lists for added, edited(put), and deleted
        b. Put eachStateResource into respective list. 
        c. There might be some conversion of the stateResources to Resources
      2. Pass list of Resources into respective API calls

      Possilbe drawbacks: Overhead with mapping or converting?
  */
  const onSaveResources = async () => {
    const deletedResources = getResourceByState("DELETED").map((curr) => {
      const { id, ...rest } = curr;
      return id;
    });
    const updatedResources = getResourceByState("UPDATED");
    const createdResources = getResourceByState("CREATED");

    await Promise.all([
      batchCreateResources({ body: createdResources }),
      batchUpdateResources({ body: updatedResources }),
      batchDeleteResources({ body: deletedResources }),
    ]).then(() => {
      setStateResources((prev) => {
        const newResources = prev
          .filter((curr) => curr.state != "DELETED")
          .map((curr) => {
            curr.state = "UNEDITED";
            return curr;
          });
        return newResources;
      });
    });
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <button className="flex w-44 items-center justify-between rounded-xl border border-dark-teal px-4 py-2.5">
          <p className="text-base font-normal" onClick={onAddResource}>
            Add resource
          </p>
          {/* TIA TODO: ADD ONCLIC */}
          <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
        </button>
        {edit ? (
          <button
            className="rounded-xl bg-dark-teal px-6 py-2 text-white"
            onClick={onSaveResources}
          >
            Save
          </button>
        ) : (
          <button
            className="cursor-pointer text-dark-teal"
            onClick={() => setEdit(true)}
          >
            <span className="mr-2 text-base font-normal">Edit</span>
            <FontAwesomeIcon icon={faPencil} className="inline h-5 w-5" />
          </button>
        )}
      </div>
      <div className="mt-6 grid items-start gap-6 self-stretch md:grid-cols-2 ">
        {stateResources
          .filter((resource) => resource.state !== "DELETED")
          .map((eachResource) => (
            <ResourceTile
              key={eachResource.id}
              resource={eachResource}
              isEdit={edit}
              showRole={props.showRole}
              onDelete={onDelete}
              onEdit={(resource) => {
                console.log("Edited");
                return;
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayResources;
