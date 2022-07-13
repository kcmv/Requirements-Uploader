import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import axios from "axios";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (_err, _req, res, _next) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (_req, res) => {
    res.status(404).end("Page is not found");
  },
});


handler.use(async (req, res, next) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json("Unauthorized");
  } else {
    next();
  }
});
handler.get(async (_req, res, _next) => {
  try {
    const { data } = await axios({
      url: `${process.env.API}/purpose`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.AUTHORIZATION}`,
      },
    });

    return res.status(200).json(data);
  } catch (error: any) {
    return res
      .status(error.response.data.statusCode)
      .json(error.response.data.message);
  }
});

export default handler;
