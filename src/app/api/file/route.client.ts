import { z } from "zod";
import { FileResponse } from "./route.schema";
import { File } from "@server/model";

/**
 * Describe the interface of SignInRequest.
 */
type IFile = z.infer<typeof File>;

/**
 * Extends the parameters of fetch() function to give types to the RequestBody.
 */
interface IRequest extends Omit<RequestInit, "body"> {
  body: IFile;
}

export const createFile = async (request: IRequest) => {
  const { body, ...options } = request;

  const response = await fetch("/api/file", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });

  const json = await response.json();

  return FileResponse.parse(json);
};
