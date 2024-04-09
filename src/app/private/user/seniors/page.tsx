import React from "react";
import { prisma } from "@server/db/client";
import SeniorsHomePage from "./SeniorsHomePage";
import { getServerSessionOrRedirect } from "@server/utils";

const UserSeniorsPage = async () => {
  const session = await getServerSessionOrRedirect();
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: session.user?.id,
    },
    include: {
      Seniors: true,
    },
  });

  return <SeniorsHomePage user={user} />;
};

export default UserSeniorsPage;
