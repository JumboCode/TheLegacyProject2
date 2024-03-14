"use client";

import type { GetServerSidePropsContext } from "next";
import AddFile from "@components/user/AddFile";
import { useState } from "react";
import { prisma } from "@server/db/client";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { z } from "zod";
import { Approval } from "@prisma/client";

// type ISeniorProfileProps = Awaited<
//   ReturnType<typeof getServerSideProps>
// >["props"] & {
//   redirect: undefined;
// };

// type SerialzedFile = ISeniorProfileProps["senior"]["Files"][number];

const AddFilePage = () => {
  const [showAddFilePopUp, setShowAddFilePopUp] = useState<boolean>(false);
  const handlePopUp = () => {
    setShowAddFilePopUp(!showAddFilePopUp);
  };
  return (
    <div>
      {showAddFilePopUp ? (
        <AddFile
          showAddFilePopUp={showAddFilePopUp}
          setShowAddFilePopUp={setShowAddFilePopUp}
          seniorId={"65e7815b307c8d1a518df8a8"}
          folder={"13LqDrrWNMXevAd4so-jaBxk_dUDIbend"}
        />
      ) : null}
      <button
        className="bg-blue relative flex aspect-square w-auto flex-col items-center justify-center 
                           rounded text-base drop-shadow-md hover:bg-off-white"
        onClick={handlePopUp}
      >
        hello
      </button>
    </div>
  );
};

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
//     props: {
//       senior: {
//         ...senior,
//         Files: senior.Files.map((file) => ({
//           ...file,
//           lastModified: file.lastModified.getTime(),
//         })),
//       },
//     },
//   };
// };

export default AddFilePage;
