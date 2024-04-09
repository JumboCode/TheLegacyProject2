import { RoleToUrlSegment } from "@constants/RoleAlias";
import { Role } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface UseRoleProps {
  uid: string;
  role: Role;
}

const useUserRedirect = (props: UseRoleProps) => {
  const { uid, role } = props;
  const path = usePathname();
  const router = useRouter();
  const [valid, setIsValid] = React.useState(false);

  React.useEffect(() => {
    setIsValid(false);
  }, [path]);

  React.useEffect(() => {
    if (path == null) {
      return;
    }

    const protectedSegment = `/private/${RoleToUrlSegment[role]}`;
    if (!path.startsWith(protectedSegment)) {
      router.replace(`${protectedSegment}/home`);
    }

    setIsValid(true);
  }, [uid, role, path, router]);

  return { valid };
};

export default useUserRedirect;
