import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  function getEmail(e) {
    email = e.target.value;
    setEmail(email);
  }

  function getPassword(e) {
    password = e.target.value;
    setPassword(password);
  }

  function submitData(e) {
    e.preventDefault();

    const userLoginData = {
      email,
      password,
    };

    console.log(
      `User login data as an object \n 
      email : ${userLoginData.email} \n
      password : ${userLoginData.password}`
    );

    const loginData = JSON.parse(localStorage.getItem("userSignupData"));
    console.log(`Getting user signup data : ${loginData}`);

    if (loginData) {
      if (loginData.email == email && loginData.password == password) {
        alert("Login successfuly");
      } else {
        alert("Username and Password did not match");
      }
    } else {
      alert("User not found");
    }
  }

  function showUserDetails() {
    console.log("Showing user detail on click");

    console.log(email);
    console.log(password);
  }

  return (
    <>
      <div className="login_container">
        <div className="container">
          <h3>Login</h3>

          <form action="" className="login_form" onSubmit={submitData}>
            <div className="login_email">
              <input
                type="email"
                name="login_email"
                id="login_email"
                placeholder="Email"
                value={email}
                onChange={getEmail}
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

            <div className="remember_container">
              <span>
                <input type="checkbox" name="login_checkbox" id="checkbox" />{" "}
                <label htmlFor="">Remember me</label>
              </span>

              <p>Forgot Password?</p>
            </div>

            <button
              type="submit"
              className="btn_login"
              onClick={showUserDetails}
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
              <Link to={"/signup/"}>
                <span
                  style={{
                    color: "#71cd14",
                    fontSize: "14px",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  Signup
                </span>
              </Link>
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
