const Nav = () => {
  return (
    <div
      className="navbar"
      style={{
        backgroundColor: "black",
        color: "white",
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
        height: "50px",
      }}
    >
      <div style={{ fontSize: "2rem", padding: "10px" }}> 🐞</div>
      <div style={{ fontSize: "2rem", padding: "10px" }}>Login</div>
    </div>
  );
};

export default Nav;
