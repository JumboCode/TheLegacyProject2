import { Resource } from "@prisma/client";
import { RoleAlias } from "@constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      />
      <input
        className="w-full rounded-xl bg-tan px-4 py-2.5"
        defaultValue={resource.link}
      />
      <label className="flex items-center">
        <input type="checkbox" className="mr-1.5" />
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
