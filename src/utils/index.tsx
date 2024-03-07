import { RoleToUrlSegment } from "@constants";
import { Session } from "next-auth";
import { Resource, User } from "@prisma/client";
import moment from "moment";

export const formatUserHomeRoute = (user: NonNullable<Session["user"]>) => {
  return `/private/${user.id}/${RoleToUrlSegment[user.role]}/home`;
};

/**
 * Compare resource by alphabetical order.
 */
export const compareResource = (x: Resource, y: Resource) => {
  if (x.title > y.title) {
    return 1;
  } else if (x.title < y.title) {
    return -1;
  }
  return 0;
};

/**
 * Compare user fullname by alphabetical order.
 */
export const compareUser = (x: User, y: User) => {
  const xName = fullName(x);
  const yName = fullName(y);
  if (xName > yName) {
    return 1;
  } else if (xName < yName) {
    return -1;
  } else {
    return 0;
  }
};

export const formatFileDate = (date: Date) =>
  moment(date).format("MMM DD YYYY");

export const fullName = (user: User) => `${user.firstName} ${user.lastName}`;
