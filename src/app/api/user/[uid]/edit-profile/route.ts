import { NextRequest, NextResponse } from "next/server";
import { EditProfileRequest, EditProfileResponse } from "./route.schema";
import { prisma } from "@server/db/client";
import { withSession } from "@server/decorator";

/* Dummy PATCH Request for updating */
export const PATCH = async (request: NextRequest) => {
  const makePatch = withSession(async ({ session, req, params }) => {
    const { body } = req;

    return NextResponse.json(
      EditProfileResponse.parse({
        code: "SUCCESS",
        message: "Profile successfully updated",
      })
    );
  });
  makePatch(request, {});
};
