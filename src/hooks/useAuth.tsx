import { formatUserHomeRoute } from "@utils";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const useAuth = () => {
  const router = useRouter();
  const { status, data: session } = useSession();

  const onSignIn = React.useCallback(() => {
    if (session?.user != undefined) {
      router.push(formatUserHomeRoute(session.user));
    } else if (status === "unauthenticated") {
      signIn("google", { callbackUrl: "/api/auth" });
    }
  }, [router, status, session]);

  return {
    status: status,
    onSignIn: onSignIn,
  };
};

export default useAuth;
