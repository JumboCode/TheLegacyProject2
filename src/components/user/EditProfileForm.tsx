"use client";

import React, { useContext } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileRequest } from "@api/user/[uid]/edit-profile/route.schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import { editProfile } from "@api/user/[uid]/edit-profile/route.client";
import { UserContext } from "src/context/UserProvider";
import { useApiThrottle } from "@hooks";
import { Spinner } from "@components/skeleton";

const EditProfileForm = () => {
  const {
    user: { id: uid, firstName, lastName, email, pronouns },
  } = useContext(UserContext);
  const [edited, setEdited] = React.useState(false);
  type ValidationSchema = z.infer<typeof EditProfileRequest>;
  const router = useRouter();

  const { register, handleSubmit } = useForm<ValidationSchema>({
    resolver: zodResolver(EditProfileRequest),
  });

  const { fetching, fn: throttleEditProfile } = useApiThrottle({
    fn: editProfile,
    callback: () => {
      setEdited(false);
      router.refresh();
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data, event) => {
    event?.preventDefault();
    throttleEditProfile({ body: data }, uid);
  };

  return (
    <>
      <h2 className="mb-12 text-2xl">Edit my profile</h2>
      <form className="flex flex-col gap-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full grid-cols-2 gap-10">
          <div className="flex w-full flex-col gap-3">
            <label htmlFor="firstName">First name</label>
            <input
              className="rounded-lg border-2 border-gray-400 indent-2 leading-loose"
              id="firstName"
              type="text"
              placeholder="e.g. John"
              defaultValue={firstName}
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
              defaultValue={lastName}
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
              defaultValue={pronouns}
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
              placeholder={email ?? ""}
              readOnly={true}
            ></input>
          </div>
        </div>

        <div className="flex justify-end">
          {!fetching ? (
            <button
              className="rounded-lg bg-dark-teal px-12 py-3 text-center text-sm text-white duration-300 hover:bg-teal"
              style={
                edited
                  ? { visibility: "visible", opacity: 1 }
                  : { visibility: "hidden", opacity: 0 }
              }
              type="submit"
            >
              Save
            </button>
          ) : (
            <Spinner height={16} width={16} />
          )}
        </div>
      </form>
    </>
  );
};

export default EditProfileForm;
