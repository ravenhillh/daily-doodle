import Nav from "./Nav";
import Prompts from "./Prompts";
import "../App.css";
import Upload from "./Upload";

function Home() {
  //fix prompt timing issues
  //photo upload + photo storage / access
  //
  return (
    <>
      <Nav />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          backgroundColor: "#f9fafc",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "1rem",
            color: "#333",
            letterSpacing: "1px",
          }}
        >
          Daily Doodle
        </h1>

        <Prompts />

        {/* File Upload Section */}
        <Upload />

        {/* User Feed Section */}
        <div
          className="photo-feed"
          style={{
            marginTop: "2.5rem",
            padding: "1.5rem",
            backgroundColor: "#fff",
            borderRadius: "12px",
            width: "100%",
            maxWidth: "900px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "1rem", color: "#444" }}>
            Community Feed
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {/* Example placeholder for user drawings */}
            <div
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
                height: "200px",
              }}
            />
            <div
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
                height: "200px",
              }}
            />
            <div
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
                height: "200px",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
