import PathNav from "@components/PathNav";
import DisplayUserSenior from "@components/user/DisplayUserSeniors";
import { prisma } from "@server/db/client";
import { getServerSessionOrRedirect } from "@server/utils";
import { fullName } from "@utils";

const Page = async () => {
  const session = await getServerSessionOrRedirect();
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: session.user?.id,
    },
    include: {
      Chapter: {
        include: {
          seniors: true,
        },
      },
    },
  });

  return (
    <div className="flex h-full w-full flex-col gap-y-6">
      <PathNav
        pathInfo={[
          { display: "Members", url: "users" },
          { display: fullName(user), url: `users/${user.id}` },
        ]}
      />
      <DisplayUserSenior editable={true} currentUser={user} />
    </div>
  );
};

export default Page;
