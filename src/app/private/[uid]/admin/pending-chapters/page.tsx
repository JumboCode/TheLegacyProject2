import ChapterRequest from "@components/ChapterRequest";
import { prisma } from "@server/db/client";
import { CardGrid } from "@components/container";

const PendingChapters = async () => {
  // Use prisma to get all pending chapter requests
  const pendingChapters = await prisma.chapterRequest.findMany({
    where: {
      approved: "PENDING",
    },
  });
  // Map every chapter request to a pending chapter component and return!
  return (
    <CardGrid
      column_count={2}
      tiles={pendingChapters.map((pendingChapter) => (
        <ChapterRequest
          key={pendingChapter.id}
          chapterRequestId={pendingChapter.id}
          universityName={pendingChapter.university}
          universityAddress={pendingChapter.universityAddress}
          name={pendingChapter.firstName + " " + pendingChapter.lastName}
          phoneNumber={pendingChapter.phoneNumber}
          email={pendingChapter.universityEmail}
          leadershipExperience={pendingChapter.leadershipExperience}
          motivation={pendingChapter.motivation}
          availabilities={pendingChapter.availabilities}
          questions={pendingChapter.questions}
        />
      ))}
    />
  );
};

export default PendingChapters;
