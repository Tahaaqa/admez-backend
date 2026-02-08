const { S3Client , PutObjectCommand} = require("@aws-sdk/client-s3");
const { Upload } = require('@aws-sdk/lib-storage');


uploadToCloud = async ( s3 , file , folderPath)=> {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folderPath}/${file.originalname}`, // Use uppercase Key
    Body: file.buffer,
    ContentType: file.mimetype // Correct property name
  };
  
  const upload = new Upload({
    client: s3,
    params: params
  });

  // Track progress if needed
  upload.on('httpUploadProgress', (progress) => {
    console.log(`Upload progress: ${progress.loaded} bytes`);
  });

  await upload.done();
  console.log(`Uploaded ${file.originalname} successfully`);
}


const { ListObjectsV2Command, DeleteObjectsCommand } = require('@aws-sdk/client-s3');

deleteFolderFromCloud = async (s3, folderPath) => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  
  try {
    // 1. List all objects in the folder
    const listParams = {
      Bucket: bucketName,
      Prefix: folderPath.endsWith('/') ? folderPath : `${folderPath}/`
    };

    const listCommand = new ListObjectsV2Command(listParams);
    const listedObjects = await s3.send(listCommand);

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
      console.log(`Folder ${folderPath} is already empty`);
      return;
    }

    // 2. Prepare delete parameters
    const deleteParams = {
      Bucket: bucketName,
      Delete: {
        Objects: listedObjects.Contents.map(({ Key }) => ({ Key })),
        Quiet: false
      }
    };

    // 3. Delete all objects in the folder
    const deleteCommand = new DeleteObjectsCommand(deleteParams);
    const deleteResult = await s3.send(deleteCommand);

    console.log(`Deleted ${deleteResult.Deleted.length} objects from ${folderPath}`);
    return deleteResult;
  } catch (error) {
    console.error('Error deleting folder:', error);
    throw error;
  }
};


module.exports = { uploadToCloud , deleteFolderFromCloud }