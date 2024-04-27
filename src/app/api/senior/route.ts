import { withSessionAndRole } from "@server/decorator";
import { NextResponse } from "next/server";
import { seniorPostResponse, postSeniorSchema } from "./route.schema";
import { prisma } from "@server/db/client";
import { driveV3 } from "@server/service";

// @TODO - Use google drive service to create folder
export const POST = withSessionAndRole(
  ["CHAPTER_LEADER"],
  async ({ req, session }) => {
    const body = await req.json();
    const newSenior = postSeniorSchema.safeParse(body);

    if (!newSenior.success) {
      return NextResponse.json(
        seniorPostResponse.parse({
          code: "INVALID_REQUEST",
          message: "Invalid senior template",
        }),
        { status: 400 }
      );
    } else {
      const seniorBody = newSenior.data;
      const user = await prisma.user.findFirst({
        where: {
          id: session.user.id,
        },
      });

      if (!user) {
        return NextResponse.json(
          seniorPostResponse.parse({
            code: "INVALID_REQUEST",
            message: "User not found",
          }),
          { status: 400 }
        );
      }

      if (session.user.ChapterID == null) {
        return NextResponse.json(
          seniorPostResponse.parse({
            code: "UNAUTHORIZED",
            message: "User has no authority to add",
          })
        );
      }

      const chapter = await prisma.chapter.findFirst({
        where: {
          id: session.user.ChapterID,
        },
      });
      if (!chapter) {
        return NextResponse.json(
          seniorPostResponse.parse({
            code: "UNKNOWN",
            message: "Chapter not found",
          }),
          { status: 400 }
        );
      }

      const senior = await prisma.senior.create({
        data: {
          firstname: seniorBody.firstname,
          lastname: seniorBody.lastname,
          location: seniorBody.location,
          description: seniorBody.description,
          ChapterID: session.user.ChapterID,
          StudentIDs: seniorBody.StudentIDs,
        },
      });

      const baseFolder = chapter.chapterFolder; // TODO: make env variable
      const fileMetadata = {
        name: [`${seniorBody.firstname}_${seniorBody.lastname}-${senior.id}`],
        mimeType: "application/vnd.google-apps.folder",
        parents: [baseFolder],
      };
      const fileCreateData = {
        resource: fileMetadata,
        fields: "id",
      };

      const file = await driveV3.files.create(fileCreateData);
      const googleFolderId = (file as any).data.id;

      await prisma.senior.update({
        where: {
          id: senior.id,
        },
        data: {
          folder: googleFolderId,
        },
      });

      await prisma.user.updateMany({
        data: {
          SeniorIDs: {
            push: senior.id,
          },
        },
        where: {
          id: {
            in: senior.StudentIDs,
          },
        },
      });

      return NextResponse.json(
        seniorPostResponse.parse({
          code: "SUCCESS",
          data: senior,
        })
      );
    }
  }
);
