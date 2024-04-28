"use client";
import { handleChapterRequest } from "src/app/api/handle-chapter-request/route.client";
import { useRouter } from "next/navigation";
import { ChapterRequest } from "@prisma/client";
import { InfoTile } from "./TileGrid";
import { useApiThrottle } from "@hooks";
import { Spinner } from "./skeleton";
import DropDownContainer from "./container/DropDownContainer";

interface ChapterRequestMoreInformation {
  question: string;
  answer: string;
}

interface ChapterRequestProps {
  chapterRequest: ChapterRequest;
  readonly?: boolean; // Defaults to false
  ContainerNode?: ({ children }: { children?: React.ReactNode }) => JSX.Element;
  title?: string;
}

const MoreInformation = (props: ChapterRequestMoreInformation) => {
  const { question, answer } = props;
  return (
    <>
      <p className="text-sm font-bold text-[#515151]">{question}</p>
      <p className="before:content-['\200B']">{answer}</p>
    </>
  );
};

const ChapterRequest = (props: ChapterRequestProps) => {
  const { chapterRequest: request, ContainerNode, title } = props;
  const readonly = props.readonly ?? false;

  const router = useRouter();

  const { fetching, fn: throttleChapterRequest } = useApiThrottle({
    fn: handleChapterRequest,
    callback: () => router.refresh(),
  });

  const qas: ChapterRequestMoreInformation[] = [
    {
      question:
        "Do you have any experience in student leadership / club organizations / storytelling?",
      answer: request.leadershipExperience,
    },
    {
      question:
        "What motivates you to start this initiative in your community?",
      answer: request.motivation,
    },
    {
      question:
        "Please list three 1 hour time blocks with your availability in the next week.",
      answer: request.availabilities,
    },
    {
      question: "What questions or comments do you have for us?",
      answer: request.questions,
    },
  ];

  return (
    <InfoTile
      title={title ?? request.university}
      information={[
        {
          key: "Requester",
          value: `${request.firstName} ${request.lastName}`,
        },
        {
          key: "Email",
          value: request.universityEmail,
        },
        {
          key: "Location",
          value: request.universityAddress,
        },
        {
          key: "Mobile",
          value: request.phoneNumber,
        },
      ]}
      ContainerNode={ContainerNode}
      moreInformation={
        readonly ? (
          <div className="flex flex-col gap-y-2">
            {qas.map((question) => (
              <MoreInformation key={question.question} {...question} />
            ))}
          </div>
        ) : (
          <DropDownContainer defaultExpand={false} elementsClassName="pt-4">
            <div className="flex flex-col gap-y-2">
              {qas.map((question) => (
                <MoreInformation key={question.question} {...question} />
              ))}
              {!fetching ? (
                <div className="mt-2 flex flex-row space-x-2">
                  <div
                    className="w-1/2 cursor-pointer rounded-xl bg-dark-teal py-1 text-center text-white hover:bg-[#1b4448]"
                    onClick={() =>
                      throttleChapterRequest({
                        body: {
                          chapterRequestId: request.id,
                          approved: true,
                        },
                      })
                    }
                  >
                    Accept
                  </div>
                  <div
                    className="w-1/2 cursor-pointer rounded-xl bg-sunset-orange py-1 text-center text-white hover:bg-[#ED5858]"
                    onClick={async () =>
                      throttleChapterRequest({
                        body: {
                          chapterRequestId: request.id,
                          approved: false,
                        },
                      })
                    }
                  >
                    Decline
                  </div>
                </div>
              ) : (
                <div className="flex justify-center p-2">
                  <Spinner height={20} width={16} />
                </div>
              )}
            </div>
          </DropDownContainer>
        )
      }
    />
  );
};

export default ChapterRequest;
