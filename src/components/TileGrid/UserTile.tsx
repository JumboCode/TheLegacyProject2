import { Senior, User } from "@prisma/client";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import "@fontsource/merriweather";

interface UserTileProps {
  student?: User;
  senior?: Senior;
  link: string;
  dropdownComponent?: ReactNode;
}

export function UserTile({
  student,
  senior,
  link,
  dropdownComponent,
}: UserTileProps) {
  return (
    <div className="w-40 rounded-lg bg-white">
      <div className="h-40 w-40 rounded-lg bg-white drop-shadow-md hover:bg-off-white">
        <Link href={link}>
          <div className="h-full w-full object-cover">
            {student ? (
              <Image
                src={
                  (student && student.image) ?? "/profile/genericprofile.png"
                }
                alt="Placeholder profile image"
                layout="fill"
                className="max-h-full max-w-full rounded-lg"
              />
            ) : (
              <Image
                src={"/profile/seniorprofile_icon.png"}
                alt="Placeholder profile image"
                layout="fill"
                className="max-h-full max-w-full rounded-lg"
              />
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-between p-2">
        <div className="overflow-hidden">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-['Merriweather'] text-sm text-dark-teal">
            {student && student.name
              ? student.name + (student.admin ? " (Admin)" : "")
              : senior && senior.name
              ? senior.name
              : null}
          </p>
          {/* @TODO: Add pronouns once we add to student field  */}
          <p className="text-md font-base text-neutral-600 mt-[5px] truncate font-['Merriweather'] text-[10px] text-dark-teal">
            {senior && senior.location}
          </p>
        </div>
        {dropdownComponent}
      </div>
    </div>
  );
}
