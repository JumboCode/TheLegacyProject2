import { NextResponse } from "next/server";
import { EditProfileRequest } from "./route.schema";
import { EditProfileResponse } from "./route.schema";
import { prisma } from "@server/db/client";
import { withSession } from "@server/decorator";

/*
 * Update user profile information.
 */
export const PATCH = withSession(async ({ session, req, params }) => {
  try {
    if (params.params.uid !== session.user.id) {
      return NextResponse.json(
        EditProfileResponse.parse({
          code: "UNAUTHORIZED",
          message: "The action cannot be performed by the current user"
        }),
        { status: 400 }
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
        id: session.user.id,
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
