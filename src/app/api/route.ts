import { prisma } from "@server/db/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const chapter = await prisma.chapter.create({ data: body });
  return NextResponse.json(chapter);
};

export const GET = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id") as string;
  const chapter = await prisma.chapter.findUnique({
    where: { id: id },
    include: { students: true },
  });
  return NextResponse.json(chapter);
};
