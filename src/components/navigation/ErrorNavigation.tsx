"use client";

import { Popup } from "@components/container";
import { UserContext } from "@context/UserProvider";
import { formatUserHomeRoute } from "@utils";
import { useRouter } from "next/navigation";
import React from "react";

interface ErrorNavigationProps {
  message?: string;
  redirectTo?: string;
  redirectMessage?: string;
}

const ErrorNavigation = ({
  message,
  redirectTo,
  redirectMessage,
}: ErrorNavigationProps) => {
  const router = useRouter();
  const userContext = React.useContext(UserContext);

  return (
    <Popup>
      <div className="text-wrap flex h-full w-full flex-col items-center justify-center gap-y-6">
        <h1 className="text-lg text-white sm:text-xl">
          {message ?? "Oops, an error has occurred."}
        </h1>
        <button
          className="mx-1 w-fit rounded bg-white p-3 text-lg text-dark-teal drop-shadow-md"
          onClick={() =>
            router.replace(redirectTo ?? formatUserHomeRoute(userContext.user))
          }
        >
          {redirectMessage ?? "Redirect"}
        </button>
      </div>
    </Popup>
  );
};

export default ErrorNavigation;
