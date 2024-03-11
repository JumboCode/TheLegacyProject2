"use client";

import Sidebar, { ISideBar } from "@components/Sidebar";
import { CollapsableSidebarContainer } from "@components/container";
import {
  faHome,
  faUser,
  faUserGroup,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
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
        link: `/private/${user.id}/chapter-leader/home`,
        icon: faHome,
      },
      {
        name: "Members",
        link: `/private/${user.id}/chapter-leader/users`,
        icon: faUserGroup,
      },
      // @TODO(nickbar01234) - Fix icon
      {
        name: "Seniors",
        link: `/private/${user.id}/chapter-leader/seniors`,
        icon: faUserGroup,
      },
      {
        name: "Pending",
        link: `/private/${user.id}/chapter-leader/pending`,
        icon: faUserPlus,
      },
      {
        name: "Profile",
        link: `/private/${user.id}/chapter-leader/edit-profile`,
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

export default UserLayout;
