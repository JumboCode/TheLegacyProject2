"use client";

import { useState } from "react";
import { UserTile } from "@components/TileGrid";
import { CardGrid } from "@components/container";
import { TileEdit } from "@components/TileGrid/TileEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "@components/SearchBar";
import { Senior, User } from "@prisma/client";

type SeniorsHomePageProps = {
  seniors: Senior[];
  user: User;
};

const SeniorsHomePage = ({ seniors, user }: SeniorsHomePageProps) => {
  const [filter, setFilter] = useState("");

  return (
    <>
      <div className="mb-6 mt-6 flex w-full gap-2.5">
        <SearchBar setFilter={setFilter} />
      </div>
      <CardGrid
        column_count={2}
        tiles={seniors
          .filter((senior) =>
            senior.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((senior, index) => {
            return (
              <UserTile
                key={index}
                senior={senior}
                link={`/private/${user.id}/user/seniors/${senior.id}`}
              />
            );
          })}
      />
    </>
  );
};

export default SeniorsHomePage;
