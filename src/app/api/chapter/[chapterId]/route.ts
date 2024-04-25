import { withSessionAndRole } from "@server/decorator";
import { prisma } from "@server/db/client";
import { driveV3 } from "@server/service";
import { NextResponse } from "next/server";
import { DeleteChapterResponse } from "./route.schema";

export const DELETE = withSessionAndRole(["ADMIN"], async ({ params }) => {
  // TODO
  // 1. Implement route.client.ts
  // 2. Implement route.schema.ts
  // 3. Finish deleting chapter
  // 4. Add it to AdminHomePage

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
      DeleteChapterResponse.parse({
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

  await prisma.chapterRequest.delete({
    where: {
      id: chapter.chapterRequestId,
    },
  });

  await prisma.userRequest.deleteMany({
    where: {
      chapterId: chapterId,
    },
  });

  chapter.students.forEach(async (student) => {
    await prisma.user.update({
      where: {
        id: student.id,
      },
      data: {
        ChapterID: null,
      },
    });
  });

  await prisma.chapter.delete({
    where: {
      id: chapterId,
    },
  });

  return NextResponse.json(
    DeleteChapterResponse.parse({
      code: "SUCCESS",
      message: "The chapter was successfully deleted",
    }),
    { status: 200 }
  );
});
