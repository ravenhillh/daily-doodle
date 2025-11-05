import { useEffect, useState } from "react";

interface DailyWordData {
  word: string;
  date: string;
}

const Prompts = () => {
  const [data, setData] = useState<DailyWordData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/.netlify/functions/getDailyWord")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching word:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading word of the day...</p>;
  if (!data) return <p>Could not load word.</p>;

  return (
    <div
      style={{
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "12px",
        border: "2px solid #ccc",
        maxWidth: "400px",
        textAlign: "center",
        background: "#fffaf0",
      }}
    >
      <h2>🎨 Word of the Day</h2>
      <h1 style={{ fontSize: "2.5rem", color: "#ff5722" }}>{data.word}</h1>
      <p style={{ color: "#666" }}>Date: {data.date}</p>
      <p style={{ fontStyle: "italic", marginTop: "1rem" }}>
        Draw something inspired by "{data.word}"!
      </p>
    </div>
  );
};

export default Prompts;
