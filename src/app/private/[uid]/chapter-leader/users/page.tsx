import React from "react";
import { prisma } from "@server/db/client";
import MembersHomePage from "./MembersHomePage";

const MembersPage = async ({ params }: { params: { uid: string } }) => {
  const chapter = await prisma.chapter.findFirstOrThrow({
    where: {
      students: {
        some: {
          id: params.uid,
        },
      },
    },
    include: {
      students: true,
    },
  });

  return <MembersHomePage members={chapter.students} />;
};

export default MembersPage;
