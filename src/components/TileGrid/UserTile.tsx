import { TileEdit } from "./TileEdit";
import { Senior, User } from "@prisma/client";
import Image from "next/legacy/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction } from "react";
import "@fontsource/merriweather";

interface UserTileProps {
  student?: User;
  senior?: Senior;
  link: string;
  setDeactivated?: Dispatch<SetStateAction<User[]>>;
  setStudents?: Dispatch<SetStateAction<User[]>>;
  setSeniors?: Dispatch<SetStateAction<Senior[]>>;
  refreshData: () => void;
  setShowAddSeniorPopUp?: Dispatch<SetStateAction<boolean>>;
  setSeniorPatch?: Dispatch<SetStateAction<string>>;
}

export function UserTile({
  student,
  senior,
  link,
  setDeactivated,
  setStudents,
  setSeniors,
  refreshData,
  setShowAddSeniorPopUp,
  setSeniorPatch,
}: UserTileProps) {
  const { data } = useSession();

  const options: Parameters<typeof TileEdit>[0]["options"] = [];

  if (student && setStudents && setDeactivated) {
    if (data && data?.user?.id !== student.id) {
      if (student.admin) {
        options.push({
          name: "Demote",
          onClick: () => {
            setStudents((prev) =>
              prev.map((s) =>
                s.id === student.id ? { ...s, admin: false } : s
              )
            );
            fetch(`/api/student/${student.id}/demote`, { method: "POST" });
            refreshData();
          },
        });
      } else {
        options.push({
          name: "Promote",
          onClick: () => {
            setStudents((prev) =>
              prev.map((s) => (s.id === student.id ? { ...s, admin: true } : s))
            );
            fetch(`/api/student/${student.id}/promote`, { method: "POST" });
            refreshData();
          },
        });
      }
    }
  } else if (senior) {
    options.push({
      name: "Edit",
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!setSeniorPatch || !setShowAddSeniorPopUp) {
          return;
        }
        setSeniorPatch(senior.id);
        setShowAddSeniorPopUp(true);
      },
    });

    options.push({
      name: "Delete",
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        fetch(`/api/senior/${senior.id}`, {
          method: "DELETE",
        });
        if (!setSeniors) {
          return;
        }
        setSeniors((prev) => prev.filter((s) => s.id !== senior.id));
        refreshData();
      },
    });
  }

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
          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-['Merriweather'] text-sm text-[#22555A]">
            {data && student && student.name
              ? student.name + (student.admin ? " (Admin)" : "")
              : data && senior && senior.name
              ? senior.name
              : null}
          </p>
          {/* @TODO: Add pronouns once we add to student field */}
          <p className="text-md font-base text-neutral-600 mt-[5px] truncate font-['Merriweather'] text-[10px] text-[#22555A]">
            {senior && senior.location}
          </p>
        </div>
        {/* @TODO: Check if we still want a demote button or not */}
        <TileEdit options={options} />
      </div>
    </div>
  );
}
