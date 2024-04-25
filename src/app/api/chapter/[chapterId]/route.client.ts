import { DeleteChapterResponse } from "./route.schema";

export const DeleteChapter = async (chapterId: string) => {
  const response = await fetch(`/api/chapter/${chapterId}`, {
    method: "DELETE",
  });
  const json = await response.json();
  console.log(json);
  return DeleteChapterResponse.parse(json);
};
