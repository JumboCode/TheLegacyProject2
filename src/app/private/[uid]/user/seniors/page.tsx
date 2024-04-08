import React from "react";
import { prisma } from "@server/db/client";
import SeniorsHomePage from "./SeniorsHomePage";

const UserSeniorsPage = async ({ params }: { params: { uid: string } }) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: params.uid,
    },
    include: {
      Seniors: true,
    },
  });

  return <SeniorsHomePage user={user} />;
};

export default UserSeniorsPage;
