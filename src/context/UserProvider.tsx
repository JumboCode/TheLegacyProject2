"use client";

import { Spinner } from "@components/skeleton";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

type UserWithChapter = Prisma.UserGetPayload<{ include: { Chapter: true } }>;

interface IUserProvider {
  children: React.ReactNode;
  user: UserWithChapter;
}

interface IUserContext {
  user: UserWithChapter;
}

const UserContext = React.createContext<IUserContext>({} as IUserContext);

/**
 * Redirects to public home page if the current user is not authenticated.
 */
const UserProvider = ({ user, children }: IUserProvider) => {
  const { data, status } = useSession({
    required: true,
    onUnauthenticated: () => redirect("/public/"),
  });

  if (status === "loading" || data?.user == undefined) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  } else {
    return (
      <UserContext.Provider value={{ user: user }}>
        {children}
      </UserContext.Provider>
    );
  }
};

export { UserContext };
export default UserProvider;
