import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/DashboardPage";

import "./App.css";

import { register } from "@teamhanko/hanko-elements";

const hankoApi = "https://a3443068-44a3-4f89-ac6a-8ff884ef0fc4.hanko.io";
register(hankoApi).catch(console.error);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
