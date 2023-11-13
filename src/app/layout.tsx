import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "src/context/SessionProvider";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Merriweather } from "next/font/google";

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
 */
const merriweather = Merriweather({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const RootLayout = async ({ children }: IRootLayout) => {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${merriweather.className} h-screen w-screen items-center overscroll-none bg-white`}
        >
          {children}
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
