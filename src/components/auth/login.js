import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../utils/axios"; // ✅ Axios import
import "./login.css";

const Login = () => {
  const [userType, setUserType] = useState("admin"); // admin or farmer
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await auth.post("/login", {
        email,
        password,
      });
      const user = res.data.user;
      const role = res.data.user.role;
      console.log(role, "sjn");
      if (role !== userType) {
        alert(`You are not authorized to login as ${userType}`);
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", role);
      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "farmer") {
        navigate("/farmer/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
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

        <p>Don't have an account?</p>
        <Link to="/signup">
          <p>Signup</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
