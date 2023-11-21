import { redirect } from "next/navigation";

const Page = () => {
  // Added for backward compatibility.
  // Client shares the application url from the root
  redirect("/public");
};

export default Page;
