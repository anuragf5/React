import "./App.css";
import Register from "./components/RegisterPage";
import Login from "./components/LoginPage";
import HomePage from "./components/HomePage";
import DetailPage from "./components/DetailPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/detailPage/:id" element={<DetailPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
