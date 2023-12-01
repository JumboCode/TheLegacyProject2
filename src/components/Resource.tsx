import { prisma } from "@server/db/client";

type ResourceProp = {
  title: string;
  role: string[];
};

// type ResourceProp = {
//   resource: prisma;
// };

const Resource = ({ title, role }: ResourceProp) => {
  return <div className="w-full rounded-lg bg-white p-6">title</div>;
};

export default Resource;
