import { NextRequest, NextResponse } from "next/server";
import { SignInRequest, SignInResponse } from "./route.schema";

const DATABASE = [
  {
    email: "nicky@gmail.com",
    password: "Hello",
  },
  {
    email: "kim@gmail.com",
    password: "World",
  },
];

export const POST = async (request: NextRequest) => {
  // safeParse prevents an error from being thrown.
  const maybeBody = SignInRequest.safeParse(await request.json());

  if (!maybeBody.success) {
    // Check which field fails the schema.
    const error = maybeBody.error.format();
    if (error.email) {
      return NextResponse.json(
        SignInResponse.parse({
          code: "INVALID_EMAIL",
          message: "The email is invalid",
        }),
        { status: 400 }
      );
    } else if (error.password) {
      return NextResponse.json(
        SignInResponse.parse({
          code: "INVALID_PASSWORD",
          message: "The password is invalid",
        }),
        { status: 400 }
      );
    } else {
      // When we add new fields to the schema, we may forget to handle it
      // in the API route. This last case serves a catch-all.
      return NextResponse.json(
        SignInResponse.parse({
          code: "UNKNOWN",
          data: "Forgot to handle an error",
        }),
        { status: 500 }
      );
    }
  } else {
    const body = maybeBody.data;

    // Checks if email is unique.
    const hasSameEmail = DATABASE.some((user) => user.email === body.email);
    if (hasSameEmail) {
      return NextResponse.json(
        SignInResponse.parse({
          code: "EMAIL_EXIST",
          message: "The email existed already",
        }),
        { status: 400 }
      );
    }

    // Add user to database and return success.
    DATABASE.push(body);
    return NextResponse.json(
      SignInResponse.parse({
        code: "SUCCESS",
        message: "The new user was successfully registered",
      }),
      { status: 200 }
    );
  }
};
