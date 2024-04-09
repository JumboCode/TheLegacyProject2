import AdminHomePage from "@components/AdminHomePage";
import { prisma } from "@server/db/client";

const AdminHomePageWrapper = async () => {
  const chapters = await prisma.chapter.findMany({
    include: {
      students: true,
    },
  });

  return <AdminHomePage chapters={chapters} />;
};

export default AdminHomePageWrapper;
