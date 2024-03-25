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
  message: z
    .string()
    .default("Unknown error. Please contact the developers for help"),
});

export const unknownErrorResponse = unknownErrorSchema.parse({
  code: "UNKNOWN",
  message: "An unknown error occured",
});

export const unauthorizedErrorResponse = unauthorizedErrorSchema.parse({
  code: "UNAUTHORIZED",
  message: "The action cannot be performed by the current user",
});

export const invalidFormErrorSchema = z.object({
  code: z.literal("INVALID_FORM"),
  message: z.string(),
});

export const invalidFormReponse = invalidFormErrorSchema.parse({
  code: "INVALID_FORM",
  message: "The form is not valid",
});

export const invalidRequestSchema = z.object({
  code: z.literal("INVALID_REQUEST"),
  message: z.string(),
});

export const invalidRequestResponse = invalidRequestSchema.parse({
  code: "INVALID_REQUEST",
  message: "Request body is invalid",
});

export type IUnauthorizedErrorSchema = z.infer<typeof unauthorizedErrorSchema>;
