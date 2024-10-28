import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "./Components/Login/Login.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import HomePage from "./Components/HomePage/HomePage.jsx";
import ShoppingCategory from "./Components/ShoppingCategory/ShoppingCategory.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import ProductCheckout from "./Components/ProductCheckout/ProductCheckout.jsx";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart.jsx";
import TrackOrder from "./Components/ṬrackOrder/TrackOrder.jsx";
import ContactUs from "./Components/ContactUs/ContactUs.jsx";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    //Fragments
    <>
      <Header />
      {/* <Banner /> */}
      {/* <Products /> */}
      {/* <Blog /> */}
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/shopCategory" element={<ShoppingCategory />}></Route>
        <Route path="/productDetails/:id/" element={<ProductDetails />}></Route>
        <Route path="/productCheckout" element={<ProductCheckout />}></Route>
        <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
        <Route path="/trackOrder" element={<TrackOrder />}></Route>
        <Route path="/contactUs" element={<ContactUs />}></Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
