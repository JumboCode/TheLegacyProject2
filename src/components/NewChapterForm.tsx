"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChapterRequest } from "src/app/api/chapter-request/route.schema";
import { ErrorMessage } from "@hookform/error-message";
import { createChapterRequest } from "@api/chapter-request/route.client";

type ValidationSchema = z.infer<typeof ChapterRequest>;

enum FormSubmission {
  NOT_SUBMITTED = 0,
  SUBMITTED = 1,
  ERROR = 2,
}

const NewChapterForm = () => {
  const [formSubmitted, setFormSubmitted] = useState<FormSubmission>(
    FormSubmission.NOT_SUBMITTED
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(ChapterRequest),
  });

  const onSubmit: SubmitHandler<z.infer<typeof ChapterRequest>> = async (
    data,
    event
  ) => {
    event?.preventDefault();
    const response = await createChapterRequest({ body: data });
    if (response.code === "SUCCESS") {
      setFormSubmitted(FormSubmission.SUBMITTED);
    } else {
      setFormSubmitted(FormSubmission.ERROR);
    }
    //TODO: revisit all possible return/calls
  };

  return (
    <div className="grid place-items-center">
      <div className="w-full rounded-md bg-dark-teal px-9 py-10 text-lg text-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            <div className="w-full ">
              <div>First Name</div>
              <input
                {...register("firstName")}
                className="h-8 w-full rounded-md px-2 py-2 text-black"
              />
              <div className="text-sm">
                <ErrorMessage
                  errors={errors}
                  name="firstName"
                  render={({ message }) => (
                    <p>
                      {" "}
                      <span className="text-sunset-orange">* </span>
                      {message}
                    </p>
                  )}
                />
              </div>
            </div>
            <div className="w-full">
              <div>Last Name</div>
              <input
                {...register("lastName")}
                className="h-8 w-full rounded-md px-2 py-2 text-black"
              />
              <div className="text-sm">
                <ErrorMessage
                  errors={errors}
                  name="lastName"
                  render={({ message }) => (
                    <p>
                      <span className="text-sunset-orange">* </span>
                      {message}
                    </p>
                  )}
                />
              </div>
            </div>
            <div className="w-full">
              <div>University Email</div>
              <input
                {...register("universityEmail")}
                className="h-8 w-full rounded-md px-2 py-2 text-black"
              />
              <div className="text-sm">
                <ErrorMessage
                  errors={errors}
                  name="universityEmail"
                  render={({ message }) => (
                    <p>
                      <span className="text-sunset-orange">* </span>
                      {message}
                    </p>
                  )}
                />
              </div>
            </div>
            <div className="w-full">
              <div>Phone Number</div>
              <input
                {...register("phoneNumber")}
                className="h-8 w-full rounded-md px-2 py-2 text-black"
              />
              <div className="text-sm">
                <ErrorMessage
                  errors={errors}
                  name="phoneNumber"
                  render={({ message }) => (
                    <p>
                      <span className="text-sunset-orange">* </span>
                      {message}
                    </p>
                  )}
                />
              </div>
            </div>
            <div className="w-full">
              <div>College / University</div>
              <input
                {...register("university")}
                className="h-8 w-full rounded-md px-2 py-2 text-black"
              />
              <div className="text-sm">
                <ErrorMessage
                  errors={errors}
                  name="university"
                  render={({ message }) => (
                    <p>
                      <span className="text-sunset-orange">* </span>
                      {message}
                    </p>
                  )}
                />
              </div>
            </div>
            <div className="w-full">
              <div>College / University Address</div>
              <input
                {...register("universityAddress")}
                className="h-8 w-full rounded-md px-2 py-2 text-black"
              />
              <div className="text-sm">
                <ErrorMessage
                  errors={errors}
                  name="universityAddress"
                  render={({ message }) => (
                    <p>
                      <span className="text-sunset-orange">* </span>
                      {message}
                    </p>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div>
              <div>
                Do you have any experience in student leadership / club
                organization / storytelling?{" "}
              </div>
              <textarea
                {...register("leadershipExperience")}
                className="h-18 w-full resize-y rounded-md px-2 py-2 align-top text-black"
              />
              <div className="text-sm">
                <ErrorMessage
                  errors={errors}
                  name="leadershipExperience"
                  render={({ message }) => (
                    <p>
                      <span className="text-sunset-orange">* </span>
                      {message}
                    </p>
                  )}
                />
              </div>
            </div>
            <div className="pt-5">
              <div>
                What motivates you to start this initiative in your community?{" "}
              </div>
              <textarea
                {...register("motivation")}
                className="h-18 w-full resize-y rounded-md px-2 py-2 align-top text-black"
              />
              <div className="text-sm">
                <ErrorMessage
                  errors={errors}
                  name="motivation"
                  render={({ message }) => (
                    <p>
                      <span className="text-sunset-orange">* </span>
                      {message}
                    </p>
                  )}
                />
              </div>
            </div>
            <div className="pt-5">
              <div>
                Please list three 1 hour time blocks with your avalibility in
                the next week{" "}
              </div>
              <input
                {...register("availabilities")}
                className="h-8 w-full rounded-md px-2 py-2 text-black"
                placeholder="Include the date (mm-dd-yyyy), time (hh:mm am/pm), and your timezone"
              />
              <div className="text-sm">
                <ErrorMessage
                  errors={errors}
                  name="availabilities"
                  render={({ message }) => (
                    <p>
                      <span className="text-sunset-orange">* </span>
                      {message}
                    </p>
                  )}
                />
              </div>
            </div>
            <div className="pt-5">
              <div>What questions do you have for us? </div>
              <textarea
                {...register("questions")}
                className="h-8 w-full resize-y rounded-md px-2 py-1 align-top text-black"
              />
            </div>
          </div>
          <div className="grid place-items-center pt-8">
            <input
              type="submit"
              className="cursor-pointer items-center rounded-xl bg-white  px-4 py-2.5 text-center text-dark-teal hover:bg-[#E2E2E2]"
            />
            {formSubmitted === FormSubmission.SUBMITTED ? (
              <div className="pt-5 text-sm">
                Your form has been submitted. Our admin will be in touch with
                you soon!
              </div>
            ) : formSubmitted === FormSubmission.ERROR ? (
              <div className="pt-5 text-sm">
                There was an error processing your form. Please try again.
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewChapterForm;
