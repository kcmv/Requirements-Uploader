import { getSession } from "next-auth/react";
import nc from "next-connect";
import { setHeaders } from "helpers/util";

const handler = nc({
  onError: (_err, _req, res, _next) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.statusCode(404).end("Page is not found");
  },
});

handler
  .use(async (req, res, next) => {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json("Unauthorized");
    } else {
      next();
    }
  })
  .get(async (req, res) => {
    const session = await getSession({ req });

    try {
      const profile = await fetch(`${process.env.NEXT_PUBLIC_PROFILE}`, {
        ...setHeaders(session.user.accessToken)
      });
      const data = await profile.json();
      return res.status(200).json(data);
    } catch (error) {
      return res
      .status(error.response.data.statusCode)
      .json(error.response.data.message);
    }
  });

export default handler;
