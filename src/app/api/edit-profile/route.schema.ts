import { z } from "zod";
import { Prisma } from "@prisma/client";

/*
  firstName     String
  lastName      String
  pronouns      String
*/

export const EditProfileRequest = z.object({
  firstName: z.string(),
  lastName: z.string(),
  pronouns: z.string(),
});

export const EditProfileResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
    message: z.literal("Profile successfully updated"),
  }),
  z.object({
    code: z.literal("INVALID_FORM"),
    message: z.literal("Invalid form submission"),
  }),
  z.object({
    code: z.literal("UNKNOWN"),
    message: z.literal("Unknown error received"),
  }),
]);

export const GetProfileRequest = z.object({
  id: z.string(),
});

export const GetProfileResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
    message: z.literal("Profile successfully retrieved"),
  }),
  z.object({
    code: z.literal("INVALID_ID"),
    message: z.literal("Invalid id"),
  }),
  z.object({
    code: z.literal("UNKNOWN"),
    message: z.literal("Unknown error received"),
  }),
]);
