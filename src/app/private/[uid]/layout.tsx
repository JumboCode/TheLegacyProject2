import { RoleNavigation } from "@components/navigation";
import UserProvider from "@context/UserProvider";
import { prisma } from "@server/db/client";

interface IPrivateLayout {
  children: React.ReactNode;
  params: {
    uid: string;
  };
}

const PrivateLayout = async ({ children, params }: IPrivateLayout) => {
  const user = await prisma.user.findFirstOrThrow({
    where: { id: params.uid },
    include: {
      Chapter: true,
    },
  });
  return (
    <UserProvider user={user}>
      <RoleNavigation>{children}</RoleNavigation>
    </UserProvider>
  );
};

export default PrivateLayout;
