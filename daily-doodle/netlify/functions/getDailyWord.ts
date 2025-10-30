import { Handler } from "@netlify/functions";
import crypto from "crypto";
import fs from "fs";
import path from "path";

export const handler: Handler = async () => {
  try {
    // 1️⃣ Load your local word list
    const filePath = path.resolve("data/drawableWords.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const words: string[] = JSON.parse(rawData);

    // 2️⃣ Create a date-based hash
    const today = new Date().toISOString().slice(0, 10); // e.g., 2025-10-23
    const hash = crypto.createHash("md5").update(today).digest("hex");

    // 3️⃣ Deterministically pick a word
    const index = parseInt(hash.slice(0, 6), 16) % words.length;
    const wordOfTheDay = words[index];

    return {
      statusCode: 200,
      body: JSON.stringify({
        date: today,
        word: wordOfTheDay,
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
