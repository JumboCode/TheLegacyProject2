import ChapterRequest from "@components/ChapterRequest";
import { prisma } from "@server/db/client";

const PendingChapters = async () => {
  // Use prisma to get all pending chapter requests
  const pendingChapters = await prisma.chapterRequest.findMany({
    where: { 
      approved: "PENDING" },
  });
  // Map every chapter request to a pending chapter component and return!
  return (
    <div className="mb-5 grid flex-wrap gap-6 md:grid-cols-2">
      {pendingChapters.map((pendingChapter) => (
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
    </div>
  );
};

export default PendingChapters;
