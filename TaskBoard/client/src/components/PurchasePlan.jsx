import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PurchasePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState("Free");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Processing payment with:", {
        selectedPlan,
        cardNumber,
        expiryDate,
        cvv,
      });
      navigate("/");
    } catch (error) {
      console.error("Payment processing failed:", error);
    }
  };

  return (
    <>
      <div className="form-container">
        <form className="purchase-form" onSubmit={handleSubmit}>
          <h2>Select a Plan</h2>
          <div className="plan-option">
            <input
              className="input"
              type="radio"
              value="Free"
              checked={selectedPlan === "Free"}
              onChange={(e) => setSelectedPlan(e.target.value)}
            />
            <label style={{ fontFamily: "sans-serif", marginLeft: "8px" }}>
              Free
            </label>
          </div>
          <div className="plan-option">
            <input
              type="radio"
              value="$50"
              checked={selectedPlan === "$50"}
              onChange={(e) => setSelectedPlan(e.target.value)}
            />
            <label style={{ fontFamily: "sans-serif", marginLeft: "8px" }}>
              $50
            </label>
          </div>
          <div className="plan-option">
            <input
              className="input"
              type="radio"
              value="$100"
              checked={selectedPlan === "$100"}
              onChange={(e) => setSelectedPlan(e.target.value)}
            />
            <label style={{ fontFamily: "sans-serif", marginLeft: "8px" }}>
              $100
            </label>
          </div>
          {selectedPlan !== "Free" && (
            <>
              <h2>Enter Card Information</h2>
              <input
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "10px 0px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Card Number"
                required
              />
              <input
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "10px 0px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="Expiry Date (MM/YY)"
                required
              />
              <input
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "10px 0px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="CVV"
                required
              />
            </>
          )}
          <button type="submit" className="submit-button">
            Purchase Plan
          </button>
        </form>
      </div>
    </>
  );
};

export default PurchasePlan;
