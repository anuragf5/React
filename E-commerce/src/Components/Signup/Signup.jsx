import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let [username, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  function getUsername(e) {
    username = e.target.value;
    setUserName(username);
  }

  function getEmail(e) {
    email = e.target.value;
    setEmail(email);
  }

  function getPassword(e) {
    password = e.target.value;
    setPassword(password);
  }

  function getconfirmPassword(e) {
    confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  }

  function getUserSignupData() {
    console.log(`Username : ${username}`);
    console.log(`Email : ${email}`);
    console.log(`Password : ${password}`);
    console.log(`Confirm Password : ${confirmPassword}`);
  }

  function submitData(e) {
    e.preventDefault();

    const userSignupData = {
      username,
      email,
      password,
      confirmPassword,
    };

    console.log(`User signup data as an object : ${userSignupData}`);

    localStorage.setItem("userSignupData", JSON.stringify(userSignupData));
  }

  // const [userSignupData, setUserSignupData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmpassword: "",
  // });

  // function getInputSignupData(e){
  //   const {name,value} = e.target;
  //   setUserSignupData({ ...userSignupData, [name]: value });
  // }

  // function getUserData(e) {
  //   e.preventDefault();
  //   localStorage.setItem("userSignupData", JSON.stringify(userSignupData));
  //   console.log(userSignupData);
  //   // console.log(username, email, password, confirmPassword);
  // }

  return (
    <>
      <div className="signup_container">
        <div className="container">
          <h3>Signup</h3>

          <form action="" className="signup_form" onChange={submitData}>
            <div className="signup_username">
              <input
                type="text"
                name="username"
                id="signup_username"
                placeholder="Username"
                // onChange={(e) => {
                //   setUserName(e.target.value);
                // }}
                // onChange={getInputSignupData}
                value={username}
                onChange={getUsername}
              />
            </div>

            <div className="signup_email">
              <input
                type="email"
                name="email"
                id="signup_email"
                placeholder="Email"
                // onChange={(e) => {
                //   setEmail(e.target.value);
                // }}
                // onChange={getInputSignupData}
                value={email}
                onChange={getEmail}
              />
            </div>

            <div className="signup_password">
              <input
                type="password"
                name="password"
                id="signup_password"
                placeholder="Password"
                // onChange={(e) => {
                //   setPassword(e.target.value);
                // }}
                // onChange={getInputSignupData}
                value={password}
                onChange={getPassword}
              />
            </div>

            <div className="signup_confirm_password">
              <input
                type="password"
                name="confirmpassword"
                id="confirm_password"
                placeholder="Confirm Password"
                // onChange={(e) => {
                //   setConfirmPassword(e.target.value);
                // }}
                // onChange={getInputSignupData}
                value={confirmPassword}
                onChange={getconfirmPassword}
              />
            </div>

            <button
              type="submit"
              className="btn_signup"
              onClick={getUserSignupData}
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
              <Link to={"/login/"}>
                <span
                  style={{
                    color: "#71cd14",
                    fontSize: "14px",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  Login
                </span>
              </Link>
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
