"use client";

import Sidebar, { ISideBar } from "@components/Sidebar";
import { faHome, faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { UserContext } from "src/context/UserProvider";

interface IUserLayout {
  children: React.ReactNode;
}

const UserLayout = ({ children }: IUserLayout) => {
  const { user } = useContext(UserContext);
  const buttons: ISideBar["buttons"] = React.useMemo(
    () => [
      {
        name: "Home",
        link: `/private/${user.id}/user/home`,
        icon: faHome,
      },
      {
        name: "Seniors",
        link: `/private/${user.id}/user/seniors`,
        icon: faUsers,
      },
      {
        name: "Profile",
        link: `/private/${user.id}/user/edit-profile`,
        icon: faUser,
      },
    ],
    [user.id]
  );

  return (
    <div className="grid h-full w-full grid-cols-12">
      <div className="col-span-2 bg-[#E7E0D6]">
        <Sidebar buttons={buttons} />
      </div>
      <div className="col-span-10 bg-[#F4F0EB]">{children}</div>
    </div>
  );
};

export default UserLayout;
