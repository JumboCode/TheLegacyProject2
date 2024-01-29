import { Role } from "@prisma/client";
import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@api/auth/[...nextauth]/route";
import { unauthorizedErrorResponse } from "@api/route.schema";

/**
 * NextApiParams is of type dictionary when an endpoint with dynamic url is hit.
 */
type NextApiParams = { params: Record<string, string> };

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

export type SessionApiHandler = (
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

const withSessionAndRole = (
  role: Array<Role>,
  handler: SessionApiHandler
): NextApiHandler => {
  return async (req, params) => {
    const session = await getServerSession(authOptions);
    if (session == null || session.user == undefined) {
      return NextResponse.json(unauthorizedErrorResponse);
    }

    const user = session.user;

    if (!role.includes(user.role)) {
      return NextResponse.json(unauthorizedErrorResponse);
    }

    return handler({ session: { ...session, user }, req, params });
  };
};

/**
 * Enforces that the API is called by a user with a valid role.
 */
const withRole = (
  role: Array<Role>,
  handler: SessionApiHandler
): SessionApiHandler => {
  return async (params) => {
    if (!role.includes(params.session.user.role)) {
      return NextResponse.json(unauthorizedErrorResponse);
    }
    return handler(params);
  };
};

export { withSession, withRole, withSessionAndRole };
