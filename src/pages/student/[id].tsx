import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import PhotoHeader from "@components/PhotoHeader";
import TileGrid, { UserTile } from "@components/TileGrid";

import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { z } from "zod";
import { prisma } from "@server/db/client";

type IStudentProps = Awaited<ReturnType<typeof getServerSideProps>>["props"] & {
  redirect: undefined;
};

const StudentProfilePage = ({ student }: IStudentProps) => {
  const router = useRouter(); // call to refresh props
  const refreshData = useCallback(() => {
    router.replace(router.asPath);
  }, [router]);

  console.log("Their Seniors: " + student.Seniors);
  const [seniors, setSeniors] = useState(student.Seniors);

  return (
    <>
      <div className="place-items-stsetch flex h-full flex-col gap-6 p-8">
        <PhotoHeader admin={false} name={student.name} />
        <TileGrid>
          {seniors.map((senior) => {
            return (
              <UserTile
                key={senior.id}
                link={"/senior/" + senior.id}
                senior={senior}
              />
            );
          })}
        </TileGrid>
      </div>
    </>
  );
};

// render sidebar instead of top navbar
StudentProfilePage.displayName = "private";

export default StudentProfilePage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);
  const studentId = z.string().parse(context.query.id);

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

  const student = await prisma.user.findUnique({
    where: { id: studentId },
    include: { Seniors: true },
  });

  if (!student) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      student: student,
    },
  };
};
