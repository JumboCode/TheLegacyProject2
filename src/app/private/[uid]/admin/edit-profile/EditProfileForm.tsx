"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileRequest } from "@api/user/[uid]/edit-profile/route.schema";
import { useForm, SubmitHandler } from "react-hook-form";

import { editProfile } from "@api/user/[uid]/edit-profile/route.client";

interface editProfileParams {
  uid: string;
  firstName: string;
  lastName: string;
  pronouns: string;
  email: string;
}

const EditProfileForm = (params: editProfileParams) => {
  type ValidationSchema = z.infer<typeof EditProfileRequest>;

  const { register, handleSubmit } = useForm<ValidationSchema>({
    resolver: zodResolver(EditProfileRequest),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
    editProfile({ body: data }, params.uid);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        id="firstName"
        type="text"
        defaultValue={params.firstName}
        {...register("firstName")}
      />
      <input
        id="lastName"
        defaultValue={params.lastName}
        {...register("lastName")}
      />
      <input
        id="pronouns"
        type="text"
        defaultValue={params.pronouns}
        {...register("pronouns")}
      />
      <input
        id="email"
        type="email"
        placeholder={params.email}
        readOnly={true}
      ></input>
      <input type="submit" />
    </form>
  );
};
export default EditProfileForm;
