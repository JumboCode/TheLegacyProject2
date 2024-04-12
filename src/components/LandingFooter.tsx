"use client";
import React, { FormEvent, FocusEvent, useState } from "react";
import { useApiThrottle } from "@hooks";
import { createEmailRequest } from "@api/emails/route.client";
import { Spinner } from "./skeleton";

const LandingFooter = () => {
  const [email, setEmail] = useState<string>("");

  const [buttonText, setButtonText] = useState<string>("Join E-List");
  const [buttonStyle, setButtonStyle] = useState<string>(
    "bg-dark-teal hover:-translate-y-0.5"
  );

  const { fetching, fn: throttleCreateEmailRequest } = useApiThrottle({
    fn: createEmailRequest,
    callback: (responseObject) => {
      if (responseObject.code === "INVALID_EMAIL") {
        setButtonText("Invalid Email");
        setButtonStyle("bg-tag-rust"); // no hover
        return;
      } else if (responseObject.code === "DUPLICATE_EMAIL") {
        setButtonText("Duplicate Email");
        setButtonStyle("bg-tag-rust"); // no hover
        return;
      }

      setButtonText("Subscribed!");
      setButtonStyle("bg-dark-teal"); // no hover
    },
  });

  function resetButton(target: FocusEvent<HTMLInputElement>) {
    setButtonStyle("bg-dark-teal hover:-translate-y-0.5");
    setButtonText("Join E-List");
  }

  const onEmailSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (email !== "") {
      await throttleCreateEmailRequest({ body: { email: email } });
    } else {
      setButtonText("Invalid Email");
      setButtonStyle("bg-tag-rust"); // no hover
    }
  };

  return (
    <div className="relative z-10 flex flex-col content-center items-center gap-y-8 overflow-hidden rounded bg-[#E7DCD0] px-12 py-16 text-center shadow-md shadow-gray-500">
      <div className="flex flex-col gap-y-3 text-2xl font-extrabold">
        <p>There are millions of stories waiting to be told.</p>
        <p>It&apos;s your time to change that.</p>
      </div>
      <div className="flex flex-col gap-y-3 text-lg text-[#232323] text-opacity-80">
        <p>
          Join an ever-growing network of college students across the country
          passionate about preserving generational legacies.
        </p>
        <p>
          Sign up for our E-List to stay up to date on what The Legacy Project
          is doing:
        </p>
      </div>
      {!fetching ? (
        <form
          className="mx-auto flex w-3/4 flex-col justify-center gap-[20px] md:flex-row"
          method="post"
          onSubmit={onEmailSubmit}
          autoComplete="off"
        >
          <input
            className="text-gray relative h-[60px] rounded-xl bg-white px-4
                                 placeholder-dark-gray shadow-md focus:border-dark-teal focus:outline-none md:w-3/4"
            name="email"
            placeholder="Enter your e-mail address"
            onFocus={resetButton}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <button
            className={`${buttonStyle} w-auto rounded-xl px-4 py-4 duration-150`}
            type="submit"
          >
            <span className="align-center text-white">{buttonText}</span>
          </button>
        </form>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default LandingFooter;
