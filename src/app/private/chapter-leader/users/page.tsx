import React from "react";
import { prisma } from "@server/db/client";
import MembersHomePage from "./MembersHomePage";
import { getServerSessionOrRedirect } from "@server/utils";

const MembersPage = async () => {
  const session = await getServerSessionOrRedirect();
  const chapter = await prisma.chapter.findFirstOrThrow({
    where: {
      id: session.user?.ChapterID ?? "",
    },
    include: {
      students: true,
    },
  });

  return <MembersHomePage members={chapter.students} />;
};

export default MembersPage;
