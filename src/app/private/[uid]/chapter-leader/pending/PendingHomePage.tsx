"use client";

import PendingCard from "@components/PendingCard";
import { CardGrid } from "@components/container";
import { User } from "@prisma/client";

type MembersHomePageProps = {
  users: User[];
};

const PendingHomePage = ({ users }: MembersHomePageProps) => {
  return (
    <>
      <h1 className="font-merriweather pb-8 text-3xl">
        {`Pending (${users.length})`}
      </h1>
      {users.length > 0 ? (
        <CardGrid
          column_count={2}
          tiles={users.map((user, index) => {
            return (
              <PendingCard key={index} name={user.name ?? ""} uid={user.id} />
            );
          })}
        />
      ) : (
        <h1 className="text-2xl font-light">
          {"This chapter has no pending members."}
        </h1>
      )}
    </>
  );
};

export default PendingHomePage;
