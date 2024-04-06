import { withRole, withSession } from "@server/decorator";
import { EditRoleRequest, EditRoleResponse } from "./route.schema";
import { NextResponse } from "next/server";
import { prisma } from "@server/db/client";
import { Role } from "@prisma/client";

/**
 * Update multiple non-admin user's role.
 */
export const PATCH = withSession(
  withRole(["ADMIN"], async ({ req, session }) => {
    const maybeBody = EditRoleRequest.safeParse(await req.json());

    if (!maybeBody.success || session.user.role !== "ADMIN") {
      return NextResponse.json(
        EditRoleResponse.parse({
          code: "INVALID_REQUEST",
          message: "Invalid request",
        }),
        { status: 400 }
      );
    }

    const updateManyStudents = (ids: string[], role: Role) => {
      if (ids.length > 0) {
        return prisma.user.updateMany({
          where: {
            id: {
              in: ids,
            },
          },
          data: {
            role: role,
          },
        });
      }
      return Promise.resolve();
    };

    await Promise.allSettled([
      updateManyStudents(maybeBody.data.chapterLeaders, "CHAPTER_LEADER"),
      updateManyStudents(maybeBody.data.users, "USER"),
    ]);

    return NextResponse.json(
      EditRoleResponse.parse({
        code: "SUCCESS",
        message: "Updated user role",
      })
    );
  })
);
