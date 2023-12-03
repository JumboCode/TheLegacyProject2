// import { batchCreateResources } from "@api/resources/route.client";
// import { batchCreateRequestSchema } from "@api/resources/route.schema";
// import Resource from "@components/ResourceTile";
// import { prisma } from "@server/db/client";

// export async function ServerAdminResourcesPage() {
//   const listResources = await prisma.resource.findMany();

//   console.log("here");
//   console.log(listResources);
//   return (
//     <div className="grid items-start gap-4 self-stretch md:grid-cols-2">
//       {" "}
//       {listResources.map((resource) => (
//         <Resource
//           key={resource.id}
//           title={resource.title}
//           role={resource.access}
//         />
//       ))}
//     </div>
//   );
// }
