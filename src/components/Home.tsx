import Nav from "./Nav";
// import Prompts from "./Prompts";
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

        {/* <Prompts /> */}

        {/* File Upload Section */}
        <Upload />
      </div>
    </>
  );
}

export default Home;
