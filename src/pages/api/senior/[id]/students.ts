import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { z } from "zod";

const students = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session || !session.user) {
    res.status(401).json({
      error: "This route is protected. In order to access it, please sign in.",
    });
    return;
  }

  const seniorID = z.string().parse(req.query.id);

  if (typeof seniorID !== "string") {
    res.status(500).json({
      error: `SeniorID must be a string`,
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
    case "GET":
      try {
        const result = await prisma.senior.findUnique({
          where: {
            id: seniorID,
          },
          include: {
            Students: true,
          },
        });

        if (!result) {
          res.status(404).json({
            error: `Senior with id ${seniorID} not found`,
          });
          return;
        }

        res.status(200).json({ students: result.Students });
      } catch (error) {
        res.status(500).json({
          error: `Failed to fetch students: ${error}`,
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

export default students;
