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
    const today = new Date().toDateString(); // e.g. "Mon Aug 18 2025"

    if (storedIndex && storedDate) {
      if (storedDate === today) {
        // same day → use stored index
        setCurrentPromptIndex(Number(storedIndex));
      } else {
        // new day → move to next prompt
        const nextIndex = (Number(storedIndex) + 1) % prompts.length;
        setCurrentPromptIndex(nextIndex);
        localStorage.setItem("promptIndex", String(nextIndex));
        localStorage.setItem("promptDate", today);
      }
    } else {
      // first time loading
      setCurrentPromptIndex(0);
      localStorage.setItem("promptIndex", "0");
      localStorage.setItem("promptDate", today);
    }
  }, [prompts.length]);

  return (
    <div
      className="daily-prompt"
      style={{
        backgroundColor: "cornsilk",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      <h2>Here is your prompt for the day...</h2>
      <div style={{ fontSize: "1.25rem", marginTop: "0.5rem" }}>
        {prompts[currentPromptIndex]}
      </div>
    </div>
  );
};

export default Prompts;
