import { Resource } from "@prisma/client";
import { RoleAlias } from "src/constants/RoleAlias";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Role } from "@prisma/client";
import {
  faArrowUpRightFromSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
  const displayRow =
    showRole &&
    resource.access.length === 1 &&
    resource.access[0] === "CHAPTER_LEADER";

  return isEdit ? (
    <div className="flex w-full flex-col gap-y-2.5 rounded-lg bg-white px-8 py-6">
      <input
        className="w-full rounded-xl bg-tan px-4 py-2.5"
        defaultValue={resource.title}
        placeholder="How to grow my chapter"
        onChange={(e) => {
          resource.title = e.target.value;
          onEdit(resource);
        }}
      />
      <input
        className="w-full rounded-xl bg-tan px-4 py-2.5"
        defaultValue={resource.link}
        placeholder="https://www.google.com/"
        onChange={(e) => {
          resource.link = e.target.value;
          onEdit(resource);
        }}
      />
      <label className="flex items-center">
        {/* 
          TODO (Johnny and Tia) :
            -test for role update on change
            -to implement: newly created resources should have the state "CREATED" 
         */}
        <input
          type="checkbox"
          className="mr-1.5"
          onChange={(e) => {
            if (resource.access.includes(Role.CHAPTER_LEADER)) {
              resource.access = resource.access.filter(
                (eachRole) => eachRole != Role.CHAPTER_LEADER
              );
            } else {
              resource.access.push(Role.CHAPTER_LEADER);
            }

            console.log(e.target.value);
            // resource.access = updated access
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
    <div className="flex h-24 w-full flex-col gap-y-2.5 rounded-lg bg-white p-6">
      <div className="flex items-center justify-between text-xl font-normal">
        <p className="text-xl">{resource.title}</p>
        <Link href={resource.link}>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />{" "}
        </Link>
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
