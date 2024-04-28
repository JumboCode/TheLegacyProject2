"use client";

import { ErrorNavigation } from "@components/navigation";

const Error = () => {
  return (
    <ErrorNavigation
      message="Oops, an error has occurred."
      redirectTo="/private/user/seniors"
    />
  );
};

export default Error;
