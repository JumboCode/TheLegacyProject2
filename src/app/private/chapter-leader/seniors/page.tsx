import React from "react";
import { prisma } from "@server/db/client";
import { SeniorView } from "@components/SeniorView";
import { compareSenior } from "@utils";
import { getServerSessionOrRedirect } from "@server/utils";

const UserSeniorsPage = async () => {
  const session = await getServerSessionOrRedirect();
  // Fetch the seniors too
  const chapter = await prisma.chapter.findFirst({
    where: {
      id: session.user?.ChapterID ?? undefined,
    },
    include: {
      seniors: {},
      students: {},
    },
  });
  const seniors = chapter?.seniors.sort(compareSenior) ?? [];
  const students = chapter?.students ?? [];

  return (
    <>
      <div className="mb-6 text-2xl">Seniors {`(${seniors.length})`}</div>
      <SeniorView seniors={seniors} students={students} />
    </>
  );
};

export default UserSeniorsPage;
