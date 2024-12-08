import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/user/save", {
        username,
        email,
        password,
        confirmPassword,
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        value={username}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setconfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
