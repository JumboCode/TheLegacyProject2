import { NextResponse } from "next/server";
import {
  HandleChapterRequest,
  HandleChapterRequestResponse,
} from "./route.schema";
import { withSession } from "@server/decorator";
import { createDriveService } from "@server/service";
import { env } from "@env/server.mjs";
import { prisma } from "@server/db/client";

export const POST = withSession(async ({ req, session }) => {
  const handleChapterRequest = HandleChapterRequest.safeParse(await req.json());
  if (!handleChapterRequest.success) {
    return NextResponse.json(
      HandleChapterRequestResponse.parse({
        code: "INVALID_REQUEST",
        message: "Invalid API request",
      }),
      { status: 400 }
    );
  }

  const body = handleChapterRequest.data;
  const chapterRequest = await prisma.chapterRequest.findFirst({
    where: {
      id: body.chapterRequestId,
    },
  });
  if (chapterRequest == null || chapterRequest.approved === "APPROVED") {
    // If chapter request does not exist, it means that another admin has denied it.
    // If chapter request has been approved, do nothing.
    return NextResponse.json(
      HandleChapterRequestResponse.parse({
        code: "SUCCESS",
        message: "Chapter request successfully handled",
      })
    );
  } else if (!body.approved) {
    await prisma.chapterRequest.delete({
      where: {
        id: body.chapterRequestId,
      },
    });
    return NextResponse.json(
      HandleChapterRequestResponse.parse({
        code: "SUCCESS",
        message: "Chapter request successfully handled",
      }),
      { status: 200 }
    );
  } else {
    // Don't delete chapterRequest on approve to store metadata
    await prisma.chapterRequest.update({
      where: { id: body.chapterRequestId },
      data: { approved: "APPROVED" },
    });

    const createdChapter = await prisma.chapter.create({
      data: {
        chapterName: chapterRequest.university,
        location: chapterRequest.universityAddress,
      },
    });

    const baseFolder = env.GOOGLE_BASEFOLDER;
    const fileMetadata = {
      name: [`${chapterRequest.university}-${createdChapter.id}`],
      mimeType: "application/vnd.google-apps.folder",
      parents: [baseFolder],
    };
    const fileCreateData = {
      resource: fileMetadata,
      fields: "id",
    };

    const service = await createDriveService(session.user.id);
    const file = await service.files.create(fileCreateData);
    const googleFolderId = file.data.id as string;

    await prisma.chapter.update({
      where: {
        id: createdChapter.id,
      },
      data: {
        chapterFolder: googleFolderId,
      },
    });

    return NextResponse.json(
      HandleChapterRequestResponse.parse({
        code: "SUCCESS",
        message: "Chapter request successfully handled",
      }),
      { status: 200 }
    );
  }
});
