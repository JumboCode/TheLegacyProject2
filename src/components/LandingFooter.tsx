"use client";
import React, { FormEvent, FocusEvent, useState } from "react";
import { EmailResponse } from "@api/emails/route.schema";

const LandingFooter = () => {
  const [email, setEmail] = useState<string>("");
  const [eList, setEList] = useState<Set<string>>(new Set<string>());

  const [buttonText, setButtonText] = useState<string>("Join E-List");
  const [buttonStyle, setButtonStyle] = useState<string>(
    "bg-dark-teal hover:-translate-y-0.5"
  );

  function resetButton(target: FocusEvent<HTMLInputElement>) {
    setButtonStyle("bg-dark-teal hover:-translate-y-0.5");
    setButtonText("Join E-List");
  }

  const onEmailSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // if box isn't empty and content is a valid email, add it to the set

    if (email) {
      eList.add(email);
      setEList(eList);

      // use SendGrid 'subscribe' route to send a test email
      const res = await fetch("/api/emails", {
        body: JSON.stringify({ email: email }),
        method: "POST",
      });

      const responseObject = EmailResponse.parse(await res.json());
      if (responseObject.code == "INVALID_EMAIL") {
        setButtonText("Invalid Email");
        setButtonStyle("bg-tag-rust"); // no hover
        return;
      } else if (responseObject.code == "DUPLICATE_EMAIL") {
        setButtonText("Duplicate Email");
        setButtonStyle("bg-tag-rust"); // no hover
        return;
      }

      setButtonText("Subscribed!");
      setButtonStyle("bg-dark-teal"); // no hover
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
    </div>
  );
};

export default LandingFooter;
