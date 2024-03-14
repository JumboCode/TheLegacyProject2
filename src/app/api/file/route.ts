import { NextResponse } from "next/server";
import { FileResponse } from "./route.schema";
import { File } from "@server/model";
import { prisma } from "@server/db/client";
import { withSession } from "@server/decorator";
import { createDriveService } from "@server/service";
import moment from "moment";

export const POST = withSession(async (request) => {
  const service = await createDriveService(request.session.user.id);

  const body = await request.req.json();
  const fileRequest = File.safeParse(body);

  if (!fileRequest.success) {
    console.log(fileRequest.error);
    return NextResponse.json(
      FileResponse.parse({
        code: "INVALID_REQUEST",
        message: "Not a valid request",
      }),
      { status: 400 }
    );
  } else {
    const fileData = fileRequest.data;

    // Check that user has this senior assigned to them
    const user = await prisma.user.findFirst({
      where: {
        id: request.session.user.id,
      },
    });

    if (user === null || user.SeniorIDs === null) {
      return NextResponse.json(
        FileResponse.parse({
          code: "INVALID_REQUEST",
          message: "Not a valid request",
        }),
        { status: 400 }
      );
    }

    if (
      !user.SeniorIDs.some((seniorId: string) => seniorId === fileData.seniorId)
    ) {
      return NextResponse.json(
        FileResponse.parse({
          code: "NOT_AUTHORIZED",
          message: "Senior not assigned to user",
        }),
        { status: 404 }
      );
    }

    // Get senior from database
    const foundSenior = await prisma.senior.findUnique({
      where: { id: fileData.seniorId },
    });
    if (foundSenior == null) {
      return NextResponse.json(
        FileResponse.parse({
          code: "INVALID_REQUEST",
          message: "Not a valid request",
        }),
        { status: 404 }
      );
    }

    const parentID = foundSenior.folder;

    const formatted_date = moment(fileData.date).format("L");

    const fileMetadata = {
      name: [formatted_date],
      mimeType: "application/vnd.google-apps.document",
      parents: [parentID],
    };

    const fileCreateData = {
      resource: fileMetadata,
      fields: "id",
    };

    // NOTE: File will still be created on Drive even if it fails on MongoDB
    const file = await service.files.create(fileCreateData);

    const googleFileId = file.data.id;

    // If the data is valid, save it to the database via prisma client
    await prisma.file.create({
      data: {
        date: fileData.date,
        filetype: fileData.filetype,
        url: `https://docs.google.com/document/d/${googleFileId}`,
        seniorId: fileData.seniorId,
        Tags: fileData.Tags,
      },
    });

    return NextResponse.json(
      FileResponse.parse({
        code: "SUCCESS",
        message: "File successfully added",
      }),
      { status: 200 }
    );
  }
});
