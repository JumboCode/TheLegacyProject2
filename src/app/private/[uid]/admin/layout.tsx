"use client";

import Sidebar, { ISideBar } from "@components/Sidebar";
import { faHome, faHouseLock, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { UserContext } from "src/context/UserProvider";

interface IAdminLayout {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: IAdminLayout) => {
  const { user } = useContext(UserContext);
  const buttons: ISideBar["buttons"] = React.useMemo(
    () => [
      {
        name: "Home",
        link: `/private/${user.id}/admin/home`,
        icon: faHome,
      },
      {
        name: "Pending Chapters",
        link: `/private/${user.id}/admin/pending-chapters`,
        icon: faHouseLock,
      },
      {
        name: "Profile",
        link: `/private/${user.id}/admin/profile`,
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

export default AdminLayout;
