import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import {
  StorageSharedKeyCredential,
  BlobServiceClient,
} from "@azure/storage-blob";
import nc from "next-connect";
import multer from "multer";
import path from "path";
import axios from "axios";
import { setHeaders } from "helpers/util";
var fs = require("fs");

const containerName = process.env.AZURESTORAGE_CONTAINER_NAME as string;
const STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const ACCOUNT_ACCESS_KEY = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;

const credentials = new StorageSharedKeyCredential(
  STORAGE_ACCOUNT_NAME as string,
  ACCOUNT_ACCESS_KEY as string
);

export const config = {
  api: {
    bodyParser: false,
  },
};

const deleteUploads = (path: string, name: string) => {
  fs.unlink(path, function (err: any) {
    if (err) throw err;
    // if no error, file has been deleted successfully
    console.log(`File ${name} deleted from local storage.`);
  });
};

const azureStorageUpload = async (req: any) => {
  const blobServiceClient = new BlobServiceClient(
    `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
    credentials
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);
  try {
    const content = req.path;
    const blobName = req.filename;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const blobOptions = {
      blobHTTPHeaders: { blobContentType: req.mimetype },
    };
    const uploadBlobResponse = await blockBlobClient.uploadFile(
      content,
      blobOptions
    );

    console.log(
      `Upload block blob ${blobName} successfully`,
      uploadBlobResponse.requestId
    );

    if (!uploadBlobResponse.requestId) {
      return false;
    } else {
      return true;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

let storage = multer.diskStorage({
  destination: function (_req: any, _file: any, cb: Function) {
    cb(null, "public");
  },
  filename: async function (req: any, file: any, cb: Function) {
    const session: any = await getSession({ req });

    cb(
      null,
      session.user.user.employee_no +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

let upload = multer({
  storage: storage,
});

let uploadFile = upload.single("file");

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (_err, _req, res, _next) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (_req, res) => {
    res.status(404).end("Page is not found");
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
    const session: any = await getSession({ req });
    try {
      const { data } = await axios({
        url: `${process.env.API}/user-documents/user/${session.user.user.user_id}`,
        method: "GET",
        ...setHeaders(session.user.accessToken),
      });

      return res.status(200).json(data);
    } catch (error: any) {
      return res
        .status(error.response.data.statusCode)
        .json(error.response.data.message);
    }
  })
  .use(uploadFile)
  .patch(async (req: any, res: NextApiResponse) => {
    const session: any = await getSession({ req });

    try {
      const { id } = req.body;

      const document_link = process.env.AZURESTORAGE_ORIGIN + req.file.filename;

      const { data } = await axios({
        method: "PATCH",
        url: `${process.env.API}/user-documents/${session.user.user.user_id}`,
        ...setHeaders(session.user.accessToken),
        data: {
          id,
          document_link,
        },
      });

      const isUploadSuccess = await azureStorageUpload(req.file);

      deleteUploads(req.file.path, req.file.filename);

      if (!isUploadSuccess) {
        return res
          .status(500)
          .json("Error: Uploading file to Azure Error: API_BlobStorage");
      } else {
        res.status(200).json(data);
      }
    } catch (error: any) {
      return res
        .status(error.response.data.statusCode)
        .json(error.response.data.message);
    }
  });

export default handler;
