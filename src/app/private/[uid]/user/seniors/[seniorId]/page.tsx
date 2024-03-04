import PathNav from "@components/PathNav";
import { DisplaySenior } from "@components/senior";
import { prisma } from "@server/db/client";

interface PageProps {
  params: {
    uid: string;
    seniorId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const senior = await prisma.senior.findUniqueOrThrow({
    where: {
      id: params.seniorId,
      StudentIDs: {
        has: params.uid,
      },
    },
    include: {
      chapter: {
        include: {
          students: true,
        },
      },
      Files: true,
    },
  });

  return (
    <div className="flex flex-col gap-y-6">
      <PathNav
        pathInfo={[
          { display: "Seniors", url: `/private/${params.uid}/user/seniors` },
          {
            display: senior.name,
            url: `/private/${params.uid}/seniors/${senior.id}`,
          },
        ]}
      />
      <div className="relative">
        <DisplaySenior editable={false} senior={senior} />
      </div>
    </div>
  );
};

export default Page;
