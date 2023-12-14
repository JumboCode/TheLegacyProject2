import { User as PrismaUser } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * We use PrismaAdapter to populate next-auth User object according to our prisma schema.
   */
  type User = PrismaUser;

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: Pick<User, "id" | "role" | "ChapterID"> & DefaultSession["user"];
  }

  /**
   * Returned by GoogleProvider `profile()` method.
   */
  interface Profile {
    firstName: string;
    lastName: string;
  }
}
