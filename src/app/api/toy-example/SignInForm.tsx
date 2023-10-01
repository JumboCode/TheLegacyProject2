import React from "react";
import { SignInResponse } from "./route.schema";

const SignInForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignUp = async () => {
    // When users signup, make an POST API request to the server
    const res = await fetch("/api/signup/", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    });
    const responseObject = SignInResponse.parse(await res.json());

    // The status code will help TypeScript to determine the type of message
    if (responseObject.code === "SUCCESS") {
      // TypeScript tells us that message is "The new user was successfully
      // registered" when you hover over res.message
      responseObject.message;
    } else if (responseObject.code === "EMAIL_EXIST") {
      // TypeScript tells us that message is "The email existed already" when you hover over res.message
      responseObject.message;
    }
  };

  return (
    <form>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" value="Submit" onClick={onSignUp} />
    </form>
  );
};

export default SignInForm;
