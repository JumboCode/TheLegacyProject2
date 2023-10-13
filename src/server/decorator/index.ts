import { User } from "@prisma/client";
import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
import { unauthorizedErrorResponse } from "src/app/api/route.schema";

/**
 * NextApiParams is of type dictionary when an endpoint with dynamic url is hit.
 *
 * @todo Rewrite type of params - kinda janky
 */
type NextApiParams = any;

interface AuthorizedSession extends Session {
  user: NonNullable<Session["user"]>;
}

interface AuthorizedSessionApiHandlerParams {
  session: AuthorizedSession;
  req: NextRequest;
  params: NextApiParams;
}

type NextApiHandler = (
  req: NextRequest,
  params: NextApiParams
) => Promise<NextResponse>;

type SessionApiHandler = (
  params: AuthorizedSessionApiHandlerParams
) => Promise<NextResponse>;

/**
 * Enforces that the API is called with an authenticated user.
 */
const withSession = (handler: SessionApiHandler): NextApiHandler => {
  return async (req, params) => {
    const session = await getServerSession(authOptions);
    if (session == null || session.user == undefined) {
      return NextResponse.json(unauthorizedErrorResponse);
    }

    const user = session.user;

    return handler({ session: { ...session, user }, req, params });
  };
};

/**
 * Enforces that the API is called by a user with a valid role.
 */
const withRole = (
  role: Array<User["role"]>,
  handler: SessionApiHandler
): SessionApiHandler => {
  return async (params) => {
    if (!role.includes(params.session.user.role)) {
      return NextResponse.json(unauthorizedErrorResponse);
    }
    return handler(params);
  };
};

export { withSession, withRole };
