import { z } from "zod";

/**
 * The SignInRequest is an object containing and email and password with at least 10 characters.
 *
 * @example
 * // Throws an error because "hello" is not a valid email
 * SignInRequest.parse({ email: "hello", password: "0123456789" });
 *
 * @example
 * // Throws an error because "a" does not contain at least 5 characters
 * SignInRequest
 * SignInRequest.parse({ email: "a@gmail.com", password: "a" });
 *
 * @example
 * // Valid SignInRequest
 * SignInRequest.parse({ email: "a@gmail.com", password: "01234" });
 */
export const SignInRequest = z.object({
  email: z.string().email({ message: "Username must be an email" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});

/**
 * The SignInResponse can be one of the 4 objects in the list.
 */
export const SignInResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
    message: z.literal("The new user was successfully registered"),
  }),

  z.object({
    code: z.literal("EMAIL_EXIST"),
    message: z.literal("The email existed already"),
  }),

  z.object({
    code: z.literal("INVALID_EMAIL"),
    message: z.literal("The email is invalid"),
  }),

  z.object({
    code: z.literal("INVALID_PASSWORD"),
    message: z.literal("The password is invalid"),
  }),

  z.object({
    code: z.literal("UNKNOWN"),
    data: z.any(),
  }),
]);
