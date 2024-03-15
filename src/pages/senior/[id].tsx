import Image from "next/legacy/image";
import type { GetServerSidePropsContext } from "next";
import { useState } from "react";
import FileTile from "@components/TileGrid/FileTile";
import SearchBar from "@components/SearchBar";
import AddFile from "@components/AddFile";
import TileGrid from "@components/TileGrid";
import SortDropdown, { SortMethod } from "@components/SortDropdown";

import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { z } from "zod";
import { Approval } from "@prisma/client";
import { prisma } from "@server/db/client";

// type ISeniorProfileProps = Awaited<
//   ReturnType<typeof getServerSideProps>
// >["props"] & {
//   redirect: undefined;
// };

// type SerialzedFile = ISeniorProfileProps["senior"]["Files"][number];

const SeniorProfile = ({ senior }: any) => {
  // const [files, _] = useState(senior.Files);
  // const [sortMethod, setSortMethod] = useState<SortMethod>("By Name");
  // const [filter, setFilter] = useState("");
  // const [showAddFilePopUp, setShowAddFilePopUp] = useState<boolean>(false);
  /*
  const sortFunction =
    sortMethod === "By Name"
      ? ({ name: nameA }: SerialzedFile, { name: nameB }: SerialzedFile) =>
          nameA.localeCompare(nameB)
      : sortMethod === "By Last Modified"
      ? (
          { lastModified: dateA }: SerialzedFile,
          { lastModified: dateB }: SerialzedFile
        ) => {
          return +dateA - +dateB;
        }
      : () => 0;

  const filteredFiles = files
    .sort(sortFunction)
    .filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));

  const handlePopUp = () => {
    setShowAddFilePopUp(!showAddFilePopUp);
  };
  */

  return null;

  // return (
  // <div className="relative flex min-h-screen flex-col">
  //   {showAddFilePopUp ? (
  //     <AddFile
  //       showAddFilePopUp={showAddFilePopUp}
  //       setShowAddFilePopUp={setShowAddFilePopUp}
  //       seniorId={senior.id}
  //       folder={senior.folder}
  //     />
  //   ) : null}
  //   <div className="w-full p-8">
  //     <h1 className="mb-4 font-serif text-5xl leading-normal sm:text-center md:text-left">
  //       {senior.name}
  //       <h2 className="font-serif text-xl"> {senior.location} </h2>
  //     </h1>
  //     <div className="mb-8 w-full border-solid bg-tan drop-shadow-md">
  //       <p className="md:text-md max-h-[100px] overflow-scroll rounded bg-tan p-4 sm:text-lg">
  //         {senior.description}
  //       </p>
  //     </div>
  //     <div className="flex flex-row justify-between space-x-3 align-middle">
  //       <SearchBar setFilter={setFilter} />
  //       <div className="relative z-10">
  //         <SortDropdown
  //           sortMethod={sortMethod}
  //           setSortMethod={setSortMethod}
  //         />
  //       </div>
  //     </div>

  //     <TileGrid>
  //       <button
  //         className="\ relative flex aspect-square w-auto flex-col items-center justify-center rounded
  //                        bg-white text-base drop-shadow-md hover:bg-off-white"
  //         onClick={handlePopUp}
  //       >
  //         <div className="flex flex-col justify-end">
  //           <Image
  //             className="object-scale-down"
  //             src={"/profile/addfile_icon.png"}
  //             alt="Add file icon"
  //             height={75}
  //             width={75}
  //           />
  //         </div>
  //         <div className="text-neutral-800 relative flex w-full flex-col p-2 text-center text-lg">
  //           Create New File
  //         </div>
  //       </button>
  //       {filteredFiles.map((file, key) => (
  //         <div key={key}>
  //           <FileTile
  //             id={file.id}
  //             date={file.date}
  //             url={file.url}
  //             Tags={file.Tags}
  //           />
  //         </div>
  //       ))}
  //     </TileGrid>
  //   </div>
  // </div>
  //   );
};

export default SeniorProfile;

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const session = await getServerAuthSession(context);
//   const seniorId = z.string().parse(context.query.id);

//   if (!session || !session.user) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   if (!prisma) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   const user = await prisma.user.findUnique({
//     where: {
//       id: session.user.id,
//     },
//   });

//   if (!user) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   if (user.approved === Approval.PENDING) {
//     return {
//       redirect: {
//         destination: "/pending",
//         permanent: false,
//       },
//     };
//   }

//   // await fetch ("/api/senior/" + seniorId, { method: "GET" });
//   // TODO: not using our beautiful API routes??
//   const senior = await prisma.senior.findUnique({
//     where: {
//       id: seniorId, //get all information for given senior
//     },
//     include: {
//       Files: true,
//     },
//   });

//   if (
//     !senior ||
//     (!user.admin && !senior.StudentIDs.includes(session.user.id))
//   ) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     // props: {
//     //   senior: {
//     //     ...senior,
//     //     Files: senior.Files.map((file) => ({
//     //       ...file,
//     //       lastModified: file.lastModified.getTime(),
//     //     })),
//     //   },
//     // },
//   };
// };
