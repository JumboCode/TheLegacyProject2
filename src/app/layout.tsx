import "../styles/globals.css";

import { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "src/context/SessionProvider";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Inter } from "next/font/google";
import Navbar from "@components/Navbar";

interface IRootLayout {
  children: React.ReactNode;
}

/**
 * Define the default head tag metadata.
 *
 * @link {https://nextjs.org/docs/app/building-your-application/optimizing/metadata}
 * @todo Add metadata for SEO optimizations
 */
export const metadata: Metadata = {
  title: "The Legacy Project",
};

/**
 * Define default font.
 *
 * @link {https://nextjs.org/docs/app/building-your-application/optimizing/fonts}
 * @todo Talk with Gayatri to get new font
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const RootLayout = async ({ children }: IRootLayout) => {
  const session = await getServerSession(authOptions);

  // TODO(nickbar01234) - Port private component Sidebar from _app.tsx
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${inter.className} flex h-full w-full flex-col items-center overscroll-none bg-white`}
        >
          <Navbar displayName="public" />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
