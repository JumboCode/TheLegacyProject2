"use client";

import { ErrorNavigation } from "@components/navigation";

const Error = () => {
  return (
    <ErrorNavigation
      message="Oops, an error has occurred."
      redirectTo="/private/user/seniors"
      redirectMessage="View all seniors"
    />
  );
};

export default Error;
