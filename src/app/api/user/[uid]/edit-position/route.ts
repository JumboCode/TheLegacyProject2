import { prisma } from "@server/db/client";
import { withRole, withSession } from "@server/decorator";
import { NextResponse } from "next/server";
import { editPositionRequest, editPositionResponse } from "./route.schema";
import {
  invalidRequestResponse,
  unauthorizedErrorResponse,
} from "@api/route.schema";

export const PATCH = withSession(
  withRole(["CHAPTER_LEADER"], async ({ session, req, params }) => {
    const { user: me } = session;
    const otherUid: string = params.params.uid;
    const other = await prisma.user.findUnique({
      where: { id: otherUid },
    });
    const request = editPositionRequest.safeParse(await req.json());

    if (other == null || !request.success) {
      return NextResponse.json(invalidRequestResponse, { status: 400 });
    }

    if (me.role !== "CHAPTER_LEADER" || me.ChapterID !== other.ChapterID) {
      return NextResponse.json(unauthorizedErrorResponse, { status: 401 });
    }

    await prisma.user.update({
      where: {
        id: otherUid,
      },
      data: {
        position: request.data.position,
      },
    });

    return NextResponse.json(editPositionResponse.parse({ code: "SUCCESS" }));
  })
);
