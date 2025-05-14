import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [userType, setUserType] = useState("admin"); // 'admin' or 'farmer'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (userType === "admin") {
      if (email === "admin@example.com" && password === "admin123") {
        localStorage.setItem("adminToken", "loggedin");
        navigate("/admin/dashboard");
      } else {
        alert("Invalid admin credentials");
      }
    } else if (userType === "farmer") {
      if (email === "farmer@example.com" && password === "farmer123") {
        localStorage.setItem("farmerToken", "loggedin");
        navigate("/farmer/dashboard");
      } else {
        alert("Invalid farmer credentials");
      }
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h2>{userType === "admin" ? "Admin Login" : "Farmer Login"}</h2>

        <div className="user-type-toggle">
          <button
            type="button"
            className={userType === "admin" ? "active" : ""}
            onClick={() => setUserType("admin")}
          >
            Login as Admin
          </button>
          <button
            type="button"
            className={userType === "farmer" ? "active" : ""}
            onClick={() => setUserType("farmer")}
          >
            Login as Farmer
          </button>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
