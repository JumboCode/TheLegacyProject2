import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { AddTile } from "@components/addTile";

import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { Approval } from "@prisma/client";

type IAdminProps = Awaited<ReturnType<typeof getServerSideProps>>["props"] & {
  redirect: undefined;
};

// type AdminTileData = {
//   name: string;
//   image: string;
// };

const AdminTile = ({ data }: {data: any}) => {
  return (
    <div className="w-64 resize-x resize-y">
      <section className="h-64 rounded bg-white p-4 drop-shadow-md">
        <div className="flex h-full flex-col items-center justify-center">
          <a href="add-student.html"><div className="h-20 w-20 overflow-hidden rounded-full">
            <Image
              className="object-scale-down"
              src={data.image}
              alt="Placeholder profile image"
              height={80}
              width={80}
            ></Image>
          </div></a>
          <br></br>
          <p className="text-base font-medium text-gray-700">{data.name}</p>
        </div>
      </section>
    </div>
  );
};

const AdminGrid = ( { users }: IAdminProps ) => {
  // const [data, setData] = useState<AdminTileData[]>([
  //   { name: "Jo", location: "Somerville, MA", picture: "" },
  //   { name: "JoJo", location: "Somerville, MA", picture: "" },
  //   { name: "Joe", location: "Somerville, MA", picture: "" },
  //   { name: "Joseph", location: "Somerville, MA", picture: "" },
  //   { name: "Jô", location: "Somerville, MA", picture: "" },
  //   { name: "Jonathan", location: "Somerville, MA", picture: "" },
  //   { name: "João", location: "Somerville, MA", picture: "" },
  //   { name: "Bojangles", location: "Somerville, MA", picture: "" },
  // ]);

  //const data = students;
  const [studentData, setStudentData] = useState(users);

  return (
    <main className="mx-auto flex min-w-fit w-full flex-col px-3 pb-9 md:px-5 lg:px-9">
      <div className="mt-5 flex grid grid-cols-[repeat(auto-fill,_256px)] gap-10 text-center">
        {/* Grid styling submitted in PR */}
        {/* <div className="grid gap-10 pt-3 text-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 space-evenly"> */}

        {/* Flex styling workaround */}
        {/* <div className="lg:px-9 md:px-5 px-3 flex justify-self-center flex-wrap gap-6"></div> */}
        <AddTile/>
        {studentData.map((data, i) => (
          <AdminTile
            key={i}
            data = { data }
          />
        ))}
      </div>
    </main>
  );
};

export default AdminGrid;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!prisma) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!user.admin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const seniors = await prisma.senior.findMany();
  const users = await prisma.user.findMany({
    where: {
      approved: Approval.APPROVED,
    },
  });

  return {
    props: {
      users,
    },
  };
};
