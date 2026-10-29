import React from "react";
import "../style/form.scss";
import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { loading, setLoading, handleRegister,setUser,user } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading....</h1>;
  }
  async function handleFormSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await handleRegister(username, password, email);
      console.log("Registered successfully", response);      
      navigate("/");
    } catch (err) {
      console.log("registeration failed", err);
    } finally {
      setLoading(false);
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
