import { env } from "@env/server.mjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User } from "@prisma/client";
import { prisma } from "@server/db/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_API_SCOPE = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.appfolder",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.resource",
  "https://www.googleapis.com/auth/documents",
  "https://www.googleapis.com/auth/documents.readonly",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
  "openid",
];

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
          scope: GOOGLE_API_SCOPE.join(" "),
        },
      },
      profile: (profile) => {
        return {
          id: profile.sub,
          email: profile.email,
          image: profile.picture,
          name: profile.name,
          firstName: profile.given_name,
          lastName: profile.family_name,
          emailVerified: profile.email_verified,
        } as User;
      },
    }),
  ],

  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
        session.user.ChapterID = user.ChapterID;
        session.user.name = user.firstName + " " + user.lastName;
      }
      return session;
    },
  },

  events: {
    signIn: async ({ user, profile, isNewUser }) => {
      if (profile != undefined && isNewUser) {
        await prisma.user.update({
          where: { id: user.id },
          data: { firstName: profile.firstName, lastName: profile.lastName },
        });
      }
      return;
    },
  },
  // @TODO(nickbar01234) - Update session on client side
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
