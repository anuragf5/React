import { useState } from "react";
import { Link } from "react-router-dom";

function About() {
  let [isOpen, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };
  return (
    <>
      <div className="top_menu">
        <div className="menu_icon">
          <i className="fa-solid fa-bars" onClick={toggleMenu}></i>
          {isOpen && (
            <ul className="list_item_container">
              <li className="profile">
                <i className="fa-solid fa-user"></i>Profile
              </li>
              <li className="profile">
                <i className="fa-solid fa-cart-shopping"></i>Shopping Cart
              </li>
              <li className="profile">
                <i className="fa-solid fa-box"></i>Products
              </li>
              <li className="profile">
                <i className="fa-solid fa-bell"></i>Notifications
              </li>
              <li className="setting">
                <i className="fa-solid fa-gear"></i>Setting
              </li>
            </ul>
          )}
        </div>
        <div className="nav_items">
          <p className="p1" id="gift_card">
            <Link
              to={"/home/"}
              style={{ textDecoration: "none", color: "#2A2A2A" }}
            >
              Home
            </Link>
          </p>
          <p className="p2" id="track_order">
            About us
          </p>
        </div>
      </div>
      <main>
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in [Year], we set out with a simple mission: to create
            high-quality products that enhance everyday life.
          </p>
        </section>

        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            To deliver exceptional products that inspire and improve the lives
            of our customers.
          </p>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <ul>
            <li>Quality</li>
            <li>Innovation</li>
            <li>Sustainability</li>
            <li>Customer Focus</li>
          </ul>
        </section>

        <section className="team-section">
          <h2>Meet the Team</h2>
          <div className="team-member">
            <h3>Jane Doe</h3>
            <p>CEO - Passionate about innovation and leadership.</p>
          </div>
          <div className="team-member">
            <h3>John Smith</h3>
            <p>CTO - Expert in technology and product development.</p>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </>
  );
}

export default About;
