"use client";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

interface IUserProvider {
  children: React.ReactNode;
}

interface IAuthenticatedUser {
  user: NonNullable<Session["user"]>;
}

const UserContext = React.createContext<IAuthenticatedUser>(
  {} as IAuthenticatedUser
);

/**
 * Redirects to public home page if the current user is not authenticated.
 */
const UserProvider = ({ children }: IUserProvider) => {
  const { data, status } = useSession({
    required: true,
    onUnauthenticated: () => redirect("/public/"),
  });

  if (status === "loading" || data?.user == undefined) {
    // @TODO - Talk to Fa about spinner style
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <svg
          className="h-20 w-20 animate-spin rounded-full border-8 border-gray-300 border-t-dark-teal"
          viewBox="0 0 24 24"
        />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user: data.user }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
export default UserProvider;
