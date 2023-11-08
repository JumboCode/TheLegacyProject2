import { NextRequest, NextResponse } from "next/server";
import { EditProfileRequest, EditProfileResponse } from "./route.schema";
import { prisma } from "@server/db/client";
import { withSession } from "@server/decorator";

/* Dummy PATCH Request for updating */
export const PATCH = async (
  request: NextRequest,
  { params }: { params: { uid: string } }
) => {
  const makePatch = withSession(async ({ session, req, params }) => {
    try {
      const targetUID: string = params.uid;
      const target = await prisma.user.findUnique({
        where: {
          id: targetUID,
        },
      });
      if (!target) {
        return NextResponse.json(
          EditProfileResponse.parse({
            code: "INVALID_UID",
            message: "Could not find user with the given UID",
          }),
          { status: 400 }
        );
      }

      /** @todo check if Chapter Leader is editing a User in the same Chapter */
      const hasPermission =
        session.user.id === target.id ||
        (session.user.role === "ADMIN" && target.role !== "ADMIN") || // Admins can edit any non-admin
        (session.user.role === "CHAPTER_LEADER" && target.role === "USER");

      if (!hasPermission) {
        return NextResponse.json(
          EditProfileResponse.parse({
            code: "UNAUTHORIZED",
            message: "The action cannot be performed by the current user",
          }),
          { status: 401 }
        );
      }

      const editRequest = EditProfileRequest.safeParse(await req.json());
      if (!editRequest.success) {
        return NextResponse.json(
          EditProfileResponse.parse({
            code: "INVALID_FORM",
            message: "Invalid form submission",
          }),
          { status: 400 }
        );
      }

      const body = editRequest.data;
      await prisma.user.update({
        where: {
          id: targetUID,
        },
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          pronouns: body.pronouns,
          position: body.position,
        },
      });

      return NextResponse.json(
        EditProfileResponse.parse({
          code: "SUCCESS",
          message: "Profile successfully updated",
        }),
        { status: 200 }
      );
    } catch {
      return NextResponse.json(
        EditProfileResponse.parse({
          code: "UNKNOWN",
          message: "Unknown error received",
        }),
        { status: 500 }
      );
    }
  });
  return makePatch(request, params);
};
