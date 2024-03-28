"use client";

import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  handleManageChapterRequest,
  handleAcceptChapterRequest,
} from "@api/user-request/route.client";

interface IPendingCard {
  name: string;
  uid: string;
}

const PendingCard = (props: IPendingCard) => {
  return (
    <div className="flex w-full items-center justify-between rounded bg-white p-6 shadow-lg">
      <div className="flex items-center gap-x-4">
        <FontAwesomeIcon className="h-6 w-4 text-dark-teal" icon={faUser} />
        <span className="max-w-[164px] grow-0 overflow-hidden text-ellipsis whitespace-nowrap text-lg">
          {props.name}
        </span>
      </div>
      <div className="flex items-center gap-x-4">
        <button
          className="rounded bg-dark-teal px-5 py-2 text-sm text-white transition duration-300 ease-in-out hover:-translate-y-1"
          onClick={() => {
            handleAcceptChapterRequest({
              body: {
                userId: props.uid,
              },
            }).then(() => {
              window.location.reload();
            });
          }}
        >
          Accept
        </button>
        <FontAwesomeIcon
          icon={faXmark}
          className="cursor-pointer text-[#65696C] transition duration-300 ease-in-out hover:-translate-y-1"
          size="xl"
          onClick={() => {
            handleManageChapterRequest({
              body: {
                userId: props.uid,
              },
            }).then(() => {
              window.location.reload();
            });
          }}
        />
      </div>
    </div>
  );
};

export default PendingCard;
