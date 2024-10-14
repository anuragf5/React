import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  function getUserName(event) {
    username = event.target.value;
    setUsername(username);
  }

  function getEmail(event) {
    email = event.target.value;
    setEmail(email);
  }

  function getPassword(event) {
    password = event.target.value;
    setPassword(password);
  }

  function getCofirmPassword(event) {
    confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);
  }

  function getUserDetails() {
    console.log(`Username is : ${username}`);
    console.log(`Email is : ${email}`);
    console.log(`Password is : ${password}`);
    console.log(`Confirm password is : ${confirmPassword}`);
  }

  function submitData(event) {
    event.preventDefault();

    // Create user object
    const userSignupData = {
      username,
      email,
      password,
      confirmPassword,
    };

    console.log(userSignupData);

    // Save to local storage
    localStorage.setItem("userSignupData", JSON.stringify(userSignupData));

    // setUsername("");
    // setEmail("");
    // setPassword("");
    // setConfirmPassword("");

    const token = "dummy-token";
    localStorage.setItem("token", token);
  }

  return (
    <>
      <div className="signup_container">
        <div className="container">
          <h3>Signup</h3>

          <form action="" className="signup_form" onSubmit={submitData}>
            <div className="signup_username">
              <input
                inputMode="text"
                name="signup_username"
                id="signup_username"
                placeholder="Username"
                value={username}
                onChange={getUserName}
              />
            </div>

            <div className="signup_email">
              <input
                inputMode="email"
                type="email"
                name="signup_email"
                id="signup_email"
                placeholder="Email"
                value={email}
                onChange={getEmail}
              />
            </div>

            <div className="signup_password">
              <input
                type="password"
                name="signup_password"
                id="signup_password"
                placeholder="Password"
                value={password}
                onChange={getPassword}
              />
            </div>

            <div className="signup_confirm_password">
              <input
                type="password"
                name="signup_confirm_password"
                id="confirm_password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={getCofirmPassword}
              />
            </div>

            <button
              type="submit"
              className="btn_signup"
              onClick={getUserDetails}
            >
              Signup
            </button>

            <p
              style={{
                color: "#2a2a2a",
                fontSize: "12px",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Already have an account?{" "}
              <span
                style={{
                  color: "#71cd14",
                  fontSize: "14px",
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                <Link to={"/login/"}>Login</Link>
              </span>
            </p>

            <p className="or">OR</p>

            <div className="social_media_button_signup">
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

export default Signup;
