"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileRequest } from "@api/user/[uid]/edit-profile/route.schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import { editProfile } from "@api/user/[uid]/edit-profile/route.client";
import { useSession } from "next-auth/react";

interface editProfileParams {
  uid: string;
  firstName: string;
  lastName: string;
  pronouns: string;
  email: string;
}

const EditProfileForm = (params: editProfileParams) => {
  const { update } = useSession();
  const [edited, setEdited] = React.useState(false);
  type ValidationSchema = z.infer<typeof EditProfileRequest>;
  const router = useRouter();

  const { register, handleSubmit } = useForm<ValidationSchema>({
    resolver: zodResolver(EditProfileRequest),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data, event) => {
    event?.preventDefault();
    const response = await editProfile({ body: data }, params.uid);
    if (response.code == "SUCCESS") {
      setEdited(false);
      update();
      router.refresh();
    }
  };

  return (
    <form className="relative w-11/12" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full grid-cols-2 gap-10">
        <div className="flex w-full flex-col gap-3">
          <label htmlFor="firstName">First name</label>
          <input
            className="rounded-lg border-2 border-gray-400 indent-2 leading-loose"
            id="firstName"
            type="text"
            placeholder="e.g. John"
            defaultValue={params.firstName}
            {...register("firstName")}
            onChange={() => setEdited(true)}
          />
        </div>
        <div className="flex w-full flex-col gap-3">
          <label htmlFor="lastName">Last name</label>
          <input
            className="rounded-lg border-2 border-gray-400 indent-2 leading-loose"
            id="lastName"
            type="text"
            placeholder="e.g. Doe"
            defaultValue={params.lastName}
            {...register("lastName")}
            onChange={() => setEdited(true)}
          />
        </div>
        <div className="flex w-full flex-col gap-3">
          <label htmlFor="pronouns">Pronouns</label>
          <input
            className="rounded-lg border-2 border-gray-400 indent-2 leading-loose"
            id="pronouns"
            type="text"
            placeholder="e.g. he/him"
            defaultValue={params.pronouns}
            {...register("pronouns")}
            onChange={() => setEdited(true)}
          />
        </div>
        <div className="flex w-full flex-col gap-3">
          <label htmlFor="email">Email</label>
          <input
            className="rounded-lg border-2 border-gray-400 indent-2 leading-loose"
            id="email"
            type="email"
            placeholder={params.email}
            readOnly={true}
          ></input>
        </div>
      </div>
      <button
        className="absolute right-0 mt-10 h-8 w-24 rounded-lg bg-dark-teal text-center text-sm text-white duration-300 hover:bg-teal"
        style={
          edited
            ? { visibility: "visible", opacity: 1 }
            : { visibility: "hidden", opacity: 0 }
        }
        type="submit"
      >
        Save
      </button>
    </form>
  );
};
export default EditProfileForm;
