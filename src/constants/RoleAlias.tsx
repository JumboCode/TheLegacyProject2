import { Role } from "@prisma/client";

export const RoleAlias: Record<Role, string> = {
  ADMIN: "Admin",
  USER: "User",
  CHAPTER_LEADER: "Chapter Leader",
};

// Maps role to url segment
export const RoleToUrlSegment: Record<Role, string> = {
  ADMIN: "admin",
  USER: "user",
  CHAPTER_LEADER: "chapter-leader",
};
