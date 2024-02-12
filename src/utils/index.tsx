import { RoleToUrlSegment } from "@constants";
import { Session } from "next-auth";

export const formatUserHomeRoute = (user: NonNullable<Session["user"]>) => {
  return `/private/${user.id}/${RoleToUrlSegment[user.role]}/home`;
};
