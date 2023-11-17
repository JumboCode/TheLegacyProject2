import { describe, expect, it, vi } from "vitest";
import { NextAuthOptions, getServerSession } from "next-auth";
import { SessionApiHandler, withSession, withRole } from "./index";
import { NextRequest, NextResponse } from "next/server";
import { unauthorizedErrorResponse } from "@api/route.schema";
import { authOptions } from "@api/auth/[...nextauth]/route";

type MockFunction = ReturnType<Pick<typeof vi, "fn">["fn"]>;

// Wrap getServerSession so we have a useful return type
const getServerSessionWrapper = (authOption: typeof authOptions) => {
  return getServerSession(authOption);
};

type Session = Awaited<ReturnType<typeof getServerSessionWrapper>>;

// Mock getServerSession
vi.mock("next-auth", async () => {
  const lib: any = await vi.importActual("next-auth");
  return {
    ...lib,
    getServerSession: vi.fn(),
  };
});

const dummyHandler: SessionApiHandler = async (params) => {
  return NextResponse.json("Hello world");
};

describe("Test with session", () => {
  const expiration = new Date(2023, 11, 14).toISOString();
  const request: NextRequest = new NextRequest(
    new Request("http://localhost:3000/api")
  );

  it("Unauthenticated user is denied", async () => {
    (getServerSession as MockFunction).mockResolvedValue(null as Session);
    const response = await withSession(dummyHandler)(request, null);
    const obj = await response.json();
    expect(obj).toEqual(unauthorizedErrorResponse);
  });

  it("User without role is denied", async () => {
    const session: Session = {
      expires: expiration,
      user: {
        id: "123",
        name: "foo",
        email: "hello@gmail.com",
        role: "USER",
      },
    };

    (getServerSession as MockFunction).mockResolvedValue(session);
    const response = await withSession(withRole(["ADMIN"], dummyHandler))(
      request,
      null
    );
    const obj = await response.json();
    expect(obj).toEqual(unauthorizedErrorResponse);
  });
});
