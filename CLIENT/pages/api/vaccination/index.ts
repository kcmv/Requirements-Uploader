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
import { setHeaders } from "helpers";
var fs = require("fs");

const containerName = process.env.AZURESTORAGE_CONTAINER_NAME as string;
const STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const ACCOUNT_ACCESS_KEY = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;

const credentials = new StorageSharedKeyCredential(
  STORAGE_ACCOUNT_NAME as string,
  ACCOUNT_ACCESS_KEY as string
);

const blobServiceClient = new BlobServiceClient(
  `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  credentials
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

const deleteBlob = async (blobName: string) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  // include: Delete the base blob and all of its snapshots.
  // only: Delete only the blob's snapshots and not the blob itself.
  const options: any = {
    deleteSnapshots: "include", // or 'only'
  };

  // Create blob client from container client
  const blockBlobClient = await containerClient.getBlockBlobClient(blobName);

  // console.log(blockBlobClient)
  const result = await blockBlobClient.delete(options);

  return result;
};

const azureStorageUpload = async (req: any) => {
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
  destination: function (_req, _file, cb) {
    cb(null, "public");
  },
  filename: async function (req, file, cb) {
    const session: any = await getSession({ req });

    cb(
      null,
      session.user.user.employee_no +
        "-" +
        "vaccination" +
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
  onError: (err, _req, res, _next) => {
    console.log(err);
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
        url: `${process.env.API}/vaccination/user/${session.user.user.user_id}`,
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
  .post(async (req: any, res: NextApiResponse) => {
    const session: any = await getSession({ req });

    try {
      const { dose, dose_number, date_given, vaccine_type } = req.body;

      const link = process.env.AZURESTORAGE_ORIGIN + req.file.filename;

      const vaccination = {
        user_id: session.user.user.user_id,
        dose_number: `${dose_number}${dose}`,
        vaccine_type,
        date_given,
        link,
        dose,
      };

      const { data } = await axios({
        method: "POST",
        url: `${process.env.API}/vaccination`,
        ...setHeaders(session.user.accessToken),
        data: vaccination,
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
      deleteUploads(req.file.path, req.file.filename);

      return res
        .status(error.response.data.statusCode)
        .json(error.response.data.message);
    }
  })
  .patch(async (req: any, res: NextApiResponse) => {
    const session: any = await getSession({ req });

    try {
      const { id, link, date_given, dose_number, vaccine_type } = req.body;

      if (req.file) {
        // delete previous file link
        const blobName = link.split("/")[link.split("/").length - 1];
        deleteBlob(blobName);
      }

      const { data } = await axios({
        method: "PATCH",
        url: `${process.env.API}/vaccination/${id}`,
        ...setHeaders(session.user.accessToken),
        data: {
          id,
          user_id: `${session.user.user.user_id}`,
          dose_number,
          vaccine_type,
          date_given: new Date(date_given),
          link: req.file
            ? process.env.AZURESTORAGE_ORIGIN + req.file.filename
            : link,
        },
      });

      if (req.file) {
        const isUploadSuccess = await azureStorageUpload(req.file);

        deleteUploads(req.file.path, req.file.filename);

        if (!isUploadSuccess) {
          return res
            .status(500)
            .json("Error: Uploading file to Azure Error: API_BlobStorage");
        } else {
          res.status(200).json(data);
        }
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
