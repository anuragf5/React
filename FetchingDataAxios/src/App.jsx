import About from "./About";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import ProductDetailPage from "./ProductDetailPage";
import ToggleCount from "./ToggleCount";

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/product_detail_page/:id/"
          element={<ProductDetailPage />}
        ></Route>
      </Routes> */}
      <ToggleCount/>
    </>
  );
}

export default App;
