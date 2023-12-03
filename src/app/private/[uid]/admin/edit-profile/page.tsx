import React from "react";
import { prisma } from "@server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]/route";
import EditProfileForm from "./EditProfileForm";

const EditProfile = async () => {
  let firstName = "";
  let lastName = "";
  let pronouns = "";
  let email = "";
  let uid = "";

  const fetchProfile = async () => {
    const session = await getServerSession(authOptions);
    if (session == null || session.user == undefined) {
      return "";
    }

    uid = session.user.id;

    const user = await prisma.user.findFirst({
      where: {
        id: uid,
      },
    });

    firstName = user?.firstName ?? "";
    lastName = user?.lastName ?? "";
    pronouns = user?.pronouns ?? "";
    email = user?.email ?? "";
  };

  await fetchProfile();

  return (
    <div>
      <h2>Edit my Profile</h2>
      <EditProfileForm
        uid={uid}
        firstName={firstName}
        lastName={lastName}
        pronouns={pronouns}
        email={email}
      />
    </div>
  );
};

export default EditProfile;
