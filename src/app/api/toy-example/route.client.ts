import { z } from "zod";
import { SignInRequest, SignInResponse } from "./route.schema";

/**
 * Describe the interface of SignInRequest.
 */
type ISignInRequest = z.infer<typeof SignInRequest>;

type ISignInResponse = z.infer<typeof SignInResponse>;

/**
 * Extract all the values of "code".
 */
type SignInResponseCode = z.infer<typeof SignInResponse>["code"];

/**
 * Extends the parameters of fetch() function to give types to the RequestBody.
 */
interface IRequest extends Omit<RequestInit, "body"> {
  body: ISignInRequest;
}

const MOCK_SUCCESS: ISignInResponse = {
  code: "SUCCESS",
  message: "The new user was successfully registered",
};

const MOCK_EMAIL_EXIST: ISignInResponse = {
  code: "EMAIL_EXIST",
  message: "The email existed already",
};

const MOCK_INVALID_EMAIL: ISignInResponse = {
  code: "INVALID_EMAIL",
  message: "The email is invalid",
};

const MOCK_INVALID_PASSWORD: ISignInResponse = {
  code: "INVALID_PASSWORD",
  message: "The password is invalid",
};

/**
 * If "mock" is given as a parameter, the function can return mocked data for a specific case. This
 * pattern allows frontend developers to use your API before you finished implementing it!
 *
 * In addition, using Zod schemas to parse the response will make the input/output well-typed, making the code cleaner.
 */
export const signUp = async (request: IRequest, mock?: SignInResponseCode) => {
  if (mock === "SUCCESS") {
    return SignInResponse.parse(MOCK_SUCCESS);
  } else if (mock === "EMAIL_EXIST") {
    return SignInResponse.parse(MOCK_EMAIL_EXIST);
  } else if (mock === "INVALID_EMAIL") {
    return SignInResponse.parse(MOCK_INVALID_EMAIL);
  } else if (mock === "INVALID_PASSWORD") {
    return SignInResponse.parse(MOCK_INVALID_PASSWORD);
  }

  const { body, ...options } = request;
  const response = await fetch("/api/toy-example", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();

  return SignInResponse.parse(json);
};
