import { z } from "zod";
import { EditProfileRequest, EditProfileResponse } from "./route.schema";

type IEditProfileRequest = z.infer<typeof EditProfileRequest>;

type IEditProfileResponse = z.infer<typeof EditProfileResponse>;

type EditProfileResponseCode = z.infer<typeof EditProfileResponse>["code"];

interface IRequest extends Omit<RequestInit, "body"> {
  body: IEditProfileRequest;
}

const MOCK_SUCCESS: IEditProfileResponse = {
  code: "SUCCESS",
  message: "Profile successfully updated",
};

const MOCK_UNKNOWN: IEditProfileResponse = {
  code: "UNKNOWN",
  message: "Unknown error received",
};

const MOCK_INVALID_FORM: IEditProfileResponse = {
  code: "INVALID_FORM",
  message: "Invalid form submission",
};

/**
 * If "mock" is given as a parameter, the function can return mocked data for a specific case. This
 * pattern allows frontend developers to use your API before you finished implementing it!
 *
 * In addition, using Zod schemas to parse the response will make the input/output well-typed, making the code cleaner.
 */
export const editProfile = async (
  request: IRequest,
  mock?: EditProfileResponseCode
) => {
  if (mock === "SUCCESS") {
    return EditProfileResponse.parse(MOCK_SUCCESS);
  } else if (mock === "INVALID_FORM") {
    return EditProfileResponse.parse(MOCK_INVALID_FORM);
  } else if (mock === "UNKNOWN") {
    return EditProfileResponse.parse(MOCK_UNKNOWN);
  }

  const { body, ...options } = request;

  const response = await fetch("/api/edit-profile", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });

  return EditProfileResponse.parse(await response.json());
};
