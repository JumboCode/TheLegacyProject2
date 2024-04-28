"use client";

import { ErrorNavigation } from "@components/navigation";

const Error = () => {
  return (
    <ErrorNavigation
      message="Oops, an error has occurred."
      redirectTo="/private/admin/home/chapters"
      redirectMessage="View all chapters"
    />
  );
};

export default Error;
