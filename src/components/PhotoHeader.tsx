// Photo Header for Student Home Page

import React from "react";
import Image from "next/legacy/image";
import cn from "classnames";

export interface IPhotoHeaderProps {
  admin: boolean;
  name: string | null;
}

const PhotoHeader = ({ admin, name }: IPhotoHeaderProps) => {
  return (
    <>
      <div
        className={cn(
          "relative flex w-auto flex-col border border-darker-tan",
          admin ? "md:h-[160px] xs:h-[140px]" : "md:h-[200px] xs:h-[180px]"
        )}
      >
        <div className="relative flex h-full w-full">
          <Image
            className="object-cover"
            src={"/profile/header3.jpg"}
            alt={
              "A black typewriter on a wooden desk with a notebook and old photos next to it."
            }
            layout="fill"
          />
        </div>

        <div
          className={
            "absolute bottom-0 right-0 flex h-[40px] w-full items-center bg-off-white                            bg-opacity-70 p-2 backdrop-blur-sm"
          }
        >
          <span className="text-md tracking-normal text-dark-plum sm:pl-4 xs:pl-2">
            Hello{name == null ? " there" : ", " + name.split(" ").shift()}.
          </span>
        </div>
      </div>
    </>
  );
};

export default PhotoHeader;
