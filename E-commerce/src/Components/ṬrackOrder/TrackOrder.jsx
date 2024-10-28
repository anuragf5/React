function TrackOrder() {
  return (
    <>
      <div className="cart_box">
        <div className="left">
          <h2>Order Tracking</h2>
          <p>Very us move be blessed multiply night</p>
        </div>
        <div className="right">
          <a href="" className="home">
            Home
          </a>
          <a href="" className="order_tracking">
            Order Tracking
          </a>
        </div>
      </div>

      <div className="order_tracking_container">
        <div className="content_container">
          <p>
            To track your order please enter your Order ID in the box below and
            press the "Track" button. This was given to you on your receipt and
            in the confirmation email you should have received.
          </p>

          <form action="">
            <input type="text" placeholder="Order ID" />

            <br />

            <input type="email" placeholder="Billing Email Address" />

            <br />

            <button type="submit">TRACK ORDER</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default TrackOrder;
