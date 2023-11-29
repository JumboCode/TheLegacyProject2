import React from "react";
import { prisma } from "@server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]/route";
import { EditProfileForm } from "EditProfileForm";

const EditProfile = async ({ params }: { params: { uid: string } }) => {
  const fetchProfileName = async () => {
    const session = await getServerSession(authOptions);
    if (session == null || session.user == undefined) {
      return "";
    }
    const targetUID = params.uid;
    const currentUserID = session.user.id;

    if (targetUID === currentUserID) {
      return "Edit my profile";
    } else {
      const user = await prisma.user.findFirst({
        where: {
          id: targetUID,
        },
      });
      return user != null ? `Edit ${user?.name}'s profile` : "Unknown UID";
    }
  };
  const editProfileMessage = await fetchProfileName();

  return (
    <div>
      <h2>{editProfileMessage}</h2>
      <EditProfileForm />
    </div>
  );
};

export default EditProfile;
