"use client";

import { Senior, User } from "@prisma/client";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import "@fontsource/merriweather";
import { fullName, seniorFullName } from "@utils";

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
    <div className="w-48 rounded-lg bg-white shadow-lg">
      <div className="h-40 w-full rounded-lg bg-white drop-shadow-md hover:bg-off-white">
        <Link
          href={link}
          className={
            link === "" ? "pointer-events-none" : "pointer-events-auto"
          }
        >
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
      <div className="relative flex items-start justify-between px-3 py-4">
        <div className="overflow-hidden">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold before:invisible before:content-['\200B']">
            {student
              ? fullName(student)
              : senior
              ? seniorFullName(senior)
              : null}
          </p>
          <p
            className={
              (student &&
              student.position === "" &&
              student.role !== "CHAPTER_LEADER"
                ? "bg-med-tan text-dark-teal "
                : "bg-[#AE583C] font-bold text-white  ") +
              "mt-5 inline-block text-ellipsis whitespace-nowrap rounded-3xl px-3.5 py-1.5 text-center text-xs"
            }
          >
            {student
              ? student.role === "CHAPTER_LEADER"
                ? "Chapter Leader"
                : student.position === ""
                ? "Member"
                : student.position
              : senior
              ? senior.dateCreated.getFullYear()
              : null}
          </p>
          {/* @TODO: Add pronouns once we add to student field  */}
        </div>
        {dropdownComponent}
      </div>
    </div>
  );
}
