"use client";
import React, { FormEvent, FocusEvent, useState } from "react";
import FlowerBox from "@components/FlowerBox";

const LandingFooter = () => {
  const [email, setEmail] = useState<string>("");
  const [eList, setEList] = useState<Set<string>>(new Set<string>());

  const [buttonText, setButtonText] = useState<string>("Join Us");
  const [buttonStyle, setButtonStyle] = useState<string>(
    "bg-teal hover:bg-dark-teal hover:-translate-y-0.5"
  );

  function resetButton(target: FocusEvent<HTMLInputElement>) {
    setButtonStyle("bg-teal hover:bg-dark-teal hover:-translate-y-0.5");
    setButtonText("Join Us");
  }

  const onEmailSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const pattern = [
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))",
      "+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
    ].join();

    const validEmailRegex = new RegExp(pattern);
    // if box isn't empty and content is a valid email, add it to the set

    if (email && validEmailRegex.test(email)) {
      eList.add(email);
      setEList(eList);

      // use SendGrid 'subscribe' route to send a test email
      const res = await fetch("/api/sendgrid/subscribe", {
        body: JSON.stringify({ to: email }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        console.log(error);
        setButtonText("Invalid Email");
        setButtonStyle("bg-light-rust"); // no hover
        return;
      }

      setButtonText("Subscribed!");
      setButtonStyle("bg-light-teal"); // no hover
    } else {
      setButtonText("Invalid Email");
      setButtonStyle("bg-light-rust"); // no hover
    }
  };

  return (
    <div className="mb-[40px]">
      <FlowerBox>
        <p className="self-center font-serif text-3xl font-semibold xl:text-4xl">
          There are millions of stories waiting to be told. It&apos;s your
          moment to change that.
        </p>
        <p className="w-3/4 self-center font-serif text-lg">
          Leave a lasting legacy on your college or university campus by
          founding a chapter of The Legacy Project at your school today. Join
          our E-List below for updates.
        </p>
        <form
          className="mx-auto flex w-3/4 flex-col justify-center gap-[20px] sm:flex-row"
          method="post"
          onSubmit={onEmailSubmit}
        >
          <input
            className="text-dark \ relative h-[40px] rounded border-2 border-offer-white bg-off-white
                                px-[10px] focus:border-light-teal focus:outline-none sm:w-3/4"
            name="email"
            placeholder="hello@thelegacyproj.org"
            onFocus={resetButton}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <button
            className={`h-[40px] w-auto ${buttonStyle} rounded duration-150`}
            type="submit"
          >
            <span className="align-center text-md m-[10px] w-auto font-serif tracking-easy text-white">
              {buttonText}
            </span>
          </button>
        </form>
      </FlowerBox>
    </div>
  );
};

export default LandingFooter;
