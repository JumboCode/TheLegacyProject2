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
import { compareResource } from "@utils";
import { Spinner } from "./skeleton";
import { createResourceSchema } from "@api/resources/route.schema";

interface IDisplayResources {
  resources: Resource[];
  showRole: boolean;
}

interface ResourceState extends Resource {
  state: "UNEDITED" | "UPDATED" | "DELETED" | "CREATED";
}

const DisplayResources = (props: IDisplayResources) => {
  const [loading, setLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [stateResources, setStateResources] = React.useState<ResourceState[]>(
    () =>
      props.resources
        .sort(compareResource)
        .map((resource) => ({ state: "UNEDITED", ...resource }))
  );
  const [canSubmit, setCanSubmit] = React.useState<boolean>(true);

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

  const getResourceByStates = (
    resources: ResourceState[],
    states: ResourceState["state"][]
  ) => {
    return resources
      .filter((curr) => states.includes(curr.state))
      .map((curr) => {
        const { state, ...rest } = curr;
        return rest;
      });
  };

  const onSaveResources = async () => {
    if (loading) {
      return false;
    }

    setLoading(true);

    const deletedResources = getResourceByStates(stateResources, [
      "DELETED",
    ]).map((curr) => curr.id);
    const updatedResources = getResourceByStates(stateResources, ["UPDATED"]);
    const createdResources = getResourceByStates(stateResources, ["CREATED"]);

    await Promise.all([
      batchCreateResources({ body: createdResources }),
      batchUpdateResources({ body: updatedResources }),
      batchDeleteResources({ body: deletedResources }),
    ]).then((res) => {
      const newResources: ResourceState[] = [
        ...getResourceByStates(stateResources, ["UNEDITED"]),
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
      setLoading(false);
      setCanSubmit(true);
    });
  };

  React.useEffect(() => {
    setCanSubmit(
      getResourceByStates(stateResources, ["UPDATED", "CREATED"])
        .map((resource) => createResourceSchema.safeParse(resource))
        .every((state) => state.success)
    );
  }, [stateResources, setCanSubmit]);

  return (
    <div>
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
            className={`rounded-xl ${
              canSubmit ? "bg-dark-teal" : "bg-[#A6A6A6]"
            } px-6 py-2 text-white`}
            onClick={onSaveResources}
            disabled={!canSubmit}
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
      {loading ? (
        <div className="flex h-full w-full flex-col items-center justify-center py-64">
          <Spinner />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default DisplayResources;
