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
import { compareResource } from "src/util";

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
      props.resources
        .sort(compareResource)
        .map((resource) => ({ state: "UNEDITED", ...resource }))
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

  const onEdit = (editedResource: Resource) => {
    setStateResources((prev) => {
      const newResources: ResourceState[] = prev.map((resource) => {
        return resource.id === editedResource.id && resource.state !== "CREATED"
          ? { ...editedResource, state: "UPDATED" }
          : resource;
      });
      return newResources;
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

  const onSaveResources = async () => {
    const deletedResources = getResourceByState("DELETED").map(
      (curr) => curr.id
    );
    const updatedResources = getResourceByState("UPDATED");
    const createdResources = getResourceByState("CREATED");

    await Promise.all([
      batchCreateResources({ body: createdResources }),
      batchUpdateResources({ body: updatedResources }),
      batchDeleteResources({ body: deletedResources }),
    ]).then((res) => {
      const newResources: ResourceState[] = [
        ...getResourceByState("UNEDITED"),
        ...res[0].data,
        ...res[1].data,
      ]
        .sort(compareResource)
        .map((eachResource) => ({
          ...eachResource,
          state: "UNEDITED",
        }));

      setStateResources(newResources);
      setEdit(false);
    });
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <button
          className="flex w-44 items-center justify-between rounded-xl border border-dark-teal px-4 py-2.5"
          onClick={onAddResource}
        >
          <p className="text-base font-normal">Add resource</p>
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
              onEdit={onEdit}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayResources;
