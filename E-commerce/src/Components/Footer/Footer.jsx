import React from "react";

function Footer() {
  return (
    <>
      <div className="footer_container">
        <div className="footer_content_container">
          <div className="footer_top_products_container">
            <h4>Top Products</h4>
            <p>Managed Websites</p>
            <p>Manage Reputation</p>
            <p>Power Tools</p>
            <p>Marketing Services</p>
          </div>
          <div className="footer_quick_links_container">
            <h4>Quick Links</h4>
            <p>Jobs</p>
            <p>Brand Assets</p>
            <p>Investor Relations</p>
            <p>Terms of Service</p>
          </div>
          <div className="footer_features_container">
            <h4>Features</h4>
            <p>Jobs</p>
            <p>Brand Assets</p>
            <p>Investor Relations</p>
            <p>Terms of Service</p>
          </div>
          <div className="footer_resources_container">
            <h4>Resources</h4>
            <p>Guides</p>
            <p>Research</p>
            <p>Experts</p>
            <p>Agencies</p>
          </div>
          <div className="footer_newsletter_container">
            <h4>Newsletter</h4>
            <p>You can trust us. we only send promo offers</p>
            <div className="email_container">
              <form action="">
                <input
                  type="email"
                  name=""
                  id=""
                  className="e_mail"
                  placeholder="Youe Email Address"
                />
                <button type="submit" className="subscribe">
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="footer_bottom_container">
          <div className="first_footer_bottom_container">
            <p>
              Copyright ©2024 All rights reserved | This template is made with
              by <span className="material-symbols-outlined">favorite</span>{" "}
              <span className="colorlib">Colorlib</span>
            </p>
          </div>
          <div className="second_footer_bottom_container">
            <a href="" className="facebook">
              <i className="fa-brands fa-square-facebook"></i>
            </a>
            <a href="" className="twitter">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="" className="dribble">
              <i className="fa-brands fa-dribbble"></i>
            </a>
            <a href="" className="behance">
              <i className="fa-brands fa-behance"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
