import { withSessionAndRole } from "@server/decorator";
import { NextResponse } from "next/server";
import {
  seniorDeleteResponse,
  seniorPatchResponse,
  patchSeniorSchema,
} from "./route.schema";
import { prisma } from "@server/db/client";

/**
 * @TODO - Delete folder belonging to the senior
 */
export const DELETE = withSessionAndRole(
  ["CHAPTER_LEADER"],
  async ({ session, params }) => {
    const nextParams: { id: string } = params.params;
    const { id: seniorId } = nextParams;

    const maybeSenior = await prisma.senior.findFirst({
      where: { id: seniorId },
    });
    if (maybeSenior == null) {
      return NextResponse.json(
        seniorDeleteResponse.parse({
          code: "NOT_FOUND",
          message: "Senior not found",
        }),
        { status: 404 }
      );
    }

    if (session.user.ChapterID != maybeSenior.ChapterID) {
      return NextResponse.json(
        seniorDeleteResponse.parse({
          code: "UNAUTHORIZED",
          message: "User is not of same chapter of senior",
        }),
        { status: 404 }
      );
    }

    const disconnectSenior = await prisma.senior.update({
      where: {
        id: seniorId,
      },
      data: {
        Students: {
          set: [],
        },
      },
    });
    const deleteSenior = await prisma.senior.delete({
      where: {
        id: seniorId,
      },
    });

    return NextResponse.json({ code: "SUCCESS" });
  }
);

export const PATCH = withSessionAndRole(
  ["CHAPTER_LEADER"],
  async ({ req, session, params }) => {
    const body = await req.json();
    const nextParams: { id: string } = params.params;
    const { id: seniorId } = nextParams;

    const maybeBody = patchSeniorSchema.safeParse(body);
    if (!maybeBody.success) {
      return NextResponse.json(
        seniorPatchResponse.parse({ code: "INVALID_EDIT" }),
        { status: 400 }
      );
    } else {
      const seniorBody = maybeBody.data;

      const maybeSenior = await prisma.senior.findUnique({
        where: { id: seniorId },
        include: { Students: true },
      });

      if (maybeSenior == null) {
        return NextResponse.json(
          seniorPatchResponse.parse({
            code: "NOT_FOUND",
            message: "Senior not found",
          }),
          { status: 404 }
        );
      }

      if (session.user.ChapterID != maybeSenior.ChapterID) {
        return NextResponse.json(
          seniorDeleteResponse.parse({
            code: "ERROR",
            message: "User is not of same chapter of senior",
          }),
          { status: 404 }
        );
      }

      // Remove if senior.studentIds is not contained in body.studentIds
      const studentIDsToRemove = maybeSenior.StudentIDs.filter(
        (id) => !seniorBody.StudentIDs.includes(id)
      );
      const studentIDsToAdd = seniorBody.StudentIDs;

      const { StudentIDs: _, ...other } = seniorBody;
      const senior = await prisma.senior.update({
        where: { id: seniorId },
        data: {
          ...other,
          Students: {
            connect: studentIDsToAdd.map((id) => ({ id: id })),
            disconnect: studentIDsToRemove.map((id) => ({ id: id })),
          },
        },
      });

      return NextResponse.json(
        seniorPatchResponse.parse({
          code: "SUCCESS",
          data: senior,
        })
      );
    }
  }
);
