"use client";

import { CollapsableSidebarContainer } from "@components/container";
import { faHome, faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { UserContext } from "src/context/UserProvider";

interface IUserLayout {
  children: React.ReactNode;
}

const UserLayout = ({ children }: IUserLayout) => {
  const { user } = useContext(UserContext);
  const buttons = React.useMemo(
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
    <CollapsableSidebarContainer buttons={buttons}>
      {children}
    </CollapsableSidebarContainer>
  );
};

export default UserLayout;
