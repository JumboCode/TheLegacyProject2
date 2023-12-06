import { NextRequest, NextResponse } from "next/server";
import { EditProfileRequest, EditPositionRequest } from "./route.schema";
import { EditProfileResponse } from "./route.schema";
import { prisma } from "@server/db/client";
import { withSession } from "@server/decorator";

/* PATCH Request for updating profile information */
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

      const can_edit_self = session.user.id === target.id;
      /** @todo check if Chapter Leader is editing a User in the same Chapter */
      const can_update_position =
        (session.user.role === "ADMIN" && target.role !== "ADMIN") ||
        (session.user.role === "CHAPTER_LEADER" && target.role === "USER");

      if (can_edit_self) {
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
          },
        });
        return NextResponse.json(
          EditProfileResponse.parse({
            code: "SUCCESS",
            message: "Profile successfully updated",
          }),
          { status: 200 }
        );
      } else if (can_update_position) {
        const editRequest = EditPositionRequest.safeParse(await req.json());
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
      } else {
        return NextResponse.json(
          EditProfileResponse.parse({
            code: "UNAUTHORIZED",
            message: "The action cannot be performed by the current user",
          }),
          { status: 401 }
        );
      }
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
