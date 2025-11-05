import AWS from "aws-sdk";

const s3Client = new AWS.S3({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

interface AddPostFormData {
  u_id: string;
  title: string;
  content: string;
  date: string;
  file: {
    buffer: Buffer;
    mimetype: string;
  };
}

export const addNewPost = async (formData: AddPostFormData) => {
  const { u_id, title, content, date, file } = formData;

  const uploadParams: AWS.S3.PutObjectRequest = {
    Bucket: process.env.BUCKETNAME as string,
    Key: title,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const response = await s3Client.upload(uploadParams).promise();

  return {
    u_id,
    title,
    content,
    published_date: date,
    fileUrl: response.Location,
  };
};
