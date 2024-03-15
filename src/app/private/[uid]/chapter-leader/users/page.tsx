import React from "react";
import { prisma } from "@server/db/client";
import MembersHomePage from "./MembersHomePage";

const MembersPage = async ({ params }: { params: { uid: string } }) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: params.uid,
    },
  });

  const chapter = await prisma.chapter.findFirstOrThrow({
    where: {
      id: user.ChapterID ?? "",
    },
    include: {
      students: true,
    },
  });

  return <MembersHomePage members={chapter.students} user={user} />;
};

export default MembersPage;
