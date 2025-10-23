import { useState, type ChangeEvent, type FormEvent } from "react";
import { addNewPost } from "../utils/util";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds 5MB. Please choose a smaller file.");
        setSelectedFile(null);
        setPreview(null);
        event.target.value = ""; // reset input
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const formatDate = (): string => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file before submitting.");
      return;
    }

    const u_id = localStorage.getItem("u_id") ?? "";
    const date = formatDate();

    try {
      // Convert the File to an ArrayBuffer for upload
      const arrayBuffer = await selectedFile.arrayBuffer();

      // Prepare data object according to addNewPost() requirements
      const formData = {
        u_id,
        title: title || selectedFile.name, // use file name if no title
        content: content || "",
        date,
        file: {
          buffer: Buffer.from(arrayBuffer),
          mimetype: selectedFile.type,
        },
      };

      const result = await addNewPost(formData);
      console.log("Upload successful:", result);
      alert("Post added successfully!");

      // Reset state
      setSelectedFile(null);
      setPreview(null);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Failed to upload file. Please try again.");
    }
  };

  return (
    <div>
      <div
        className="photo-upload"
        style={{
          backgroundColor: "#fff",
          border: "2px dashed #bbb",
          borderRadius: "12px",
          padding: "2rem",
          marginTop: "2rem",
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
          color: "#555",
          transition: "0.3s",
          cursor: "pointer",
        }}
      >
        <form className="newPost_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: "1rem", width: "80%", padding: "0.5rem" }}
            required
          />
          <textarea
            placeholder="Enter content (optional)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ marginBottom: "1rem", width: "80%", padding: "0.5rem" }}
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <div>
              <h3>Preview:</h3>
              <img
                src={preview}
                alt="Preview"
                style={{ width: "200px", marginTop: "10px" }}
              />
            </div>
          )}
          <button className="newPostBtn submitBtn" type="submit">
            Submit Photo
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
