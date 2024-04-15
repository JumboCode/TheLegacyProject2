/**
 * @note [fileId] segment represents the id for the Google Doc and not the MongoDB document _id.
 */
import { NextResponse } from "next/server";
import { FileResponse } from "./route.schema";
import { File } from "@server/model";
import { prisma } from "@server/db/client";
import { withSession } from "@server/decorator";
import { driveV3 } from "@server/service";
import moment from "moment";

export const PATCH = withSession(async ({ params, session, req }) => {
  const body = await req.json();
  const nextParams: { fileId: string } = params.params;
  const { fileId } = nextParams;
  const fileRequest = File.safeParse(body);

  if (!fileRequest.success) {
    return NextResponse.json(
      FileResponse.parse({
        code: "INVALID_REQUEST",
        message: "Not a valid request",
      }),
      { status: 400 }
    );
  } else {
    const fileData = fileRequest.data;
    const maybeFile = await prisma.file.findFirst({
      where: {
        id: fileId,
      },
      include: { senior: true },
    });

    const otherFiles = await prisma.file.findMany({
      where: {
        date: fileData.date,
        seniorId: fileData.seniorId,
        id: {
          not: fileId,
        },
      },
    });

    if (
      otherFiles.length > 0 ||
      maybeFile == null ||
      !maybeFile.senior.StudentIDs.includes(session.user.id)
    ) {
      // If there are other files with the same date, then the user can't take it
      // If file is not found then file is deleted
      // If senior doesn't include current user then they have been deselected
      return NextResponse.json(
        FileResponse.parse({
          code: "INVALID_REQUEST",
          message: "Not a valid request",
        }),
        { status: 400 }
      );
    }

    const formatted_date = moment(fileData.date).format("L");

    const body = { name: formatted_date };

    const fileUpdateData = {
      fileId: maybeFile.fileId,
      resource: body,
    };

    await driveV3.files.update(fileUpdateData);
    await prisma.file.update({
      where: { id: maybeFile.id },
      data: { date: fileData.date, Tags: fileData.Tags },
    });

    return NextResponse.json(
      FileResponse.parse({
        code: "SUCCESS_UPDATE",
        message: "File successfully updated",
      }),
      { status: 200 }
    );
  }
});

export const DELETE = withSession(async ({ params, session }) => {
  const nextParams: { fileId: string } = params.params;
  const { fileId } = nextParams;

  const file = await prisma.file.findFirst({
    where: {
      id: fileId,
    },
    include: {
      senior: true,
    },
  });

  if (file == null || !file.senior.StudentIDs.includes(session.user.id)) {
    // File has been deleted or student has been deselected
    return NextResponse.json(
      FileResponse.parse({
        code: "SUCCESS_DELETE",
        message: "File successfully deleted",
      }),
      { status: 200 }
    );
  }

  await driveV3.files.delete({
    fileId: file.fileId,
  });

  await prisma.file.delete({
    where: { id: file.id },
  });

  return NextResponse.json(
    FileResponse.parse({
      code: "SUCCESS_DELETE",
      message: "File successfully deleted",
    }),
    { status: 200 }
  );
});
