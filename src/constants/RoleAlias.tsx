import { Role } from "@prisma/client";

export const RoleAlias: Record<Role, String> = {
  ADMIN: "Admin",
  USER: "User",
  CHAPTER_LEADER: "Chapter Leader",
};
