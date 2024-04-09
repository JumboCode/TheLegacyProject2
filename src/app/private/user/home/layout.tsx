import { prisma } from "@server/db/client";
import { HeaderContainer } from "@components/container/index";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { UserJoinRequest } from "@components/user";
import { getServerSessionOrRedirect } from "@server/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSessionOrRedirect();
  const maybeChapterId = session.user?.ChapterID ?? undefined;

  if (maybeChapterId == undefined) {
    const chapters = await prisma.chapter.findMany({
      include: { students: true },
    });
    const joinRequest = await prisma.userRequest.findFirst({
      where: {
        uid: session.user?.id,
      },
    });
    return <UserJoinRequest chapters={chapters} joinRequest={joinRequest} />;
  } else {
    return (
      <HeaderContainer
        header="Home"
        headerIcon={faHouse}
        showHorizontalLine={false}
      >
        {children}
      </HeaderContainer>
    );
  }
};

export default Layout;
