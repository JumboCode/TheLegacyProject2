"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChapterRequest } from "src/app/api/chapter-request/route.schema";
import { ErrorMessage } from "@hookform/error-message";
import { createChapterRequest } from "@api/chapter-request/route.client";
import { useApiThrottle } from "@hooks";
import { Spinner } from "./skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";

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

  const { fetching, fn: throttleCreateChapterRequest } = useApiThrottle({
    fn: createChapterRequest,
    callback: (res) =>
      setFormSubmitted(
        res.code === "SUCCESS" ? FormSubmission.SUBMITTED : FormSubmission.ERROR
      ),
  });

  const onSubmit: SubmitHandler<z.infer<typeof ChapterRequest>> = async (
    data,
    event
  ) => {
    event?.preventDefault();
    //TODO(nickbar01234): revisit all possible return/calls
    // i.e - If duplicated email, show a different message.
    throttleCreateChapterRequest({ body: data });
  };

  const resetForm = () => setFormSubmitted(FormSubmission.NOT_SUBMITTED);

  return (
    <div className="grid place-items-center">
      <div className="w-full rounded-md bg-dark-teal px-9 py-10 text-lg text-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            <div className="col-span-2 flex w-full flex-col gap-y-1 md:col-span-1">
              <div>First Name</div>
              <input
                {...register("firstName", { onChange: resetForm })}
                className="h-8 w-full rounded-md px-2 py-2 text-black"
              />
              <ErrorMessage
                errors={errors}
                name="firstName"
                render={({ message }) => (
                  <p className="flex items-center gap-x-1 text-sm">
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="text-sunset-orange"
                      size="xs"
                    />
                    <p>{message}</p>
                  </p>
                )}
              />
            </div>
            <div className="col-span-2 flex w-full flex-col gap-y-1 md:col-span-1">
              <div>Last Name</div>
              <input
                {...register("lastName", { onChange: resetForm })}
                className="h-8 w-full rounded-md px-2 py-2 text-black"
              />
              <ErrorMessage
                errors={errors}
                name="lastName"
                render={({ message }) => (
                  <p className="flex items-center gap-x-1 text-sm">
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="text-sunset-orange"
                      size="xs"
                    />
                    <p>{message}</p>
                  </p>
                )}
              />
            </div>
            <div className="col-span-2 flex w-full flex-col gap-y-1 md:col-span-1">
              <div>University Email</div>
              <input
                {...register("universityEmail", { onChange: resetForm })}
                className="h-8 w-full rounded-md px-2 py-2 text-black"
              />
              <ErrorMessage
                errors={errors}
                name="universityEmail"
                render={({ message }) => (
                  <p className="flex items-center gap-x-1 text-sm">
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="text-sunset-orange"
                      size="xs"
                    />
                    <p>{message}</p>
                  </p>
                )}
              />
            </div>
            <div className="col-span-2 flex w-full flex-col gap-y-1 md:col-span-1">
              <div>Phone Number</div>
              <input
                {...register("phoneNumber", { onChange: resetForm })}
                className="h-8 w-full rounded-md px-2 py-2 text-black"
              />
              <ErrorMessage
                errors={errors}
                name="phoneNumber"
                render={({ message }) => (
                  <p className="flex items-center gap-x-1 text-sm">
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="text-sunset-orange"
                      size="xs"
                    />
                    <p>{message}</p>
                  </p>
                )}
              />
            </div>
            <div className="col-span-2 flex w-full flex-col gap-y-1 md:col-span-1">
              <div>College / University</div>
              <input
                {...register("university", { onChange: resetForm })}
                className="h-8 w-full rounded-md px-2 py-2 text-black"
              />
              <ErrorMessage
                errors={errors}
                name="university"
                render={({ message }) => (
                  <p className="flex items-center gap-x-1 text-sm">
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="text-sunset-orange"
                      size="xs"
                    />
                    <p>{message}</p>
                  </p>
                )}
              />
            </div>
            <div className="col-span-2 flex w-full flex-col gap-y-1 md:col-span-1">
              <div>College / University Address</div>
              <input
                {...register("universityAddress", { onChange: resetForm })}
                className="h-8 w-full rounded-md px-2 py-2 text-black"
              />
              <ErrorMessage
                errors={errors}
                name="universityAddress"
                render={({ message }) => (
                  <p className="flex items-center gap-x-1 text-sm">
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="text-sunset-orange"
                      size="xs"
                    />
                    <p>{message}</p>
                  </p>
                )}
              />
            </div>
          </div>
          <div className="pt-5">
            <div className="flex flex-col gap-y-1">
              <div>
                Do you have any experience in student leadership / club
                organization / storytelling?
              </div>
              <textarea
                {...register("leadershipExperience", { onChange: resetForm })}
                className="h-18 w-full resize-none rounded-md px-2 py-2 align-top text-black"
              />
              <ErrorMessage
                errors={errors}
                name="leadershipExperience"
                render={({ message }) => (
                  <p className="flex items-center gap-x-1 text-sm">
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="text-sunset-orange"
                      size="xs"
                    />
                    <p>{message}</p>
                  </p>
                )}
              />
            </div>
            <div className="flex flex-col gap-y-1 pt-5">
              <div>
                What motivates you to start this initiative in your community?{" "}
              </div>
              <textarea
                {...register("motivation", { onChange: resetForm })}
                className="h-18 w-full resize-none rounded-md px-2 py-2 align-top text-black"
              />
              <ErrorMessage
                errors={errors}
                name="motivation"
                render={({ message }) => (
                  <p className="flex items-center gap-x-1 text-sm">
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="text-sunset-orange"
                      size="xs"
                    />
                    <p>{message}</p>
                  </p>
                )}
              />
            </div>
            <div className="flex flex-col gap-y-1 pt-5">
              <div>
                Please list three 1 hour time blocks with your avalibility in
                the next week{" "}
              </div>
              <input
                {...register("availabilities", { onChange: resetForm })}
                className="h-8 w-full rounded-md px-2 py-2 text-black"
                placeholder="Include the date (mm-dd-yyyy), time (hh:mm am/pm), and your timezone"
              />
              <ErrorMessage
                errors={errors}
                name="availabilities"
                render={({ message }) => (
                  <p className="flex items-center gap-x-1 text-sm">
                    <FontAwesomeIcon
                      icon={faAsterisk}
                      className="text-sunset-orange"
                      size="xs"
                    />
                    <p>{message}</p>
                  </p>
                )}
              />
            </div>
            <div className="flex flex-col gap-y-1 pt-5">
              <div>What questions do you have for us? </div>
              <textarea
                {...register("questions", { onChange: resetForm })}
                className="h-12 w-full resize-none rounded-md px-2 py-1 align-top text-black"
              />
            </div>
          </div>
          <div className="grid place-items-center pt-8">
            {!fetching ? (
              <input
                type="submit"
                className="cursor-pointer items-center rounded-xl bg-white  px-4 py-2.5 text-center text-dark-teal hover:bg-[#E2E2E2]"
              />
            ) : (
              <Spinner width={12} height={12} />
            )}
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
