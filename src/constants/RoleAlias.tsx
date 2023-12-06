import { Role } from "@prisma/client";

export const RoleAlias: Record<Role, string> = {
  ADMIN: "Admin",
  USER: "User",
  CHAPTER_LEADER: "Chapter Leader",
};
