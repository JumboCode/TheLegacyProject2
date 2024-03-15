import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@sendgrid/client";

const subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = new Client();
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("No SendGrid API key variable in environment file.");
    }
    client.setApiKey(process.env.SENDGRID_API_KEY);

    const [subscribeRes, subscribeBody] = await client.request({
      method: "PUT",
      url: "/v3/marketing/contacts",
      body: {
        contacts: [{ email: req.body.to }],
      },
    });

    if (subscribeRes.statusCode != 220) {
      throw new Error("Validation error in submitting new email contact.");
    }

    // TODO: check for no-longer-pending import contacts status?
  } catch (error) {
    res.status(500).json(error);
  }

  res.status(200);
};

export default subscribe;
