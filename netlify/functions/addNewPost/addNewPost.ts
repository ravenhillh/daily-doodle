import { Handler } from "@netlify/functions";
import AWS from "aws-sdk";
import mongoose from "mongoose";

// 🧱 --- MongoDB setup ---
const MONGO_URI = process.env.MONGO_URI as string;

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  if (!MONGO_URI) throw new Error("Missing MongoDB connection string");

  await mongoose.connect(MONGO_URI);
  isConnected = true;
  console.log("✅ Connected to MongoDB");
}

// 🧩 --- Define Mongoose schema/model ---
const postSchema = new mongoose.Schema({
  u_id: String,
  title: String,
  content: String,
  published_date: String,
  fileUrl: String,
  word: String, // 👈 Add this line
  likes: { type: [String], default: [] },
  dislikes: { type: [String], default: [] },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", postSchema);

// ☁️ --- AWS S3 setup ---
const s3Client = new AWS.S3({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

export const handler: Handler = async (event) => {
  try {
    await connectDB();

    const body = JSON.parse(event.body || "{}");
    const { u_id, title, content, date, file, word } = body;

    if (!file || !file.buffer || !file.mimetype) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid file data" }),
      };
    }

    // 🔄 Rebuild file buffer from JSON-safe array
    const fileBuffer = Buffer.from(file.buffer);

    // 🪣 Upload to S3
    const uploadParams: AWS.S3.PutObjectRequest = {
      Bucket: process.env.BUCKETNAME as string,
      Key: title,
      Body: fileBuffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    const response = await s3Client.upload(uploadParams).promise();
    const fileUrl = response.Location;

    // 🗄️ Save to MongoDB
    const newPost = new Blog({
      u_id,
      title,
      content,
      published_date: date,
      fileUrl,
      word,
    });

    await newPost.save();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "✅ Post uploaded and saved successfully!",
        fileUrl,
        post: newPost,
      }),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ Upload or DB error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
