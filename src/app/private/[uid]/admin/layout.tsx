"use client";

import { CollapsableSidebarContainer } from "@components/container";
import {
  faEnvelope,
  faHome,
  faHouseLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { UserContext } from "src/context/UserProvider";

interface IAdminLayout {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: IAdminLayout) => {
  const { user } = useContext(UserContext);
  const buttons = React.useMemo(
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
        name: "E-list",
        link: `/private/${user.id}/admin/elist`,
        icon: faEnvelope,
      },
      {
        name: "Profile",
        link: `/private/${user.id}/admin/edit-profile`,
        icon: faUser,
      },
    ],
    [user.id]
  );

  return (
    <CollapsableSidebarContainer buttons={buttons}>
      {children}
    </CollapsableSidebarContainer>
  );
};

export default AdminLayout;
