"use client";

import React from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Prisma } from "@prisma/client";
import Link from "next/link";

type ChapterWithUser = Prisma.ChapterGetPayload<{
  include: { students: true };
}>;

interface ChapterTileProps {
  chapter: ChapterWithUser;
  topRightButton?: React.ReactNode;
}

export function UserRequestTile({ chapter, topRightButton }: ChapterTileProps) {
  let yearsActive =
    (new Date().getTime() - chapter.dateCreated.getTime()) / 1000;
  yearsActive /= 60 * 60 * 24;
  yearsActive = Math.abs(Math.round(yearsActive / 365.25));

  const president = React.useMemo(() => {
    return chapter.students.find((user) => user.role === "CHAPTER_LEADER");
  }, [chapter]);

  return (
    <div className="w-full rounded-xl bg-white p-6">
      <div className="mb-2.5 flex items-center justify-between gap-2.5">
        <div className="text-2xl underline">{chapter.chapterName}</div>
        {topRightButton}
      </div>
      <div className="flex w-full gap-2.5">
        <div className="flex w-6/12 flex-col gap-2.5">
          <div>
            No. of members:&nbsp;
            <span className="font-bold">{chapter.students.length}</span>
          </div>
          <div>
            Years active:&nbsp;<span className="font-bold">{yearsActive}</span>
          </div>
        </div>
        <div className="flex w-6/12 flex-col gap-2.5">
          <div className="w-full truncate">
            President:&nbsp;
            <span className="font-bold">{president?.name ?? ""}</span>
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="w-full truncate">{president?.email ?? ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
