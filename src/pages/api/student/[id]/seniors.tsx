import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { prisma } from "@server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
// TODO: add Zod verification

const seniors = async (req: NextApiRequest, res: NextApiResponse) => {
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

  if (userId != studentId && !admin) {
    res.status(500).json({
      error:
        "This route is protected. In order to access it, please sign in as admin.",
    });
    return;
  }

  switch (req.method) {
    case "GET":
      try {
        const student = await prisma.user.findUnique({
          where: {
            id: studentId,
          },
          include: {
            Seniors: true,
          },
        });

        if (!student) {
          res.status(404).json({
            error: `student with id ${studentId} not found`,
          });
          return;
        }

        res.status(200).json({ seniors: student.Seniors });
      } catch (error) {
        res.status(500).json({
          error: `failed to fetch student: ${error}`,
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

export default seniors;
