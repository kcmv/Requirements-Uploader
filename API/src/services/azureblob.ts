import {
  StorageSharedKeyCredential,
  BlobServiceClient,
} from "@azure/storage-blob";

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

export const deleteBlob = async (blobName: string) => {
    const extracted_link = blobName.split("/")[blobName.split("/").length - 1];
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // include: Delete the base blob and all of its snapshots.
    // only: Delete only the blob's snapshots and not the blob itself.
    const options: any = {
      deleteSnapshots: "include", // or 'only'
    };
  
    // Create blob client from container client
    const blockBlobClient = await containerClient.getBlockBlobClient(extracted_link);
  
    // console.log(blockBlobClient)
    const result = await blockBlobClient.delete(options);
  
    return result;
  };

module.exports = {
    deleteBlob
}