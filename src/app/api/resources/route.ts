import { NextResponse } from "next/server";
import {
  batchCreateRequestSchema,
  batchDeleteRequestSchema,
  batchResponseSchema,
  batchUpdateRequestSchema,
} from "./route.schema";
import { prisma } from "@server/db/client";
import { invalidFormReponse } from "../route.schema";
import { withSessionAndRole } from "@server/decorator";

export const POST = withSessionAndRole(["ADMIN"], async (request) => {
  const resourceRequest = batchCreateRequestSchema.safeParse(
    await request.req.json()
  );
  if (!resourceRequest.success) {
    return NextResponse.json(invalidFormReponse, { status: 400 });
  } else {
    const body = resourceRequest.data;
    const resources = await prisma.$transaction(
      body.map((resource) =>
        prisma.resource.create({
          data: {
            access: resource.access,
            title: resource.title,
            link: resource.link,
          },
        })
      )
    );
    return NextResponse.json(
      batchResponseSchema.parse({ code: "SUCCESS", data: resources })
    );
  }
});

export const PUT = withSessionAndRole(["ADMIN"], async (request) => {
  const resourceRequest = batchUpdateRequestSchema.safeParse(
    await request.req.json()
  );
  if (!resourceRequest.success) {
    return NextResponse.json(invalidFormReponse, { status: 400 });
  } else {
    await prisma.$transaction(
      resourceRequest.data.map((resource) =>
        prisma.resource.update({
          where: {
            id: resource.id,
          },
          data: {
            access: resource.access,
            title: resource.title,
            link: resource.link,
          },
        })
      )
    );

    return NextResponse.json(
      batchResponseSchema.parse({ code: "SUCCESS", data: resourceRequest.data })
    );
  }
});

export const DELETE = withSessionAndRole(["ADMIN"], async (request) => {
  const resourceRequest = batchDeleteRequestSchema.safeParse(
    await request.req.json()
  );
  if (!resourceRequest.success) {
    return NextResponse.json(invalidFormReponse, { status: 400 });
  } else {
    const body = resourceRequest.data;
    const resources = await prisma.$transaction(
      body.map((id) =>
        prisma.resource.delete({
          where: {
            id: id,
          },
        })
      )
    );
    return NextResponse.json(
      batchResponseSchema.parse({ code: "SUCCESS", data: resources })
    );
  }
});
