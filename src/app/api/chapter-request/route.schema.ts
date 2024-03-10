import { Prisma } from "@prisma/client";
import { z } from "zod";

/*
  firstName            String
  lastName             String
  universityEmail      String    @unique
  phoneNumber          String
  university           String
  universityAddress    String
  leadershipExperience String
  motivation           String
  availabilities       String
  questions            String
*/
export const ChapterRequest = z.object({
  firstName: z.string().min(1, "Please provide a first name"),
  lastName: z.string().min(1, "Please provide a last name"),
  universityEmail: z.string().email("This is not a valid email"),
  phoneNumber: z.string().length(10, "Phone number must be 10 digits"),
  university: z.string().min(1, "Please provide a university"),
  universityAddress: z.string().min(1, "Please provide an address"),
  leadershipExperience: z
    .string()
    .min(1, "Please state some leadership experience"),
  motivation: z
    .string()
    .min(1, "Please describe your motivation in joining the legacy project"),
  // TODO: Figure out if availabilities should have a better type
  availabilities: z.string().min(1, "Please provide some times"),
  questions: z.string(),
}) satisfies z.ZodType<Prisma.ChapterRequestCreateInput>;

export const ChapterRequestResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
    message: z.literal("Chapter request successfully submitted"),
  }),
  z.object({
    code: z.literal("INVALID_FORM"),
    message: z.literal("Invalid form submission"),
  }),
  z.object({
    code: z.literal("UNKNOWN"),
    message: z.literal("Unknown error received"),
  }),
  z.object({
    code: z.literal("DUPLICATE_EMAIL"),
    message: z.literal(
      "A chapter request associated with this email already exists"
    ),
  }),
]);
