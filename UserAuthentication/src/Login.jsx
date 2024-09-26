import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  function getUserName(event) {
    username = event.target.value;
    setUsername(username);
  }

  function getPassword(event) {
    password = event.target.value;
    setPassword(password);
  }

  function getUserDetails() {
    console.log(`Username is : ${username}`);
    console.log(`Password is : ${password}`);
  }

  function submitData(event) {
    event.preventDefault();
  }

  return (
    <>
      <div className="login_container">
        <div className="container">
          <h3>Login</h3>

          <form action="" className="login_form" onSubmit={submitData}>
            <div className="login_username">
              <input
                inputMode="text"
                name="login_username"
                id="login_username"
                placeholder="Username"
                value={username}
                onChange={getUserName}
              />
            </div>

            <div className="login_password">
              <input
                type="password"
                name="login_password"
                id="login_password"
                placeholder="Password"
                value={password}
                onChange={getPassword}
              />
            </div>

            <button
              type="submit"
              className="btn_login"
              onClick={getUserDetails}
            >
              Login
            </button>

            <p
              style={{
                color: "#2a2a2a",
                fontSize: "12px",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Don't have an account?{" "}
              <span
                style={{
                  color: "#71cd14",
                  fontSize: "14px",
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                <Link to={"/signup/"}>Signup</Link>
              </span>
            </p>

            <p className="or">OR</p>

            <div className="social_media_button_login">
              <button type="submit" className="btn_facebook">
                <img src="/src/assets/facebook.png" alt="" />
              </button>

              <button type="submit" className="btn_google">
                <img src="/src/assets/search.png" alt="" />
              </button>

              <button type="submit" className="btn_twitter">
                <img src="/src/assets/twitter.png" alt="" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
