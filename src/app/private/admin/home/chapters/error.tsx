"use client";

import { ErrorNavigation } from "@components/navigation";

const Error = () => {
  return (
    <ErrorNavigation
      message="Oops, an error has occurred."
      redirectTo="/private/admin/home/chapters"
    />
  );
};

export default Error;
