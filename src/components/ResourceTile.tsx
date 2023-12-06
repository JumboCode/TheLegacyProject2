import { Resource } from "@prisma/client";
import { RoleAlias } from "src/constants/RoleAlias";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface IResourceProp {
  resource: Resource;
  isEdit: boolean;
  showRole: boolean;
}

const ResourceTile = ({ showRole, resource, isEdit }: IResourceProp) => {
  const displayRow =
    showRole &&
    resource.access.length === 1 &&
    resource.access[0] === "CHAPTER_LEADER";

  return isEdit ? (
    <div className="flex w-full rounded-lg bg-white p-6">
      <div className="text-sm font-normal">{resource.title}</div>
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
