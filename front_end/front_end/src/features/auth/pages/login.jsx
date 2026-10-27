import React from "react";
import "../style/form.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth.jsx";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const { handleLogin } = useAuth();

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const response = await handleLogin(username, password);
      console.log("Login successful:", response);
    } catch (err) {
      console.error(
        "Login failed:",
        err.response?.data?.message ?? err.message,
      );
    }
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            onInput={(e) => {
              setusername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <input
            onInput={(e) => {
              setpassword(e.target.value);
            }}
            type="text"
            name="password"
            placeholder="Enter password"
          />
          <button type="submit">Login</button>
        </form>
        <p>
          don't have an accout <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
