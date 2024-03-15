"use client";

import { UserTile } from "@components/TileGrid";
import SearchableContainer from "@components/SearchableContainer";
import { User } from "@prisma/client";

type MembersHomePageProps = {
  members: User[];
  user: User;
};

const MembersHomePage = ({ members, user }: MembersHomePageProps) => {
  const displayMembers = (elem: User, index: number) => (
    <UserTile
      key={index}
      student={elem}
      link={`/private/${user.id}/chapter-leader/users/${elem.id}`}
    />
  );

  return (
    <>
      <h1 className="font-merriweather pb-6 text-3xl">
        {`Members (${members.length})`}
      </h1>
      <SearchableContainer
        display={displayMembers}
        elements={members}
        emptyNode={
          <h1 className="text-2xl font-light text-[#000022]">
            This chapter has no members.
          </h1>
        }
        search={(member: User, filter: string) =>
          (member.firstName + " " + member.lastName)
            .toLowerCase()
            .includes(filter.toLowerCase())
        }
      />
    </>
  );
};

export default MembersHomePage;
