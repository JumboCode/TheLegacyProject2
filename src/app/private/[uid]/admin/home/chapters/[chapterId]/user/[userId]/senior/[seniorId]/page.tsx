import { prisma } from "@server/db/client";

interface Params {
  params: {
    seniorId: string;
    uid: string;
  };
}
const SeniorPage = async ({ params }: Params) => {
  const senior = await prisma.senior.findUniqueOrThrow({
    where: {
      id: params.seniorId,
      StudentIDs: {
        has: params.uid,
      },
    },
  });

  console.log(senior);

  return null;
};

export default SeniorPage;
