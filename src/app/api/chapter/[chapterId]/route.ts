import { withSessionAndRole } from "@server/decorator";
import { prisma } from "@server/db/client";
import { driveV3 } from "@server/service";
import { NextResponse } from "next/server";
import { deleteChapterResponse } from "./route.schema";

export const DELETE = withSessionAndRole(["ADMIN"], async ({ params }) => {
  const chapterId = params.params.chapterId;
  const chapter = await prisma.chapter.findUnique({
    where: {
      id: chapterId,
    },
    include: {
      students: true,
      seniors: true,
    },
  });

  if (chapter == null) {
    // If no ID is found, chapter has been deleted by another admin.
    return NextResponse.json(
      deleteChapterResponse.parse({
        code: "CHAPTER_NOT_FOUND",
        message: "Chapter not found",
      }),
      { status: 404 }
    );
  }

  await Promise.allSettled(
    chapter.permissions.map((permissionId) =>
      driveV3.permissions.delete({
        fileId: chapter.chapterFolder,
        permissionId: permissionId,
      })
    )
  );

  await prisma.user.updateMany({
    where: {
      ChapterID: chapterId,
    },
    data: {
      SeniorIDs: {
        set: [],
      },
      position: "",
      role: "USER",
    },
  });

  await prisma.chapterRequest.delete({
    where: {
      id: chapter.chapterRequestId,
    },
  });

  return NextResponse.json(
    deleteChapterResponse.parse({
      code: "SUCCESS",
      message: "The chapter was successfully deleted",
    }),
    { status: 200 }
  );
});
