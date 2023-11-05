import { z } from "zod";
import { EditProfileRequest, EditProfileResponse } from "./route.schema";

type IEditProfileRequest = z.infer<typeof EditProfileRequest>;

interface IRequest extends Omit<RequestInit, "body"> {
  body: IEditProfileRequest;
}

export const editProfile = async (request: IRequest, uid: string) => {
  const { body, ...options } = request;

  const response = await fetch(`/api/user/${uid}/edit-profile`, {
    method: "PATCH",
    body: JSON.stringify(body),
    ...options,
  });

  return EditProfileResponse.parse(await response.json());
};
