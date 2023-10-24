import Link from "next/link";
import Image from "next/legacy/image";
import { signOut } from "next-auth/react";
import {
  faHouse,
  faUsers,
  faUserGroup,
  faUserPlus,
  faCircleUser,
  faCity,
  faArrowRightFromBracket,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Button {
  name: string;
  color: string;
  icon: IconDefinition;
}

const userLinks: Button[] = [
  {
    name: "Home",
    color: "#000000",
    icon: faHouse,
  },
  {
    name: "Students",
    color: "#000000",
    icon: faUsers,
  },
  {
    name: "Seniors",
    color: "#000000",
    icon: faUserGroup,
  },
  {
    name: "Pending",
    color: "#000000",
    icon: faUserPlus,
  },
  {
    name: "Profile",
    color: "#000000",
    icon: faCircleUser,
  },
];

const SidebarItem = ({
  label,
  iconName,
}: {
  label: string;
  iconName: IconDefinition;
}) => {
  return (
    <div className="text-md flex w-full space-x-4 p-2 px-10 text-left font-serif duration-150 hover:translate-x-1">
      <div className="w-1/6 duration-150 hover:translate-x-1">
        <FontAwesomeIcon icon={iconName} />
      </div>
      <div className="">{label}</div>
    </div>
  );
};

const Sidebar = (/*{ displayName }: { displayName: string }*/) => {
  return (
    <div
      className="\ top-0 flex h-screen w-[210px] flex-col justify-start border-r
                    border-darker-tan bg-med-tan py-16"
    >
      <div className="flex flex-col place-items-center p-4">
        <Link href="/">
          <h1 className="z-10 text-center font-serif text-2xl duration-150 hover:-translate-y-0.5">
            The Legacy Project
          </h1>
        </Link>
      </div>

      <div className="flex w-full flex-col">
        {userLinks.map((data) => (
          <div key={data.name}>
            <SidebarItem label={data.name} iconName={data.icon} />
          </div>
        ))}
      </div>

      <div className="pt-15"></div>

      <div className="text-md flex w-full px-10 pt-20 text-left font-serif text-xxs text-dark-gray">
        <div className="w-4">
          <FontAwesomeIcon icon={faCity} />
        </div>
        University
      </div>

      <div className="text-md flex w-full pt-1 px-10 text-left font-serif text-xs">
        Tufts University
      </div>

      <hr className="mx-10 my-5 h-px rounded border-0 bg-black" />

      <div className="text-md flex w-full px-10 text-left font-serif">
        Kick Doyen
      </div>
      <div className="text-md flex w-full p-2 px-10 pb-10 pt-0 text-left font-serif text-xxs text-dark-gray">
        Project/Tech Lead
      </div>

      <button onClick={() => signOut({ callbackUrl: "/" })}>
        <SidebarItem label="Sign Out" iconName={faArrowRightFromBracket} />
      </button>
    </div>
  );
};

export default Sidebar;
