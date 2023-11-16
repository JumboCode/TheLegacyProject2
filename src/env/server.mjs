// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { serverSchema } from "./schema.mjs";
import { env as clientEnv, formatErrors } from "./client.mjs";

if (process.env.NODE_ENV === "test") {
  const variables = Object.keys(import.meta.env).filter((key) =>
    key.startsWith("VITE")
  );
  for (const variable of variables) {
    import.meta.env[variable.replace("VITE_", "")] = import.meta.env[variable];
  }
}

const _serverEnv = serverSchema.safeParse(
  process.env.NODE_ENV === "development" ? process.env : import.meta.env
);

if (!_serverEnv.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(_serverEnv.error.format())
  );
  throw new Error("Invalid environment variables");
}

for (let key of Object.keys(_serverEnv.data)) {
  if (key.startsWith("NEXT_PUBLIC_")) {
    console.warn("❌ You are exposing a server-side env-variable:", key);

    throw new Error("You are exposing a server-side env-variable");
  }
}

export const env = { ..._serverEnv.data, ...clientEnv };
