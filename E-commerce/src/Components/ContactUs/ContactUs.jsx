function ContactUs() {
  return (
    <>
      <div className="cart_box">
        <div className="left">
          <h2>Contact Us</h2>
          <p>Very us move be blessed multiply night</p>
        </div>
        <div className="right">
          <a href="" className="home">
            Home
          </a>
          <a href="" className="contact_us">
            Contact Us
          </a>
        </div>
      </div>

      <div className="map_container">
        <div className="map">
          <div className="content">
            <img src="src/assets/icon_error.png" alt="" />
            <h1>Oops! Something went wrong!</h1>
            <p>
              This page didn't load Google Maps correctly. See the JavaScript
              console for technical details.
            </p>
          </div>
        </div>
      </div>

      <div className="get_in_touch_container">
        <div className="left">
          <h2>Get in Touch</h2>

          <form action="">
            <textarea
              name=""
              id=""
              cols="30"
              rows="13"
              placeholder="Enter Message"
              className="text_area"
            ></textarea>
            <br />

            <input type="text" placeholder="Enter your name" className="name" />

            <input
              type="text"
              placeholder="Enter email address"
              className="email"
            />

            <br />

            <input
              type="text"
              placeholder="Enter Subject"
              className="subject"
            />

            <button type="submit">SEND MESSAGE</button>
          </form>
        </div>

        <div className="right">
          {/* <div className="address">
            <span>
              <i className="fa-solid fa-house"></i>
            </span>

            <div className="content">
              <h3>Buttonwood, California.</h3>
              <p>Rosemead, CA 91770</p>
            </div>
          </div> */}

          <div className="address">
            <span>
              <i className="fa-solid fa-house"></i>
            </span>

            <div className="content">
              <h3>Buttonwood, California.</h3>

              <p>Rosemead, CA 91770</p>
            </div>
          </div>

          <div className="mobile">
            <span>
              <i className="fa-solid fa-square-phone-flip"></i>
            </span>

            <div className="content">
              <h3>00 (440) 9865 562</h3>

              <p>Mon to Fri 9am to 6pm</p>
            </div>
          </div>

          <div className="email">
            <span>
              <i className="fa-solid fa-envelope"></i>
            </span>

            <div className="content">
              <h3>support@colorlib.com</h3>

              <p>Send us your query anytime!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
