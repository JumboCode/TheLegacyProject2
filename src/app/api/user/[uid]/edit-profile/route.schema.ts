import { z } from "zod";

/*
  firstName     String
  lastName      String
  pronouns      String
  position      String
*/

export const EditProfileRequest = z.object({
  firstName: z.string(),
  lastName: z.string(),
  pronouns: z.string(),
  position: z.string(),
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
