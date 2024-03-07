import { Approval } from "@prisma/client";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { prisma } from "@server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import drive from "../../drive/drive";

const approve = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session || !session.user) {
    res.status(401).json({
      error: "This route is protected. In order to access it, please sign in.",
    });
    return;
  }

  const { id: studentId } = req.query;
  if (typeof studentId !== "string") {
    res.status(500).json({
      error: `studentId must be a string`,
    });
    return;
  }

  const userId = session.user.id;

  const { admin } = (await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      admin: true, //return admin boolean field for given user id
    },
  })) ?? { admin: false };

  if (!admin) {
    res.status(500).json({
      error:
        "This route is protected. In order to access it, please sign in as admin.",
    });
    return;
  }

  switch (req.method) {
    case "POST":
      try {
        /*
         * Retrieve information about a student
         */
        const student = await prisma.user.update({
          where: {
            id: studentId,
          },
          data: {
            approved: Approval.APPROVED,
          },
        });

        if (!student) {
          res.status(404).json({
            error: `student with id ${studentId} not found`,
          });
          return;
        }

        const permission = {
          type: "user",
          role: "writer",
          emailAddress: student.email,
        };

        const baseFolder = "1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a"; // TODO: make env variable

        const service = await drive(req, res);
        const permData = {
          resource: permission,
          fileId: baseFolder,
          fields: "id",
        };
        await (service as NonNullable<typeof service>).permissions.create(
          permData
        );

        res.status(200).json(student);
      } catch (error) {
        res.status(500).json({
          error: `failed to update student: ${error}`,
        });
      }
      break;

    default:
      res.status(500).json({
        error: `method ${req.method} not implemented`,
      });
      break;
  }
};

export default approve;
