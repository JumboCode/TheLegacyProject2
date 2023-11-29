"use client";

import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileRequest } from "@api/user/[uid]/edit-profile/route.schema";
import { useForm, SubmitHandler } from "react-hook-form";

interface editProfileParams {
  firstName: string;
  lastName: string;
  pronouns: string;
  email: string;
}

const EditProfileForm = (params: editProfileParams) => {
  type ValidationSchema = z.infer<typeof EditProfileRequest>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(EditProfileRequest),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        id="firstName"
        type="text"
        placeholder={params.firstName}
        {...register("firstName")}
      />
      {errors.firstName && (
        <p className="mt-2 text-xs italic text-red-500">
          {" "}
          {errors.firstName?.message}
        </p>
      )}
      <input
        id="lastName"
        type="text"
        placeholder={params.lastName}
        {...register("lastName")}
      />
      {errors.lastName && (
        <p className="mt-2 text-xs italic text-red-500">
          {" "}
          {errors.lastName?.message}
        </p>
      )}
      <input
        id="pronouns"
        type="text"
        placeholder={params.pronouns}
        {...register("pronouns")}
      />
      {errors.pronouns && (
        <p className="mt-2 text-xs italic text-red-500">
          {" "}
          {errors.pronouns?.message}
        </p>
      )}
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
