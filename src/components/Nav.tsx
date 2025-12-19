import LogoutBtn from "./LogoutBtn";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div
      className="navbar"
      style={{
        backgroundColor: "#111",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.75rem 2rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <Link to="/">
        <div style={{ fontSize: "1.8rem" }}>daily doodles 🐛</div>
      </Link>

      {/* Links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          fontSize: "1rem",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            transition: "background 0.3s",
          }}
          // onMouseEnter={(e) => (e.target.style.background = "#333")}
          // onMouseLeave={(e) => (e.target.style.background = "transparent")}
        >
          Dashboard
        </Link>
        <Link
          to="/gallery"
          style={{
            color: "white",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            transition: "background 0.3s",
          }}
          // onMouseEnter={(e) => (e.target.style.background = "#333")}
          // onMouseLeave={(e) => (e.target.style.background = "transparent")}
        >
          Gallery
        </Link>
        <LogoutBtn />
      </div>
    </div>
  );
};

export default Nav;
