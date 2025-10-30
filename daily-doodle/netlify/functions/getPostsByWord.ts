import { Handler } from "@netlify/functions";
import mongoose from "mongoose";

// ✅ You can import your existing Blog model instead of redefining if you already have it
const postSchema = new mongoose.Schema({
  u_id: String,
  title: String,
  content: String,
  published_date: String,
  fileUrl: String,
  word: String,
  likes: { type: [String], default: [] },
  dislikes: { type: [String], default: [] },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", postSchema);

export const handler: Handler = async (event) => {
  try {
    const word = event.queryStringParameters?.word;
    if (!word)
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing word" }),
      };

    // Connect to MongoDB
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not set in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI as string);

    // Find all posts with this word
    const posts = await Blog.find({ word }).sort({ published_date: -1 });

    return {
      statusCode: 200,
      body: JSON.stringify(posts),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching posts by word:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
