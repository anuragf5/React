import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      });
      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      localStorage.setItem("diffInDays", data.diffInDays);

      //   localStorage.setItem("userId", data._id);
      // localStorage.setItem("email", data.email);
      navigate("/login", { state: { name } });
    } catch (error) {
      console.log(error);
    }
  };

  function handleLogin() {
    navigate("/login");
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
            color: "black",
          }}
        >
          Signup
        </h1>
        <div
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
            padding: "24px",
          }}
        >
          <input
            style={{
              padding: "8px 48px 8px 4px",
              fontSize: "16px",
              fontFamily: "sans-serif",
              border: "1px solid gainsboro",
              borderRadius: "2px",
              backgroundColor: "white",
            }}
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <input
            style={{
              padding: "8px 48px 8px 4px",
              fontSize: "16px",
              fontFamily: "sans-serif",
              border: "1px solid gainsboro",
              borderRadius: "2px",
              backgroundColor: "white",
            }}
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
            padding: "24px",
          }}
        >
          <input
            style={{
              padding: "8px 48px 8px 4px",
              fontSize: "16px",
              fontFamily: "sans-serif",
              border: "1px solid gainsboro",
              borderRadius: "2px",
              backgroundColor: "white",
            }}
            type="password"
            placeholder="Enter passsword"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <center>
          <button
            style={{
              width: "249.6px",
              padding: "8px 0px 8px 0px",
              textAlign: "center",
              fontSize: "16px",
              fontFamily: "sans-serif",
              border: "none",
              borderRadius: "4px",
              color: "hsla(215, 90%, 37.7%, 0.9)",
            }}
            onClick={handleSignup}
          >
            Signup
          </button>
        </center>
        <center>
          <p
            onClick={handleLogin}
            style={{
              padding: "8px 0px 0px 0px",
              textAlign: "center",
              fontSize: "14px",
              fontFamily: "sans-serif",
              cursor: "pointer",
              color: "black",
            }}
          >
            Already have an account? Login
          </p>
        </center>
      </div>
    </>
  );
};

export default Signup;
