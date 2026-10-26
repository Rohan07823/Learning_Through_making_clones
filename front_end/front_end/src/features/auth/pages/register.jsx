import React from "react";
import "../style/form.scss";
import { Link } from "react-router";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

async function handleFormSubmit(e) {
  e.preventDefault();
  
  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      { email, password, username },
      { withCredentials: true }
    );
    console.log(res.data);
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
  }
}


  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
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
              setemail(e.target.value);
            }}
            type="text"
            name="email"
            placeholder="Enter Email"
          />
          <input
            onInput={(e) => {
              setpassword(e.target.value);
            }}
            type="text"
            name="password"
            placeholder="Enter password"
          />
          <button>Register</button>
        </form>
        <p>
          Already have an accout? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
