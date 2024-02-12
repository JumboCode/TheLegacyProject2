import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { formatUserHomeRoute } from "@utils";

/**
 * Handle login redirect. If user is authenticated, redirect to their home page, otherwise,
 * they are redirected to the landing page.
 */
export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (session?.user != undefined) {
    return NextResponse.redirect(
      new URL(formatUserHomeRoute(session.user), req.url)
    );
  } else {
    return NextResponse.redirect(new URL("/public", req.url));
  }
};
