import { describe, expect, test } from "vitest";
import { ChapterRequest } from "./route.schema";

describe("ChapterRequest", () => {
  test("InvalidEmailThrowsError", () => {
    expect(() =>
      ChapterRequest.parse({
        firstName: "John",
        lastName: "Doe",
        universityEmail: "not an email",
        phoneNumber: "1234567890",
        university: "University of Waterloo",
        universityAddress: "123 University Ave",
        leadershipExperience: "I have lots of leadership experience",
        motivation: "I am very motivated",
        availabilities: "I am available",
        questions: "I have a question",
      })
    ).toThrowError("Please provide a valid email");
  });
});
