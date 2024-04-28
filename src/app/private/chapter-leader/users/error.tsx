"use client";

import { ErrorNavigation } from "@components/navigation";

const Error = () => {
  return (
    <ErrorNavigation
      message="Oops, an error has occurred."
      redirectTo="/private/chapter-leader/users"
      redirectMessage="View all users"
    />
  );
};

export default Error;
