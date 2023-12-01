"use client";

import { batchCreateResources } from "@api/resources/route.client";
import { batchCreateRequestSchema } from "@api/resources/route.schema";
import Resource from "@components/Resource";
import { prisma } from "@server/db/client";
import { AdminResourcesPageServer } from 

const AdminResourcesPage = () => {
  return (
    <div className="grid items-start gap-4 self-stretch md:grid-cols-2">
      {" "}
      <AdminResourcesPageServer() />
    </div>
  );
};

export default AdminResourcesPage;
