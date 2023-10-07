import { describe, expect, test } from "vitest";
import { SignInRequest } from "./route.schema";

describe("SignInRequest", () => {
  test("InvalidEmailThrowsError", () => {
    expect(() =>
      SignInRequest.parse({ email: "abc", password: "12345" })
    ).toThrowError("Username must be an email");
  });
});
