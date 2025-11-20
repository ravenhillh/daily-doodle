import { Handler } from "@netlify/functions";
import crypto from "crypto";
import fs from "fs";
import path from "path";

export const handler: Handler = async () => {
  try {
    const filePath = path.join(__dirname, "drawableWords.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const words: string[] = JSON.parse(rawData);

    const today = new Date().toISOString().slice(0, 10);
    const hash = crypto.createHash("md5").update(today).digest("hex");
    const index = parseInt(hash.slice(0, 6), 16) % words.length;

    return {
      statusCode: 200,
      body: JSON.stringify({
        date: today,
        word: words[index],
      }),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error generating daily word:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate word" }),
    };
  }
};
