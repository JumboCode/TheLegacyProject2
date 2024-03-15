import { Approval } from "@prisma/client";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { prisma } from "@server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const student = async (req: NextApiRequest, res: NextApiResponse) => {
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
        /*
         * Retrieve information about a student
         */
        const student = await prisma.user.findUnique({
          where: {
            id: studentId, //get all information for given student
          },
        });

        if (!student) {
          res.status(404).json({
            error: `student with id ${studentId} not found`,
          });
          return;
        }

        res.status(200).json(student);
      } catch (error) {
        res.status(500).json({
          error: `failed to fetch student: ${error}`,
        });
      }
      break;

    case "PATCH":
      try {
        /*
         * Allow change of Student's Seniors if admin
         */
        const { admin } = (await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            admin: true, //return admin boolean field for given user id
          },
        })) ?? { admin: false };

        const studentSchema = z.object({
          SeniorIDs: z.array(z.string()),
        });
        const body = studentSchema.parse(JSON.parse(req.body));

        if (admin) {
          const student = await prisma.user.update({
            where: {
              id: studentId,
            },
            data: {
              ...body,
            },
          });

          res.status(200).json(student);
        } else {
          res.status(500).json({
            error:
              "This route is protected. In order to access it, please sign in as admin.",
          });
        }
      } catch (error) {
        res.status(500).json({
          error: `Failed to update student: ${error}`,
        });
      }
      break;

    case "DELETE":
      try {
        const { admin } = (await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            admin: true, //return admin boolean field for given user id
          },
        })) ?? { admin: false };

        if (admin) {
          const deleteStudent = await prisma.user.update({
            where: {
              id: studentId,
            },
            data: {
              approved: Approval.DENIED,
            },
          });

          res.status(200).json(deleteStudent);

          return;
        } else {
          res.status(500).json({
            error:
              "This route is protected. In order to access it, please sign in as admin.",
          });
          return;
        }
      } catch (error) {
        res.status(500).json({
          error: `Failed to delete student: ${error}`,
        });
      }

    default:
      res.status(500).json({
        error: `method ${req.method} not implemented`,
      });
      break;
  }
};

export default student;
