import { deleteChapterResponse } from "./route.schema";

export const deleteChapter = async (chapterId: string) => {
  const response = await fetch(`/api/chapter/${chapterId}`, {
    method: "DELETE",
  });
  const json = await response.json();
  return deleteChapterResponse.parse(json);
};
