# Developing RESTful API

Hello, aspiring backend developers. In this tutorial, I will walk you through the design process for a RESTful API route.
There are multiple approaches to design an effective API. The approach that I will be showing you is highly opionated.

## A Gentle Introduction

RESTful API is a paradigm for client-server interaction using HTTP requests. The client makes a network request to the
server with specified urls, such as `localhost:3000/api/login` and the server performs an action. The client can specify what action to perform by specifying a [HTTP verb](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). For the scope of this tutorial, I will discuss about RESTful API as a paradigm to perform
[CRUD operations](https://www.crowdstrike.com/cybersecurity-101/observability/crud/), meaning that it is used to interact with records in our database. The convention is as follow:

- `GET` retrieve record(s) from the database
- `POST` adds record(s) to the database
- `PUT` updates existing record(s) in the database
- `DELETE` removes record(s) from the database

Suppose I want to design an API for professors to manage students' information. I may want to implement the following routes:

1. `GET /api/students` to retrieve a list of every students that I have,
2. `GET /api/students/[id]` to retrieve information for a specific student with the given `id`,
3. `POST /api/students` to add a new student to the database,
4. `PATCH /api/students/[id]` to update information for a specific student with the given `id`.

As the developer of the API routes, you get to make the contract between the client and the server. In other words, you're telling the client "when url `X` is entered with HTTP verb `Y`, the server will perform action `Z`". Therefore, it's equally valid to design the abovementioned example with:

1. `GET /api/getAllStudents`,
2. `GET /api/getStudentByID`,
3. `POST /api/createStudent`,
4. `PATCH /api/updateStudentByID`.

I opt-in for the first approach whenever possible; the segments of the API route
specifies the collections that they interact with and the HTTP verb dictates
what action to perform on these collections. I think this approach is more
intuitive and maintainable for _other programmers_ on your team (and your future
self).

## A Toy Example

I will now guide you through the process of designing an API route for users to create a new account with an application.

I've also included the source code and comments within the directory. We will be using TypeScript, [Zod](https://zod.dev/), and [Next.js 13](https://nextjs.org/docs). I will assume that you have basic understanding of TypeScript and React.

A quick note: You will see instructions to "hover your mouse" throughout the tutorial; in that case,
you should open the file containing the source code in VSCode and place your mouse on the variable of interest.

### Specifying The Contract

We will first determine the input and output specifications when a new user sign up. In practice, the constraints is context-dependent.

In our example, we will define the following contraints:

1. Users sign up with a valid `email` and `password`,
2. An error is returned if the chosen `email` already exists,
3. The password needs to be at least 5 characters long,

The request body will contain the new user's `email` and `password`, and the response body will contain a code specifying the result of the request and a message to explain the code.

We will use the specifications to write schemas with `Zod` to validate the input and output.

```ts
// route.schema.ts

import { z } from "zod";

export const SignInRequest = z.object({
  email: z.string().email({ message: "Username must be an email" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});

/*
 * z.object is similar to a struct in C or C++. Esentially, it's a "bundle of variables" that you can access and use.
 */
export const SignInResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
    message: z.literal("The new user was successfully registered"),
  }),

  z.object({
    code: z.literal("EMAIL_EXIST"),
    message: z.literal("The email existed already"),
  }),

  z.object({
    code: z.literal("INVALID_EMAIL"),
    message: z.literal("The email is invalid"),
  }),

  z.object({
    code: z.literal("INVALID_PASSWORD"),
    message: z.literal("The password is invalid"),
  }),

  z.object({
    code: z.literal("UNKNOWN"),
    data: z.any(),
  }),
]);
```

I hope the `SignInRequest` is intuitive. The `SignInResponse` is slightly more complex, but I will explain the motivation. From the specifications, we can determine 4 outcomes when a new user sign up:

1. The user successfully registered (`SUCCESS`),
2. The email already existed (`EMAIL_EXIST`),
3. The email is improperly formatted (`INVALID_EMAIL`),
4. The password is improperly formatted (`INVALID_PASSWORD`).

We added the 5th case (`UNKNOWN`) as a catch-all for unanticipated errors - such
as network or database error. Instead of creating 5 different `z.object`, we use
[discriminated
unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
to differentiate between the cases. Discriminated union is a complex TypeScript
feature, which we will not do a deep-dive on. At a high level, it enforces type
safety. In the context of web development, this means that frontend developers
can safely work with the response from the server. Hopefully, the next example will demonstrate how powerful discriminate unions are.

```tsx
// SignInForm.tsx

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
      // registered" when your mouse hovers over res.message
      responseObject.message;
    } else if (responseObject.code === "EMAIL_EXIST") {
      // TypeScript tells us that message is "The email existed already" when your mouse hovers over res.message
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
```

### Why Bother?

You may wonder why are we spending so much time on the specifications?

#### Writing Good Software

Determining the expected input and output helps us think about edge cases and
write "carefully considered" code - think of your experience in COMP15 and
COMP40!

#### Work Parallelization

By specifying the schemas ahead, frontend developers can start using your API before you finished implementing it!

Below is the full snippet of the code. There's a lot of code, but don't fret! I want you to focus on the function `signUp` and take away the following:

1. When you hover over `Request`, you will notice that the body is well-defined. Frontend developers will know exactly the parameters to provide when calling your API,
2. When you hover over `signUp`, you will notice that the return value is well-defined,
3. Finally, frontend developers can choose to pass the parameter for `mock` to get mocked data for a specific scenario.

```ts
// route.client.ts

import { z } from "zod";
import { SignInRequest, SignInResponse } from "./route.schema";

type ISignInRequest = z.infer<typeof SignInRequest>;

type ISignInResponse = z.infer<typeof SignInResponse>;

type SignInResponseCode = z.infer<typeof SignInResponse>["code"];

interface IRequest extends Omit<RequestInit, "body"> {
  body: ISignInRequest;
}

const MOCK_SUCCESS: ISignInResponse = {
  code: "SUCCESS",
  message: "The new user was successfully registered",
};

const MOCK_EMAIL_EXIST: ISignInResponse = {
  code: "EMAIL_EXIST",
  message: "The email existed already",
};

const MOCK_INVALID_EMAIL: ISignInResponse = {
  code: "INVALID_EMAIL",
  message: "The email is invalid",
};

const MOCK_INVALID_PASSWORD: ISignInResponse = {
  code: "INVALID_PASSWORD",
  message: "The password is invalid",
};

export const signUp = async (request: IRequest, mock?: SignInResponseCode) => {
  if (mock === "SUCCESS") {
    return SignInResponse.parse(MOCK_SUCCESS);
  } else if (mock === "EMAIL_EXIST") {
    return SignInResponse.parse(MOCK_EMAIL_EXIST);
  } else if (mock === "INVALID_EMAIL") {
    return SignInResponse.parse(MOCK_INVALID_EMAIL);
  } else if (mock === "INVALID_PASSWORD") {
    return SignInResponse.parse(MOCK_INVALID_PASSWORD);
  }

  const { body, ...options } = request;
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();

  return SignInResponse.parse(json);
};
```

Every API route you write should be accompanied by a corresponding client function. This workflow allows frontend developers to work on their beautiful UI and not have to worry about:

1. The correct API url or HTTP method; you may opt-in for a different route or method without having to fix all frontend-code that depends on it,
2. Frontend developers do not have to spend any effort to process the response type, leading to "cleaner" frontend code.

### Implementing The API Route

Ok, onto the fun part 😅.

Next.js 13 requires [API routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) to be placed inside a `route.ts` file. For example, if you have `api/toy-example/route.ts`, then the corresponding API url is `/api/toy-example`.

We will create a fake database to interact with. In practice, you will have to connect to an external database service, such as [MongoDb](https://www.mongodb.com/).

```ts
// route.ts

// Import statements...

const DATABASE = [
  {
    email: "nicky@gmail.com",
    password: "Hello",
  },
  {
    email: "kim@gmail.com",
    password: "World",
  },
];

// Implementation...
```

Our sign up API route will use `POST` method, because it will add a new entry to the database. To implement a handler (function) for `POST` method, we will export a function named `POST`.

```ts
// route.ts

// Import statements...
// Database

export const POST = (request: NextRequest) => {
  // Implementation
};
```

We will first verify that the request contains the expected body.

```ts
// route.ts

// Import statements...
// Database

export const POST = async (request: NextRequest) => {
  // safeParse prevents an error from being thrown.
  const maybeBody = SignInRequest.safeParse(await request.json());

  if (!maybeBody.success) {
    // Check which field fails the schema.
    const error = maybeBody.error.format();
    if (error.email) {
      return NextResponse.json(
        SignInResponse.parse({
          code: "INVALID_EMAIL",
          message: "The email is invalid",
        }),
        { status: 400 }
      );
    } else if (error.password) {
      return NextResponse.json(
        SignInResponse.parse({
          code: "INVALID_PASSWORD",
          message: "The password is invalid",
        }),
        { status: 400 }
      );
    } else {
      // When we add new fields to the schema, we may forget to handle it
      // in the API route. This last case serves a catch-all.
      return NextResponse.json(
        SignInResponse.parse({
          code: "UNKNOWN",
          data: "Forgot to handle an error",
        }),
        { status: 500 }
      );
    }
  } else {
    // Successful parse...
  }
};
```

If the request body is successfully parsed, we can check whether the email is unique.

```ts
// route.ts

// Import statements...
// Database

export const POST = async (request: NextRequest) => {
  // safeParse prevents an error from being thrown.
  const maybeBody = SignInRequest.safeParse(await request.json());

  if (!maybeBody.success) {
    // Check which field fails the schema...
  } else {
    const body = maybeBody.data;

    // Checks if email is unique.
    const hasSameEmail = DATABASE.some((user) => user.email === body.email);
    if (hasSameEmail) {
      return NextResponse.json(
        SignInResponse.parse({
          code: "EMAIL_EXIST",
          message: "The email existed already",
        }),
        { status: 400 }
      );
    }
  }
};
```

If the new user's email is unique, we can safely add it to our database and returns a success status.

```ts
// route.ts

// Import statements...
// Database

export const POST = async (request: NextRequest) => {
  // safeParse prevents an error from being thrown.
  const maybeBody = SignInRequest.safeParse(await request.json());

  if (!maybeBody.success) {
    // Check which field fails the schema...
  } else {
    const body = maybeBody.data;

    // Checks if email is unique.
    const hasSameEmail = DATABASE.some((user) => user.email === body.email);
    if (hasSameEmail) {
      // ...
    }

    // Add user to database and return success.
    DATABASE.push(body);
    return NextResponse.json(
      SignInResponse.parse({
        code: "SUCCESS",
        message: "The new user was successfully registered",
      }),
      { status: 200 }
    );
  }
};
```

That's it. The final step is to test your API route - either through the web app or [Postman](https://www.postman.com/). Congrats on making it here 😁! I hope you've learned something new and feel somewhat more prepared for backend development.
