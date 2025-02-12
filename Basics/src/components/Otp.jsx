import React, { useEffect, useState } from "react";

const Otp = () => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const randomOtp = Math.floor(1000 + Math.random() * 9000);
    setOtp(randomOtp.toString());
  }, []);

  const handleVerifyOtp = () => {
    const userOtp = first + second + third + fourth;

    if (userOtp === otp) {
      alert("Verified OTP");
    } else {
      setIsVerified(false);
    }
  };

  return (
    <>
      <center>
        <div>
          <p style={{ fontFamily: "sans-serif", fontSize: "16px" }}>
            Random otp is : {otp}
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ margin: "24px" }}>
            <input
              id="first"
              type="text"
              style={{
                padding: "10px",
                fontSize: "24px",
                width: "60px",
                textAlign: "center",
              }}
              value={first}
              onChange={(e) => {
                if (e.target.value > 0 && e.target.value <= 9) {
                  setFirst(e.target.value);
                  document.getElementById("second").focus();
                } else {
                  setFirst("");
                }
              }}
            />
          </div>
          <div style={{ margin: "24px" }}>
            <input
              id="second"
              type="text"
              style={{
                padding: "10px",
                fontSize: "24px",
                width: "60px",
                textAlign: "center",
              }}
              value={second}
              onChange={(e) => {
                if (e.target.value > 0 && e.target.value <= 9) {
                  setSecond(e.target.value);
                  document.getElementById("third").focus();
                } else {
                  setSecond("");
                  document.getElementById("first").focus();
                }
              }}
            />
          </div>
          <div style={{ margin: "24px" }}>
            <input
              id="third"
              type="text"
              style={{
                padding: "10px",
                fontSize: "24px",
                width: "60px",
                textAlign: "center",
              }}
              value={third}
              onChange={(e) => {
                if (e.target.value > 0 && e.target.value <= 9) {
                  setThird(e.target.value);
                  document.getElementById("four").focus();
                } else {
                  setThird("");
                  document.getElementById("second").focus();
                }
              }}
            />
          </div>
          <div style={{ margin: "24px" }}>
            <input
              id="four"
              type="text"
              style={{
                padding: "10px",
                fontSize: "24px",
                width: "60px",
                textAlign: "center",
              }}
              value={fourth}
              onChange={(e) => {
                if (e.target.value > 0 && e.target.value <= 9) {
                  setFourth(e.target.value);
                } else {
                  setFourth("");
                  document.getElementById("third").focus();
                }
              }}
            />
          </div>
        </div>

        <button
          style={{
            padding: "8px 24px 8px 24px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontFamily: "sans-serif",
            fontSize: "16px",
          }}
          onClick={handleVerifyOtp}
        >
          Verify
        </button>
      </center>
    </>
  );
};

export default Otp;
