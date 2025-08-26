import Nav from "./Nav";
import Prompts from "./Prompts";

import "../App.css";

function Home() {
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     const loggedIn = localStorage.getItem("loggedIn");
  //     if (loggedIn !== "true") {
  //       navigate("/login");
  //     }
  //   }, [navigate]);

  return (
    <>
      <Nav />
      <h1>Daily Doodle</h1>
      <Prompts />
      <div className="photo-upload" style={{ backgroundColor: "gray" }}>
        File Upload
      </div>
      <div style={{ backgroundColor: "yellow" }} className="photo-feed">
        User Feed
      </div>
    </>
  );
}

export default Home;
