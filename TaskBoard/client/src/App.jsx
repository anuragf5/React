import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Taskboard from "./components/TaskBoard";
import PurchasePlan from "./components/PurchasePlan";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/taskboard" element={<Taskboard />} />
          <Route path="/purchasePlan" element={<PurchasePlan />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
