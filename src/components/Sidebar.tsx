"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { signOut } from "next-auth/react";
import {
  faArrowRightFromBracket,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "src/context/UserProvider";

interface Button {
  name: string;
  icon: IconDefinition;
  link: string;
}

export interface ISideBar {
  buttons: Button[];
}

const SidebarItem = ({
  label,
  iconName,
}: {
  label: string;
  iconName: IconDefinition;
}) => {
  return (
    <div className="flex w-full space-x-4 text-left font-serif duration-150 hover:translate-x-1">
      <div className="flex w-1/6 items-center justify-center">
        <FontAwesomeIcon icon={iconName} size="lg" />
      </div>
      <div className="flex w-5/6 items-center text-xl">{label}</div>
    </div>
  );
};

const Sidebar = ({ buttons }: ISideBar) => {
  const { user } = useContext(UserContext);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const handleMenuClick: React.MouseEventHandler = () => {
    setSidebarVisible((visible) => !visible);
  };

  return (
    <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-between bg-med-tan px-11 py-20">
      <div className="w-full">
        <Link href="/public/">
          <h1 className="z-10 mb-8 text-center font-serif text-3xl duration-150 hover:-translate-y-0.5">
            The Legacy Project
          </h1>
        </Link>
        <div className="flex w-full flex-col space-y-6">
          {buttons.map((data) => (
            <Link key={data.name} href={data.link}>
              <SidebarItem label={data.name} iconName={data.icon} />
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full">
        {/* TODO(nickbar01234) - Render university name */}
        {/* <div className="text-md flex pb-2 pt-20 text-left font-serif text-xxs text-dark-gray">
          <div className="w-4">
            <FontAwesomeIcon icon={faCity} />
          </div>
          University
        </div>
        <div className="text-md flex w-full text-left font-serif text-xs">
          Tufts University
        </div> */}
        <hr className="my-6 h-px w-full rounded border-0 bg-black" />
        <div className="mb-1 flex w-full text-left font-serif text-lg font-bold">
          {user.name ?? ""}
        </div>
        <div className="flex w-full pb-6 pt-0 text-left font-serif text-sm text-med-gray">
          {user.role[0] + user.role.toLowerCase().slice(1)}
        </div>
        <button onClick={() => signOut({ callbackUrl: "/public/" })}>
          <SidebarItem label="Sign Out" iconName={faArrowRightFromBracket} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
