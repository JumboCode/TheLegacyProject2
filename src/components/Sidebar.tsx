import Link from "next/link";
import Image from "next/legacy/image";
import React, { useState } from "react";
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
    icon: faUserGroup,
  },
  {
    name: "Seniors",
    color: "#000000",
    icon: faUsers,
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
    <div className="text-md flex w-full space-x-4 pb-6 text-left font-serif duration-150 hover:translate-x-1">
      <div className="w-1/6">
        <FontAwesomeIcon icon={iconName} />
      </div>
      <div className="">{label}</div>
    </div>
  );
};

const Sidebar = (/*{ displayName }: { displayName: string }*/) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const handleMenuClick: React.MouseEventHandler = () => {
    setSidebarVisible((visible) => !visible);
  };

  return (
    <div
      className="\ top-0 flex h-full w-full flex-col place-items-center justify-between
                   bg-med-tan"
    >
      <div className="sticky top-0 h-screen w-full px-11 py-20">
        <div className="flex flex-col place-items-center pt-3.5">
          <Link href="/">
            <h1 className="z-10 pb-6 text-center font-serif text-2xl duration-150 hover:-translate-y-0.5">
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
        <div className="pt-5"></div>
        <div className="text-md flex w-full pb-2 pt-20 text-left font-serif text-xxs text-dark-gray">
          <div className="w-4">
            <FontAwesomeIcon icon={faCity} />
          </div>
          University
        </div>
        <div className="text-md flex w-full text-left font-serif text-xs">
          Tufts University
        </div>
        <hr className="my-6 h-px w-full rounded border-0 bg-black" />
        <div className="text-md flex w-full pb-1 text-left font-serif text-ms font-bold">
          Kick Doyen
        </div>
        <div className="text-md flex w-full pb-6 pt-0 text-left font-serif text-xxs text-med-gray">
          Project/Tech Lead
        </div>

        <button onClick={() => signOut({ callbackUrl: "/" })}>
          <SidebarItem label="Sign Out" iconName={faArrowRightFromBracket} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
