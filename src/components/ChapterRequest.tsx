"use client";
import { useState } from "react";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleChapterRequest } from "src/app/api/handle-chapter-request/route.client";

type ButtonProps = {
  chapterRequestId: string;
  universityName: string;
  universityAddress: string;
  name: string;
  email: string;
  phoneNumber: string;
  leadershipExperience: string;
  motivation: string;
  availabilities: string;
  questions: string;
};

const ChapterRequest = ({
  chapterRequestId,
  universityName,
  universityAddress,
  name,
  email,
  phoneNumber,
  leadershipExperience,
  motivation,
  availabilities,
  questions,
}: ButtonProps) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="grid h-min w-full rounded-lg bg-white p-6 text-xs">
      <div className="mb-1 text-xl underline">
        {universityName} <br />
      </div>
      <div className="flex ">
        <div className="flex w-6/12 flex-col ">
          <div className="mb-2.5">
            Location: <span className="font-bold">{universityAddress} </span>
          </div>
          <div className="mb-2.5">
            Requester:&nbsp;<span className="font-bold">{name} </span>
          </div>
        </div>
        <div className="flex w-6/12 flex-col">
          <div className="mb-2.5">
            <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
            {email} <br />
          </div>
          <div className="mb-2.5">
            <FontAwesomeIcon icon={faPhone} className="mr-1" />
            {phoneNumber} <br />
          </div>
        </div>
      </div>

      {showMore ? (
        <div>
          <div
            className="text-dark-green underline"
            onClick={() => setShowMore((b) => !b)}
          >
            Show less
          </div>
          <div>
            <p className="mb-2 mt-2.5 font-bold">
              Do you have any experience in student leadership / club
              organizations / storytelling?
            </p>
            <p>{leadershipExperience}</p>
          </div>
          <div>
            <p className="mb-2 mt-6 font-bold">
              What motivates you to start this initiative in your community?
            </p>
            <p>{motivation}</p>
          </div>
          <div>
            <p className="mb-2 mt-6 font-bold">
              Please list three 1 hour time blocks with your availability in the
              next week.
            </p>
            <p>{availabilities}</p>
          </div>
          <div>
            <p className="mb-2 mt-6 font-bold">
              What questions or comments do you have for us?
            </p>
            <p>{questions}</p>
          </div>
          <div className="mt-2.5 flex flex-row space-x-2 pt-2">
            <div
              className="w-1/2 rounded-xl bg-dark-green py-1 text-center text-white hover:bg-[#1b4448]"
              onClick={async () => {
                handleChapterRequest({
                  body: {
                    chapterRequestId: chapterRequestId,
                    approved: true,
                  },
                }).then((res) => {
                  if (res.code === "SUCCESS_ACCEPTED") {
                    window.location.reload();
                  } else if (res.code === "SUCCESS_DECLINED") {
                    alert("STOP HACKING US");
                  } else {
                    alert("Please refresh the page and try again");
                  }
                });
              }}
            >
              Accept
            </div>
            <div
              className="w-1/2 rounded-xl bg-sunset-orange py-1 text-center text-white hover:bg-[#ED5858]"
              onClick={async () => {
                handleChapterRequest({
                  body: {
                    chapterRequestId: chapterRequestId,
                    approved: false,
                  },
                }).then((res) => {
                  if (res.code === "SUCCESS_DECLINED") {
                    window.location.reload();
                  } else if (res.code === "SUCCESS_ACCEPTED") {
                    alert("STOP HACKING US");
                  } else {
                    alert("Please refresh the page and try again");
                  }
                });
              }}
            >
              Decline
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="text-dark-green underline"
            onClick={() => setShowMore((b) => !b)}
          >
            Show more
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterRequest;
