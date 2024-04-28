"use client";

import { ErrorNavigation } from "@components/navigation";

const Error = () => {
  return (
    <ErrorNavigation
      message="Oops, an error has occurred."
      redirectMessage="Back to home"
    />
  );
};

export default Error;
