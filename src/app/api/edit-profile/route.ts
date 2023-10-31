import { NextRequest, NextResponse } from "next/server";
import { EditProfileRequest, EditProfileResponse } from "./route.schema";
import { GetProfileRequest, GetProfileResponse } from "./route.schema";
import { prisma } from "@server/db/client";

/* Dummy POST Request for updating */
export const POST = async (request: NextRequest) => {
  return NextResponse.json(
    EditProfileResponse.parse({
      code: "SUCCESS",
      message: "Profile successfully updated",
    })
  );
};

/* Dummy GET Request for User Profile */
export const GET = async (request: NextRequest) => {
  return NextResponse.json(
    GetProfileResponse.parse({
      code: "SUCCESS",
      message: "Profile successfully retrieved",
    })
  );
};
