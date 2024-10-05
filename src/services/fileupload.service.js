const { readFile } = require("fs/promises");
const { PutObjectCommand, S3Client, S3ServiceException } = require("@aws-sdk/client-s3");
const Minio = require('minio');


module.exports = {
  // Function to handle file upload
  createFileupload: async (data, callBack) => {
   // Instantiate the MinIO client with the object store service
// endpoint and an authorized user's credentials
// play.min.io is the MinIO public test cluster
const minioClient = new Minio.Client({
  endPoint: '138.197.27.135',
  port: 9000,
  useSSL: true,
  accessKey: 'mXrEVR5EPetZGqO68rqF',
  secretKey: 'EvIXxNDEauZ6D1dwAP42TBPWIGOAZaiqf9viIJoh',
})

// File to upload
const sourceFile = 'C:/Users/Levin/Pictures/changes.png'

// Destination bucket
const bucket = 'nisal-bucket'

// Destination object name
const destinationObject = 'my-test-file.txt'

// Check if the bucket exists
// If it doesn't, create it

const exists = await minioClient.bucketExists(bucket)
if (exists) {
  console.log('Bucket ' + bucket + ' exists.')
} else {
  await minioClient.makeBucket(bucket, 'us-east-1')
  console.log('Bucket ' + bucket + ' created in "us-east-1".')
}

// Set the object metadata
var metaData = {
  'Content-Type': 'text/plain',
  'X-Amz-Meta-Testing': 1234,
  example: 5678,
}

// Upload the file with fPutObject
// If an object with the same name exists,
// it is updated with new data
await minioClient.fPutObject(bucket, destinationObject, sourceFile, metaData)
console.log('File ' + sourceFile + ' uploaded as object ' + destinationObject + ' in bucket ' + bucket)

callBack(null, data);
  },

  // Function to retrieve file uploads by ID (implement actual logic for retrieval)
  getFileuploadsById: (id, callBack) => {
    // Implement logic to retrieve file upload by ID
    // Mocking a successful response for demonstration purposes
    const mockResponse = {
      id,
      fileName: `file-${id}.txt`,
      fileUrl: `${process.env.MINIO_ENDPOINT}/${process.env.MINIO_BUCKET_NAME}/file-${id}.txt`,
    };

    return callBack(null, mockResponse);
  },
};
