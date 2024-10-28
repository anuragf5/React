import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="top_menu">
        <div className="float_left">
          <p className="p1">PHONE : +01 256 25 235</p>
          <p className="p2">EMAIL : INFO@EISER.COM</p>
        </div>
        <div className="float_right">
          <p className="p1" id="gift_card">
            GIFT CARD
          </p>
          <p className="p2" id="track_order">
            TRACK ORDER
          </p>
          <p className="p3" id="contact_us">
            CONTACT US
          </p>
          <p id="login">
            <Link
              to={"/login/"}
              className="btn_login"
              style={{ textDecoration: "none" }}
            >
              Login
            </Link>
          </p>
          <p id="signup">
            <Link
              to={"/signup/"}
              className="btn_signup"
              style={{ textDecoration: "none" }}
            >
              Signup
            </Link>
          </p>
        </div>
      </div>

      <div className="nav_bar">
        <div className="nav_bar_image_container">
          {/* <img src="/src/assets/logo.png" alt="" /> */}
        </div>

        <div className="middle_container">
          <ul>
            <li id="home_page">
              {/* HOME */}
              <Link to={""} className="list_tabs">
                HOME
              </Link>
            </li>
            <li className="list_tabs">
              SHOP
              <ul className="under">
                <li id="shop_category">
                  {/* SHOP CATEGORY */}
                  <Link
                    to={"/shopCategory/"}
                    style={{ textDecoration: "none", color: "#2A2A2A" }}
                  >
                    SHOP CATEGORY
                  </Link>
                </li>
                <li id="product_details">
                  {/* PRODUCT DETAILS */}
                  <Link
                    to={"/productDetails/"}
                    style={{ textDecoration: "none", color: "#2A2A2A" }}
                  >
                    PRODUCT DETAILS
                  </Link>
                </li>
                <li id="product_checkout">
                  {/* PRODUCT CHECKOUT */}
                  <Link
                    to={"/productCheckout/"}
                    style={{ textDecoration: "none", color: "#2A2A2A" }}
                  >
                    PRODUCT CHECKOUT
                  </Link>
                </li>
                <li id="shopping_cart">
                  {/* SHOPPING CART */}
                  <Link
                    to={"/shoppingCart/"}
                    style={{ textDecoration: "none", color: "#2A2A2A" }}
                  >
                    SHOPPING CART
                  </Link>
                </li>
              </ul>
            </li>
            <li className="list_tabs">
              BLOG
              <ul className="under">
                <li>BLOG</li>
                <li>BLOG DETAILS</li>
              </ul>
            </li>
            <li className="list_tabs">
              PAGES
              <ul className="under">
                <li>
                  {/* TRACKING */}
                  <Link
                    to={"/trackOrder/"}
                    style={{ textDecoration: "none", color: "#2A2A2A" }}
                  >
                    TRACKING
                  </Link>
                </li>
                <li>ELEMENTS</li>
              </ul>
            </li>
            <li>
              {/* CONTACT */}
              <Link to={"/contactUs/"} className="list_tabs">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

        <div className="icon_container">
          <span className="material-symbols-outlined">favorite</span>
          <span className="material-symbols-outlined">person</span>
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="material-symbols-outlined">search</span>
        </div>
      </div>
    </>
  );
}

export default Header;
