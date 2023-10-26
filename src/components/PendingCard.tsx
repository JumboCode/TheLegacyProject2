import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

interface IPendingCard {
  name: string;
}

const PendingCard = (props: IPendingCard) => {
  // TODO(nickbar01234) - Link in functionality for accepting / rejecting user
  return (
    <div className="h-[10.5rem] w-40 space-y-2 rounded-lg border-[1.5px] border-dark-teal px-2.5 py-2 text-center">
      <div className="mt-3">
        <FontAwesomeIcon className="h-6 w-4 text-dark-teal" icon={faUser} />
      </div>
      <div className="my-4 overflow-hidden text-ellipsis text-lg text-dark-teal">
        {props.name}
      </div>
      <div className="flex flex-col gap-2 text-white">
        <button className="rounded-2xl bg-dark-teal py-1 text-sm">
          Accept
        </button>
        <button className="rounded-2xl bg-sunset-orange py-1 text-sm">
          Reject
        </button>
      </div>
    </div>
  );
};

export default PendingCard;
