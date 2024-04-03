"use client";

import { Spinner } from "@components/skeleton";
import { UserContext } from "@context/UserProvider";
import { useUserRedirect } from "@hooks";
import React from "react";

interface RootNavigationProps {
  children?: React.ReactNode;
}

/**
 * Dummy wrapper to check for route protection. Expected to be use in a layout.tsx component.
 */
const RootNavigation = ({ children }: RootNavigationProps) => {
  const userContext = React.useContext(UserContext);
  const { role, id } = userContext.user;
  const { valid } = useUserRedirect({ uid: id, role: role });

  if (!valid) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
};

export default RootNavigation;
