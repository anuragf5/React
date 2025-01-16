import React, { useState } from "react";
import API from "../api";
import { useLocation, useNavigate } from "react-router-dom";

const Login = (fetchUserInfo) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showResetForm, setShowResetForm] = useState(false);

  // const name = location.state?.name || localStorage.getItem("name");

  const handleLogin = async () => {
    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });
      console.log(">>>>> User login data <<<<<", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data._id);
      localStorage.setItem("email", data.email);
      localStorage.setItem("name", data.name);
      // localStorage.setItem("diffInDays", data.diffInDays);
      // navigate("/taskboard", { state: { name } });
      navigate("/taskboard");
    } catch (error) {
      console.log(error);
    }
  };

  // Handle password reset
  const handleResetPassword = async () => {
    try {
      const response = await API.post("/auth/resetPassword", {
        email,
        oldPassword,
        newPassword,
      });
      alert("Password reset successfully");
      setShowResetForm(false); // Hide reset form after success
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = () => {
    navigate("/");
  };

  return (
    <>
      {showResetForm ? (
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
              padding: "24px",
            }}
          >
            Reset Password
          </h1>
          <div
            style={{
              textAlign: "center",
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
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div
            style={{
              textAlign: "center",
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
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              fontFamily: "sans-serif",
              padding: "0px 0px 24px 0px",
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
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
                color: "#084793",
                // backgroundColor: "white",
              }}
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </center>
          <center>
            <p
              onClick={() => setShowResetForm(false)} // Switch to login form
              style={{
                padding: "8px 0px 0px 0px",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "sans-serif",
                cursor: "pointer",
                color: "black",
              }}
            >
              Back to Login
            </p>
          </center>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontFamily: "sans-serif",
              color: "black",
              padding: "24px",
            }}
          >
            Login
          </h1>
          <div
            style={{
              textAlign: "center",
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
              type="email"
              placeholder="Enter email"
              value={email}
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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ padding: "0px 0px 16px 0px" }}>
            <p
              style={{
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "sans-serif",
                cursor: "pointer",
                color: "black",
              }}
              onClick={() => setShowResetForm(true)} // Switch to reset password form
            >
              Reset password?
            </p>
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
                color: "#084793",
                // backgroundColor: "white",
              }}
              onClick={handleLogin}
            >
              Login
            </button>
          </center>
          <center>
            <p
              onClick={handleSignup}
              style={{
                padding: "8px 0px 0px 0px",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "sans-serif",
                cursor: "pointer",
                color: "black",
              }}
            >
              Don't have an account? Signup
            </p>
          </center>
        </div>
      )}
    </>
  );
};

export default Login;
