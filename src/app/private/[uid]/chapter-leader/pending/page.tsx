import React from "react";
import { prisma } from "@server/db/client";
import PendingHomePage from "./PendingHomePage";
import { User } from "@prisma/client";

const PendingPage = async ({ params }: { params: { uid: string } }) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: params.uid,
    },
  });

  const userRequests = await prisma.userRequest.findMany({
    where: {
      chapterId: user.ChapterID ?? "",
      approved: "PENDING",
    },
  });

  const users: User[] = [];

  for (let i = 0; i < userRequests.length; i++) {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: userRequests[i]?.uid ?? "",
      },
    });

    users.push(user);
  }

  return <PendingHomePage users={users} />;
};

export default PendingPage;
