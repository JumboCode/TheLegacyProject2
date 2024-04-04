import { RoleToUrlSegment } from "@constants";
import { Session } from "next-auth";
import { Resource, Senior, User } from "@prisma/client";
import moment from "moment";

type PositionOrder = {
  [position: string]: number;
};

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

export const seniorFullName = (senior: Senior) =>
  `${senior.firstname} ${senior.lastname}`;

export const sortedStudents = (students: User[]) => {
  const positionOrder: PositionOrder = {
    "Social Coordinator": 0,
    "Senior Outreach Coordinator": 1,
    "Head of Media": 2,
    Secretary: 3,
    Treasurer: 4,
    "Match Coordinator": 5,
  };

  const comparePositions = (a: User, b: User) => {
    if (a.role === "CHAPTER_LEADER" && b.role !== "CHAPTER_LEADER") {
      return -1;
    }
    if (b.role === "CHAPTER_LEADER" && a.role !== "CHAPTER_LEADER") {
      return 1;
    }

    const orderA = positionOrder[a.position] || Infinity;
    const orderB = positionOrder[b.position] || Infinity;

    return orderA - orderB;
  };

  return students.sort(comparePositions);
};
