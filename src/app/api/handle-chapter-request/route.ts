import { NextRequest, NextResponse } from "next/server";
import {
  HandleChapterRequest,
  HandleChapterRequestResponse,
} from "./route.schema";
import { withSession } from "@server/decorator";
import { createDriveService } from "@server/service";
import { env } from "@env/server.mjs";
import { prisma } from "@server/db/client";

export const POST = withSession(async ({ req, session }) => {
  // Validate the data in the request
  // If the data is invalid, return a 400 response
  // with a JSON body containing the validation errors

  // Validate a proper JSON was passed in as well
  try {
    const handleChapterRequest = HandleChapterRequest.safeParse(
      await req.json()
    );
    if (!handleChapterRequest.success) {
      return NextResponse.json(
        HandleChapterRequestResponse.parse({
          code: "INVALID_REQUEST",
          message: "Invalid API request",
        }),
        { status: 400 }
      );
    } else {
      const body = handleChapterRequest.data;
      // Check if the chapter request even exists
      const chapterRequest = await prisma.chapterRequest.findFirst({
        where: {
          id: String(body.chapterRequestId),
        },
      });
      if (!chapterRequest) {
        return NextResponse.json(
          HandleChapterRequestResponse.parse({
            code: "CHAPTER_REQUEST_NOT_FOUND",
            message:
              "A chapter request associated with the given ID does not exist",
          }),
          { status: 400 }
        );
      }
      // Check if the chapter request has already been approved/denied
      if (chapterRequest.approved !== "PENDING") {
        return NextResponse.json(
          {
            code: "INVALID_REQUEST",
            message: "Invalid API request",
          },
          { status: 400 }
        );
      }
      // If approved, create a new chapter and update approved field of chapter request
      if (body.approved === true) {
        const createdChapter = await prisma.chapter.create({
          data: {
            chapterName: chapterRequest.university,
            location: chapterRequest.universityAddress,
          },
        });
        await prisma.chapterRequest.delete({
          where: {
            id: body.chapterRequestId,
          },
        });

        const baseFolder = env.GOOGLE_BASEFOLDER; // TODO: make env variable
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
        const file = await (
          service as NonNullable<typeof service>
        ).files.create(fileCreateData);
        const googleFolderId = (file as any).data.id;

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
      // If denied just updated approved field of chapter request
      await prisma.chapterRequest.update({
        where: {
          id: body.chapterRequestId,
        },
        data: {
          approved: "DENIED",
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
  } catch {
    return NextResponse.json(
      HandleChapterRequestResponse.parse({
        code: "UNKNOWN",
        message: "Unknown error received",
      }),
      { status: 500 }
    );
  }
});
