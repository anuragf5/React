import React from "react";

function Banner() {
  return (
    <>
      <div className="banner_container">
        <div className="banner_content_container">
          <div className="banner_image">
            <img src="src/assets/banner-bg.jpg" alt="" />
          </div>
          <div className="banner_content">
            <p>MEN COLLECTION</p>
            <h3>
              <span>Show</span> Your
              <br /> Personal <span>Style</span>
              <br />
            </h3>
            <h4>Fowl saw dry which a above together place.</h4>
            <button type="submit">VIEW COLLECTION</button>
          </div>
        </div>
      </div>

      <div className="four_tiles">
        <div className="tiles">
          <div className="icon">
            <span className="material-symbols-outlined">account_balance</span>
          </div>
          <div className="title">
            <h3>MONEY BACK GURANTEE</h3>
          </div>
          <div className="subtitle">
            <p>Shall open divide a one</p>
          </div>
        </div>
        <div className="tiles">
          <div className="icon">
            <span className="material-symbols-outlined">local_shipping</span>
          </div>
          <div className="title">
            <h3>FREE DELIVERY</h3>
          </div>
          <div className="subtitle">
            <p>Shall open divide a one</p>
          </div>
        </div>
        <div className="tiles">
          <div className="icon">
            <span className="material-symbols-outlined">headset_mic</span>
          </div>
          <div className="title">
            <h3>ALWAYS SUPPORT</h3>
          </div>
          <div className="subtitle">
            <p>Shall open divide a one</p>
          </div>
        </div>
        <div className="tiles">
          <div className="icon">
            <span className="material-symbols-outlined">encrypted</span>
          </div>
          <div className="title">
            <h3>SECURE PAYMENT</h3>
          </div>
          <div className="subtitle">
            <p>Shall open divide a one</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
