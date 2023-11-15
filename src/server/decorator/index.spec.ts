import { beforeEach, describe, expect, it, test, vi } from "vitest";
import { Session, getServerSession } from "next-auth";
import { SessionApiHandler, withSession, withRole } from "./index";
import { NextRequest, NextResponse } from "next/server";
import { unauthorizedErrorResponse } from "@api/route.schema";

type MockFunction = ReturnType<Pick<typeof vi, "fn">["fn"]>;

type GetServerSessionReturnType = Awaited<ReturnType<typeof getServerSession>>;

vi.mock("next-auth", () => {
  return {
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
    (getServerSession as MockFunction).mockResolvedValue(
      null as GetServerSessionReturnType
    );
    expect(withSession(dummyHandler)(request, null)).toBe(
      unauthorizedErrorResponse
    );
  });
});
