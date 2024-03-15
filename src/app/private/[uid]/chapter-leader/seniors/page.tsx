import React from "react";
import { prisma } from "@server/db/client";
import { SeniorView } from "@components/SeniorView";

const UserSeniorsPage = async ({ params }: { params: { uid: string } }) => {
  const userUid = params.uid;
  const user = await prisma.user.findUnique({
    where: {
      id: userUid,
    },
  });
  if (!user) {
    return <div>User not found</div>;
  }

  // Fetch the seniors too
  const chapter = await prisma.chapter.findFirst({
    where: {
      id: user.ChapterID ?? undefined,
    },
    include: {
      seniors: {},
      students: {},
    },
  });
  const seniors = chapter?.seniors ? chapter.seniors : [];
  const students = chapter?.students ? chapter.students : [];

  return (
    <>
      <div className="mb-6 text-2xl">Seniors {`(${seniors.length})`}</div>
      <SeniorView seniors={seniors} students={students} />
    </>
  );
};

export default UserSeniorsPage;
