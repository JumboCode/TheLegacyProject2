import { RoleToUrlSegment } from "@constants/RoleAlias";
import { Role } from "@prisma/client";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import React from "react";

interface UseRoleProps {
  uid: string;
  role: Role;
}

const useRoleSegment = (props: UseRoleProps) => {
  const { uid, role } = props;
  const segment = useSelectedLayoutSegment();
  const router = useRouter();
  const [valid, setIsValid] = React.useState(false);

  React.useEffect(() => {
    setIsValid(false);
  }, [segment]);

  React.useEffect(() => {
    if (role !== segment) {
      router.replace(`/private/${uid}/${RoleToUrlSegment[role]}/home`);
      setIsValid(true);
    }
  }, [uid, role, segment, router]);

  return { valid };
};

export default useRoleSegment;
