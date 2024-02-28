import React from "react";
import { prisma } from "@server/db/client";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { HeaderContainer } from "@components/container";
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
  // TODO: Maybe check if the user is actually a chapter leader
  if (user.ChapterID === null) return <div>Does not belong to a chapter</div>;
  // Fetch the seniors too
  const chapter = await prisma.chapter.findFirst({
    where: {
      id: user.ChapterID,
    },
    include: {
      seniors: {},
      students: {},
    },
  });
  const seniors = chapter?.seniors ? chapter.seniors : [];
  const students = chapter?.students ? chapter.students : [];

  return (
    <HeaderContainer
      header="Seniors"
      showHorizontalLine={true}
      headerIcon={faUsers}
    >
      <div className="mb-5 text-2xl">Seniors {`(${seniors.length})`}</div>
      <SeniorView seniors={seniors} students={students} />
    </HeaderContainer>
  );
};

export default UserSeniorsPage;
