import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function app() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </>
  );
}

export default app;
