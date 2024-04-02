import { prisma } from "@server/db/client";
import { HeaderContainer } from "@components/container/index";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { UserJoinRequest } from "@components/user";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    uid: string;
  };
}

const Layout = async ({ children, params }: LayoutProps) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: params.uid,
    },
  });
  if (user.ChapterID != null) {
    return (
      <HeaderContainer
        header="Home"
        headerIcon={faHouse}
        showHorizontalLine={false}
      >
        {children}
      </HeaderContainer>
    );
  } else {
    const chapters = await prisma.chapter.findMany({
      include: { students: true },
    });
    const joinRequest = await prisma.userRequest.findFirst({
      where: {
        uid: params.uid,
      },
    });
    return <UserJoinRequest chapters={chapters} joinRequest={joinRequest} />;
  }
};

export default Layout;
