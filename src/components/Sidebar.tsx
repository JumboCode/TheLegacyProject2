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
import Logo from "@public/icons/logo.svg";
import Image from "next/image";
import { postSenior } from "@api/senior/route.client";

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
    <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-between bg-med-tan">
      <Link href="/public/" className="flex justify-center">
        <h1 className=" mb-3 mt-20 h-auto w-full items-center justify-center px-5 duration-150 hover:-translate-y-0.5">
          <Image src={Logo} alt="logo" className="items-end" />
        </h1>
      </Link>
      <div className="mb-20 h-full w-full px-11">
        <div className="flex w-full flex-col space-y-6">
          {buttons.map((data) => (
            <Link key={data.name} href={data.link}>
              <SidebarItem label={data.name} iconName={data.icon} />
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full px-11 py-20">
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
        <button
          onClick={async () => {
            await postSenior({
              body: {
                name: "Nick Doan",
                location: "Tufts University",
                description: "tech lead",
                StudentIDs: [
                  "65d6986025f45c5a577bbf65",
                  "65d6980225f45c5a577bbf62",
                ],
              },
            }).then(() => console.log("clicked"));
          }}
        >
          <SidebarItem
            label="Create Senior"
            iconName={faArrowRightFromBracket}
          />
        </button>
        <button onClick={() => signOut({ callbackUrl: "/public/" })}>
          <SidebarItem label="Sign Out" iconName={faArrowRightFromBracket} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
