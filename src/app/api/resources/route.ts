import { NextResponse } from "next/server";
import {
  batchCreateRequestSchema,
  batchDeleteRequestSchema,
  batchResponseSchema,
  batchUpdateRequestSchema,
} from "./route.schema";
import { prisma } from "@server/db/client";
import { invalidFormReponse, unknownErrorResponse } from "../route.schema";
import { withSessionAndRole } from "@server/decorator";

export const POST = withSessionAndRole(["ADMIN"], async (request) => {
  try {
    const resourceRequest = batchCreateRequestSchema.safeParse(
      await request.req.json()
    );
    if (!resourceRequest.success) {
      return NextResponse.json(invalidFormReponse, { status: 400 });
    } else {
      const body = resourceRequest.data;
      if (body.length > 0) {
        await prisma.resource.createMany({
          data: body,
        });
      }

      return NextResponse.json(batchResponseSchema.parse({ code: "SUCCESS" }));
    }
  } catch {
    return NextResponse.json(unknownErrorResponse, { status: 500 });
  }
});

export const PUT = withSessionAndRole(["ADMIN"], async (request) => {
  try {
    const resourceRequest = batchUpdateRequestSchema.safeParse(
      await request.req.json()
    );
    if (!resourceRequest.success) {
      return NextResponse.json(invalidFormReponse, { status: 400 });
    } else {
      const promises = resourceRequest.data.map((resource) =>
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
      );
      await Promise.allSettled(promises);

      return NextResponse.json(batchResponseSchema.parse({ code: "SUCCESS" }));
    }
  } catch {
    return NextResponse.json(unknownErrorResponse, { status: 500 });
  }
});

export const DELETE = withSessionAndRole(["ADMIN"], async (request) => {
  try {
    const resourceRequest = batchDeleteRequestSchema.safeParse(
      await request.req.json()
    );
    if (!resourceRequest.success) {
      return NextResponse.json(invalidFormReponse, { status: 400 });
    } else {
      if (resourceRequest.data.length > 0) {
        await prisma.resource.deleteMany({
          where: {
            id: { in: resourceRequest.data },
          },
        });
      }
      return NextResponse.json(batchResponseSchema.parse({ code: "SUCCESS" }));
    }
  } catch (error) {
    return NextResponse.json(unknownErrorResponse, { status: 500 });
  }
});
