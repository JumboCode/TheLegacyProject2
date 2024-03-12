"use client";

import { UserTile } from "@components/TileGrid";
import { Senior, User } from "@prisma/client";
import SearchableContainer from "@components/SearchableContainer";
import { seniorFullName } from "@utils";

type SeniorsHomePageProps = {
  seniors: Senior[];
  user: User;
};

const SeniorsHomePage = ({ seniors, user }: SeniorsHomePageProps) => {
  const displaySeniors = (elem: Senior, index: number) => (
    <UserTile
      key={elem.id}
      senior={elem}
      link={`/private/${user.id}/user/seniors/${elem.id}`}
    />
  );

  return (
    <>
      <h1 className="font-merriweather pb-6 text-3xl">
        {`My Assigned Seniors (${seniors.length})`}
      </h1>
      <SearchableContainer
        display={displaySeniors}
        elements={seniors}
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
