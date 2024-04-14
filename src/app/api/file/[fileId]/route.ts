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

export const PATCH = withSession(async (request) => {
  const body = await request.req.json();
  const nextParams: { fileId: string } = request.params.params;
  const { fileId } = nextParams;
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
          code: "INVALID_REQUEST",
          message: "Not a valid request",
        }),
        { status: 400 }
      );
    }

    // Get senior from database
    const foundSenior = await prisma.senior.findUnique({
      where: { id: fileData.seniorId },
    });

    if (foundSenior === null) {
      return NextResponse.json(
        FileResponse.parse({
          code: "INVALID_REQUEST",
          message: "Not a valid request",
        }),
        { status: 400 }
      );
    }

    // query that date doesn't already exist
    const foundFile = await prisma.file.findFirst({
      where: { date: fileData.date, seniorId: fileData.seniorId },
    });

    if (foundFile !== null) {
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
      fileId: fileId,
      resource: body,
    };

    await driveV3.files.update(fileUpdateData);

    const file = await prisma.file.findFirst({
      where: {
        url: fileData.url,
      },
    });

    if (file === null) {
      return NextResponse.json(
        FileResponse.parse({
          code: "INVALID_REQUEST",
          message: "Not a valid request",
        }),
        { status: 400 }
      );
    }

    await prisma.file.update({
      where: { id: file.id },
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

export const DELETE = withSession(async (request) => {
  const nextParams: { fileId: string } = request.params.params;
  const { fileId } = nextParams;

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
  const file = await prisma.file.findFirst({
    where: {
      url: `https://docs.google.com/document/d/${fileId}`,
    },
  });

  if (file === null) {
    return NextResponse.json(
      FileResponse.parse({
        code: "INVALID_REQUEST",
        message: "Not a valid request",
      }),
      { status: 400 }
    );
  }

  if (!user.SeniorIDs.some((seniorId: string) => seniorId === file.seniorId)) {
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
    where: { id: file.seniorId },
  });
  if (foundSenior === null) {
    return NextResponse.json(
      FileResponse.parse({
        code: "INVALID_REQUEST",
        message: "Not a valid request",
      }),
      { status: 400 }
    );
  }

  await driveV3.files.delete({
    fileId: fileId,
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
