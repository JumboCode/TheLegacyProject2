import { Prisma } from "@prisma/client";
import z from "zod";

const roleSchema = z.enum(["USER", "CHAPTER_LEADER", "ADMIN"]);

/**
 * TODO - What should the maximum length of title be?
 */
export const createResourceSchema = z.object({
  access: z
    .array(roleSchema)
    .refine((roles) => new Set(roles).size === roles.length, {
      message: "Duplicated roles",
    }),
  link: z.string().url(),
  title: z.string().min(1),
}) satisfies z.ZodType<Prisma.ResourceCreateInput>;

export const resourceSchema = createResourceSchema.extend({ id: z.string() });

export const batchCreateRequestSchema = z.array(createResourceSchema);

export const batchUpdateRequestSchema = z.array(resourceSchema);

export const idResourceSchema = z.string();

export const batchDeleteRequestSchema = z.array(idResourceSchema);

export const batchResponseSchema = z.object({
  data: z.array(resourceSchema),
  code: z.literal("SUCCESS"),
});
