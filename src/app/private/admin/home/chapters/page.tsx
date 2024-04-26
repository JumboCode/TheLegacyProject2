import AdminHomePage from "@components/AdminHomePage";
import { prisma } from "@server/db/client";

const AdminChaptersPage = async () => {
  const chapters = await prisma.chapter.findMany({
    include: {
      students: true,
      chapterRequest: true,
    },
  });

  return <AdminHomePage chapters={chapters} />;
};

export default AdminChaptersPage;
