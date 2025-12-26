import { useEffect, useState } from "react";
import Nav from "./Nav";

interface DailyWordData {
  word: string;
  date: string;
}

interface Post {
  _id: string;
  u_id: string;
  title: string;
  content: string;
  fileUrl: string;
  word: string;
  published_date: string;
}

const DailyGallery = () => {
  const [dailyWord, setDailyWord] = useState<DailyWordData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Step 1: Get the daily word
  useEffect(() => {
    fetch("/.netlify/functions/getDailyWord")
      .then((res) => res.json())
      .then((data) => setDailyWord(data))
      .catch((err) => console.error("Error fetching daily word:", err));
  }, []);

  // Step 2: Fetch all posts for that word
  useEffect(() => {
    if (!dailyWord) return;
    fetch(
      `/.netlify/functions/getPostsByWord?word=${encodeURIComponent(
        dailyWord.word
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, [dailyWord]);

  if (loading) return <p>Loading gallery...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <Nav />
      {dailyWord && (
        <h2 style={{ textAlign: "center" }}>
          🎨 Drawings for:{" "}
          <span style={{ color: "#ff5722" }}>{dailyWord.word}</span>
        </h2>
      )}

      {posts.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No drawings yet for today. Be the first to upload!
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            maxWidth: "1200px",
            margin: "2rem auto",
          }}
        >
          {posts.map((post) => (
            <div
              key={post._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={post.fileUrl}
                alt={post.title}
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "0.5rem 1rem" }}>
                <h3 style={{ margin: "0.5rem 0" }}>{post.title}</h3>
                {post.content && (
                  <p style={{ fontSize: "0.9rem", color: "#555" }}>
                    {post.content}
                  </p>
                )}
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#999",
                    marginTop: "0.5rem",
                  }}
                >
                  Uploaded by: {post.u_id || "Anonymous"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyGallery;
