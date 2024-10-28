import React from "react";

function ProductCheckout() {
  return (
    <>
      <div className="cart_box">
        <div className="left">
          <h2>Product Checkout</h2>
          <p>Very us move be blessed multiply night</p>
        </div>
        <div className="right">
          <a href="" className="home">
            Home
          </a>
          <a href="" className="product_checkout">
            Product Checkout
          </a>
        </div>
      </div>

      <div className="product_checkout_container">
        <div className="container">
          <div className="returning_customer_container">
            <div className="check_title_container">
              <h2>
                Returning Customer? <a href="http://">Click here to login</a>
              </h2>
            </div>
          </div>

          <p>
            If you have shopped with us before, please enter your details in the
            boxes below. If you are new customer, please proceed to the Billing
            & Shipping section.
          </p>

          <form action="" className="product_checkout_contact_form">
            <div className="product_checkout_input_container">
              <div className="username_email_container">
                <input type="text" placeholder="Username or Email" required />
              </div>

              <div className="password_container">
                <input type="password" placeholder="Password" required />
              </div>
            </div>

            <div className="product_checkout_form_buttons_container">
              <button type="submit">Send Message</button>

              <div className="remember_me_container">
                <input type="checkbox" />

                <label htmlFor="">Remember me</label>
              </div>
            </div>

            <a href="">Lost your password?</a>
          </form>
        </div>

        <div className="cupon_area_container">
          <div className="check_title">
            <h2>
              Have a coupon?
              <a href="#">Click here to enter your code</a>
            </h2>
          </div>
          <input
            type="text"
            placeholder="Enter coupon code"
            fdprocessedid="3i1zq"
          />

          <button type="submit">APPLY COUPON</button>
        </div>

        <div className="billing_detail_container">
          <div className="left_container">
            <h3>Billing Details</h3>

            <form action="" className="bills_form">
              <div className="first_name">
                <input type="text" placeholder="First name" required />
              </div>

              <div className="last_name">
                <input type="text" placeholder="Last name" required />
              </div>

              <div className="company_name">
                <input type="text" placeholder="Company name" required />
              </div>

              <div className="phone_number">
                <input type="tel" placeholder="Phone number" required />
              </div>

              <div className="email">
                <input type="email" placeholder="email address" required />
              </div>

              <div className="country">
                <select name="" id="countries">
                  <option value="">Country</option>
                  <option value="">India</option>
                  <option value="">China</option>
                  <option value="">Dubai</option>
                  <option value="">Russia</option>
                </select>
              </div>

              <div className="address_line_one">
                <input type="text" placeholder="Address line 01" required />
              </div>

              <div className="address_line_two">
                <input type="text" placeholder="Address line 02" required />
              </div>

              <div className="town_city">
                <input type="text" placeholder="Town/City" required />
              </div>

              <div className="district">
                <select name="" id="">
                  <option value="">District</option>
                  <option value="">Jaipur</option>
                  <option value="">Ajmer</option>
                  <option value="">Udaipur</option>
                  <option value="">Kota</option>
                </select>
              </div>

              <div className="post_code">
                <input type="text" placeholder="Postcode/ZIP" required />
              </div>

              <div className="checkbox_container">
                <div className="create_account">
                  <input type="checkbox" />
                </div>

                <div className="label">
                  <label htmlFor="">Create an account?</label>
                </div>
              </div>

              <h3 className="shipping_details_text">Shipping Details</h3>

              <div className="shipping_details_container">
                <div className="create_account">
                  <input type="checkbox" />
                </div>

                <div className="label">
                  <label htmlFor="">Ship to different address?</label>
                </div>
              </div>

              <div className="text_area_container">
                <textarea
                  name=""
                  id="order_notes"
                  placeholder="Order Notes"
                  // rows="1"
                ></textarea>
              </div>
            </form>
          </div>

          <div className="right_container">
            <div className="order_box_container">
              <h2>Your Order</h2>

              <ul className="order_box_list">
                <li>
                  <a href="#">
                    Product
                    <span>Total</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Fresh Blackberry
                    <span className="middle">x 02</span>
                    <span className="last">$720.00</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Fresh Tomatoes
                    <span className="middle">x 02</span>
                    <span className="last">$720.00</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Fresh Brocoli
                    <span className="middle">x 02</span>
                    <span className="last">$720.00</span>
                  </a>
                </li>
              </ul>

              <ul className="order_box_list_2">
                <li>
                  <a href="#">
                    Subtotal
                    <span>$2160.00</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Shipping
                    <span>Flat rate: $50.00</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Total
                    <span>$2210.00</span>
                  </a>
                </li>
              </ul>

              <div className="payment_item">
                <div className="radio_button">
                  <input type="radio" />
                </div>

                <div className="label">
                  <label htmlFor="">CHECK PAYMENTS</label>
                </div>
              </div>

              <p className="payment_item_paragraph">
                Please send a cheque to Store Name, Store Street, Store Town,
                Store State / Country, store Postcode.
              </p>

              <div className="payment_item_2">
                <div className="radio_button">
                  <input type="radio" />
                </div>

                <div className="label">
                  <label htmlFor="">PAYPAL</label>
                </div>

                <img
                  src="https://themewagon.github.io/eiser/img/product/single-product/card.jpg"
                  alt=""
                />
              </div>

              <p className="payment_item_paragraph_2">
                Please send a cheque to Store Name, Store Street, Store Town,
                Store State / Country, store Postcode.
              </p>

              <div className="terms_condition_container">
                <div className="checkbox">
                  <input type="checkbox" />
                </div>

                <div className="label">
                  <label htmlFor="">
                    I've read and accept the <a href="">terms & conditions*</a>
                  </label>
                </div>
              </div>

              <button type="submit" className="proceed_to_paypal_button">
                PROCEED TO PAYPAL
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductCheckout;
