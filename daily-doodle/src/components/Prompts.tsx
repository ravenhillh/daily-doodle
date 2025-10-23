import { useEffect, useState } from "react";

const Prompts = () => {
  const prompts = [
    "draw a horse",
    "draw a panther",
    "draw the eiffel tower",
    "draw a tree playing the saxophone",
    "draw two cowboys fighting",
    "draw a flying car",
    "draw a birthday cake",
    "draw a monkey playing the flute",
    "draw a house with multiple levels",
    "draw an octopus climbing a staircase",
  ];

  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    const storedIndex = localStorage.getItem("promptIndex");
    const storedDate = localStorage.getItem("promptDate");
    const today = new Date().toDateString();

    if (storedIndex && storedDate) {
      if (storedDate === today) {
        setCurrentPromptIndex(Number(storedIndex));
      } else {
        const nextIndex = (Number(storedIndex) + 1) % prompts.length;
        setCurrentPromptIndex(nextIndex);
        localStorage.setItem("promptIndex", String(nextIndex));
        localStorage.setItem("promptDate", today);
      }
    } else {
      setCurrentPromptIndex(0);
      localStorage.setItem("promptIndex", "0");
      localStorage.setItem("promptDate", today);
    }
  }, [prompts.length]);

  return (
    <div
      className="daily-prompt"
      style={{
        backgroundColor: "#fff",
        padding: "1.5rem 2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        maxWidth: "600px",
        margin: "1.5rem auto",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          marginBottom: "0.75rem",
          color: "#333",
        }}
      >
        Here is your prompt for the day...
      </h2>
      <div
        style={{
          fontSize: "1.25rem",
          fontWeight: "500",
          color: "#444",
          background: "#f9fafc",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        {prompts[currentPromptIndex]}
      </div>
    </div>
  );
};

export default Prompts;
