import { Resource } from "@prisma/client";
import { RoleAlias } from "@constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Role } from "@prisma/client";
import {
  faArrowUpRightFromSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createResourceSchema } from "@api/resources/route.schema";
import { z } from "zod";
import React from "react";

interface IResourceProp {
  resource: Resource;
  isEdit: boolean;
  showRole: boolean;
  onEdit: (resource: Resource) => void;
  onDelete: (resource: Resource) => void;
}

const ResourceTile = ({
  showRole,
  resource,
  isEdit,
  onDelete,
  onEdit,
}: IResourceProp) => {
  const {
    register,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm<z.infer<typeof createResourceSchema>>({
    resolver: zodResolver(createResourceSchema),
    defaultValues: {
      title: resource.title,
      link: resource.link,
    },
    mode: "onBlur",
  });

  const displayRow =
    showRole &&
    resource.access.length === 1 &&
    resource.access[0] === "CHAPTER_LEADER";

  React.useEffect(() => {
    trigger();
  }, [trigger]);

  return isEdit ? (
    <div className="flex h-56 w-full flex-col justify-between rounded-lg bg-white px-8 py-4">
      <div>
        <input
          {...register("title", {
            onChange: (e) => {
              clearErrors("title");
              resource.title = e.target.value;
              onEdit(resource);
            },
          })}
          className="w-full rounded-xl bg-tan px-4 py-2.5"
          defaultValue={resource.title}
          placeholder="How to grow my chapter"
          autoComplete="off"
        />
        <p className="text-sm text-sunset-orange before:content-['\200b']">
          {errors.title && "Title is required"}
        </p>
      </div>
      <div>
        <input
          {...register("link", {
            onChange: (e) => {
              clearErrors("link");
              resource.link = e.target.value;
              onEdit(resource);
            },
          })}
          className="w-full rounded-xl bg-tan px-4 py-2.5"
          defaultValue={resource.link}
          placeholder="https://www.google.com/"
          autoComplete="off"
        />
        <p className="text-sm text-sunset-orange before:content-['\200b']">
          {errors.link && "Link must be valid"}
        </p>
      </div>
      <label className="flex items-center">
        <input
          type="checkbox"
          className="mr-1.5"
          checked={resource.access.includes(Role.CHAPTER_LEADER)}
          onChange={() => {
            if (resource.access.includes(Role.CHAPTER_LEADER)) {
              resource.access = resource.access.filter(
                (eachRole) => eachRole != Role.CHAPTER_LEADER
              );
            } else {
              resource.access.push(Role.CHAPTER_LEADER);
            }
            onEdit(resource);
          }}
        />
        {RoleAlias["CHAPTER_LEADER"]}
      </label>
      <FontAwesomeIcon
        icon={faTrashCan}
        className="h-5 w-5 cursor-pointer self-end text-sunset-orange"
        onClick={() => onDelete(resource)}
      />
    </div>
  ) : (
    <div className="flex h-24 w-full flex-col gap-y-2.5 rounded-lg bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between text-xl font-normal">
        <p className="text-xl">{resource.title}</p>
        <a target="_blank" href={resource.link} rel="noopener noreferrer">
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />{" "}
        </a>
      </div>
      {displayRow && (
        <div className="text-sm font-normal text-[#65696C]">
          {RoleAlias["CHAPTER_LEADER"]}
        </div>
      )}
    </div>
  );
};

export default ResourceTile;
