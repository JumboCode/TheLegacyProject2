import { Role } from "@prisma/client";
import { z } from "zod";

export const roleSchema = z.enum([
  "USER",
  "CHAPTER_LEADER",
  "ADMIN",
]) satisfies z.ZodType<Role>;
