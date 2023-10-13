/**
 * Define common schema that is shared across multiple route handlers here.
 */

import { z } from "zod";

export const unauthorizedErrorSchema = z.object({
  code: z.literal("UNAUTHORIZED"),
  message: z.literal("The action cannot be performed by the current user"),
});

/**
 * Specify uncaught error, such as network error.
 */
export const unknownErrorSchema = z.object({
  code: z.literal("UNKNOWN"),
  message: z.string(),
});

export const unauthorizedErrorResponse = unauthorizedErrorSchema.parse({
  code: "UNAUTHORIZED",
  message: "The action cannot be performed by the current user",
});

export type IUnauthorizedErrorSchema = z.infer<typeof unauthorizedErrorSchema>;
