"use client";

import { UserTile } from "@components/TileGrid";
import { Prisma, Senior, User } from "@prisma/client";
import SearchableContainer from "@components/SearchableContainer";
import { seniorFullName } from "@utils";

type UserWithSeniors = Prisma.UserGetPayload<{ include: { Seniors: true } }>;

type SeniorsHomePageProps = {
  user: UserWithSeniors;
};

const SeniorsHomePage = ({ user }: SeniorsHomePageProps) => {
  const displaySeniors = (elem: Senior) => (
    <UserTile
      key={elem.id}
      senior={elem}
      link={`/private/${user.id}/user/seniors/${elem.id}`}
    />
  );

  return (
    <>
      <h1 className="font-merriweather pb-6 text-3xl">
        {`My Assigned Seniors (${user.Seniors.length})`}
      </h1>
      <SearchableContainer
        display={displaySeniors}
        elements={user.Seniors}
        emptyNode={
          <h1 className="text-2xl font-light">
            {"You haven't been assigned a Senior yet."}
          </h1>
        }
        search={(senior: Senior, filter: string) =>
          seniorFullName(senior).toLowerCase().includes(filter.toLowerCase())
        }
      />
    </>
  );
};

export default SeniorsHomePage;
