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

const headers = {
  headers: {
    Authorization: `Bearer ${process.env.AUTHORIZATION}`,
  },
};

handler
  .use(async (req, res, next) => {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json("Unauthorized");
    } else {
      next();
    }
  })
  .get(async (req, res, _next) => {
    const session: any = await getSession({ req });

    try {
      const { data } = await axios({
        url: `${process.env.COE_API}/employee-requests/employee_purpose/${session.user.user.employee_no}`,
        method: "GET",
        ...headers,
      });
      return res.status(200).json(data);
    } catch (error: any) {
      return res
        .status(error.response.data.statusCode)
        .json(error.response.data.message);
    }
  })
  .post(async (req, res, _next) => {
    const session: any = await getSession({ req });
    const { employee_no, email } = session.user.user;

    try {
      const { password, answers, purpose_id, withCompensation, emailToUse } = req.body;
      const { data } = await axios({
        url: `${process.env.API}/employee-requests`,
        method: "POST",
        data: {
          employee_no,
          email,
          withCompensation,
          password,
          answers,
          purpose_id,
          emailToUse
        },
        ...headers,
      });

      return res.status(200).json(data);
    } catch (error: any) {
      return res
        .status(error.response.data.statusCode)
        .json(error.response.data.message);
    }
  });

export default handler;
