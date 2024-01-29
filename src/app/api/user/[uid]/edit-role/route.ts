import { withRole, withSession } from "@server/decorator";
import { EditRoleRequest, EditRoleResponse } from "./route.schema";
import { NextResponse } from "next/server";
import { prisma } from "@server/db/client";

/**
 * Update a non-admin user's role.
 */
export const PATCH = withSession(
  withRole(["ADMIN"], async ({ req, params }) => {
    const { uid } = params.params;
    const maybeBody = EditRoleRequest.safeParse(await req.json());
    const maybeUser = await prisma.user.findUnique({ where: { id: uid } });

    if (!maybeBody.success || maybeUser == null || maybeUser.role === "ADMIN") {
      return NextResponse.json(
        EditRoleResponse.parse({
          code: "INVALID_REQUEST",
          message: "Invalid request",
        }),
        { status: 400 }
      );
    }

    try {
      await prisma.user.update({
        where: {
          id: uid,
        },
        data: {
          role: maybeBody.data.role,
        },
      });

      return NextResponse.json(
        EditRoleResponse.parse({
          code: "SUCCESS",
          message: "Updated user role",
        })
      );
    } catch (e) {
      return NextResponse.json(
        EditRoleResponse.parse({
          code: "UNKNOWN",
          message: "Unknown error occurred",
        })
      );
    }
  })
);
