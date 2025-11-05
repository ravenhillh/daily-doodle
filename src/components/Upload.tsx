import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";

interface DailyWordData {
  word: string;
  date: string;
}

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [dailyWord, setDailyWord] = useState<DailyWordData | null>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    fetch("/.netlify/functions/getDailyWord")
      .then((res) => res.json())
      .then((data) => setDailyWord(data))
      .catch((err) => console.error("Error fetching word:", err));
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds 5MB. Please choose a smaller file.");
        setSelectedFile(null);
        setPreview(null);
        event.target.value = ""; // Reset input field
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const formatDate = (): string => {
    const d = new Date();
    return `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file before submitting.");
      return;
    }

    setIsUploading(true);

    try {
      // Convert File to Buffer
      const arrayBuffer = await selectedFile.arrayBuffer();
      const buffer = Array.from(new Uint8Array(arrayBuffer)); // convert to plain array for JSON-safe transfer

      const payload = {
        u_id: localStorage.getItem("u_id") ?? "",
        title: title || selectedFile.name,
        content,
        date: formatDate(),
        word: dailyWord?.word, // 👈 Include word of the day
        file: {
          buffer, // serialized file data
          mimetype: selectedFile.type,
        },
      };

      const response = await fetch("/.netlify/functions/addNewPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("Upload success:", data);

      alert("Post uploaded successfully! ✅");

      // Reset form
      setSelectedFile(null);
      setPreview(null);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload post. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      {dailyWord && (
        <div
          style={{
            background: "#fff8dc",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          <h3>🎨 Today's Word: {dailyWord.word}</h3>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: "200px", marginTop: "10px" }}
          />
        )}
        <button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Submit Drawing"}
        </button>
      </form>
    </div>
  );
};

export default Upload;
