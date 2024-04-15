import { withRole, withSession } from "@server/decorator";
import { NextResponse } from "next/server";
import { prisma } from "@server/db/client";
import { EditSeniorRequest, EditSeniorResponse } from "./route.schema";

/**
 * Update a non-admin user's list of seniorIDs.
 */
export const PATCH = withSession(
  withRole(["CHAPTER_LEADER"], async ({ req, params }) => {
    const { uid } = params.params;
    const maybeBody = EditSeniorRequest.safeParse(await req.json());
    const maybeUser = await prisma.user.findUnique({ where: { id: uid } });

    if (!maybeBody.success || maybeUser == null) {
      return NextResponse.json(
        EditSeniorResponse.parse({
          code: "INVALID_REQUEST",
          message: "Invalid request",
        }),
        { status: 400 }
      );
    }

    const seniorIDsToRemove = maybeUser.SeniorIDs.filter(
      (id) => !maybeBody.data.SeniorIDs.includes(id)
    );
    const seniorIDsToAdd = maybeBody.data.SeniorIDs;

    await prisma.user.update({
      where: { id: uid },
      data: {
        Seniors: {
          connect: seniorIDsToAdd.map((id) => ({ id: id })),
          disconnect: seniorIDsToRemove.map((id) => ({ id: id })),
        },
      },
    });

    return NextResponse.json(
      EditSeniorResponse.parse({
        code: "SUCCESS",
        message: "Updated user role",
      })
    );
  })
);
