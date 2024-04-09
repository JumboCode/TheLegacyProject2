import { authOptions } from "@api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const getServerSessionOrRedirect = async () => {
  const session = await getServerSession(authOptions);
  if (session == null) {
    redirect("/public");
  }
  return session;
};
