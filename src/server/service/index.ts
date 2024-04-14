import { google } from "googleapis";
import { env } from "@env/server.mjs";

export const driveV3 = google.drive({
  version: "v3",
  auth: new google.auth.GoogleAuth({
    credentials: {
      client_email: env.GOOGLE_CLIENT_EMAIL,
      private_key: env.GOOGLE_PRIVATE_KEY,
    },
    scopes: ["https://www.googleapis.com/auth/drive"],
  }),
});
