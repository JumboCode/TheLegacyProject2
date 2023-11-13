import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head />
      <body className="h-screen w-screen overscroll-none bg-off-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
export default Document;
