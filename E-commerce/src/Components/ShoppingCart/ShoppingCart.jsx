import React from "react";

function ShoppingCart() {
  return (
    <>
      <div className="cart_box">
        <div className="left">
          <h2>Cart</h2>
          <p>Very us move be blessed multiply night</p>
        </div>
        <div className="right">
          <a href="" className="home">
            Home
          </a>
          <a href="" className="cart">
            Cart
          </a>
        </div>
      </div>

      <div className="cart_items_container">
        <div className="container">
          <div className="table_row_left">
            <div className="product">Product</div>
          </div>

          <div className="table_row_right">
            <div className="price">Price</div>
            <div className="quantity">Quantity</div>
            <div className="total">Total</div>
          </div>
        </div>

        <div className="item_container">
          <div className="item_container_table_row_left">
            <div className="image">
              <img src="/src/assets/cart-1.jpg" alt="" />
              <p className="caption">Minimalistic shop for multipurpose use</p>
            </div>
          </div>

          <div className="item_container_table_content_row_right">
            <div className="price">
              <h5>$360.00</h5>
            </div>

            <div className="quanity_container">
              <div className="input_container">
                <input
                  type="text"
                  name="quantity"
                  value="1"
                  title="Quantity"
                  onChange={() => null}
                />
              </div>
            </div>

            <div className="total">
              <h5>$360.00</h5>
            </div>
          </div>
        </div>

        <div className="item_container">
          <div className="item_container_table_row_left">
            <div className="image">
              <img src="/src/assets/cart-1.jpg" alt="" />
              <p className="caption">Minimalistic shop for multipurpose use</p>
            </div>
          </div>

          <div className="item_container_table_content_row_right">
            <div className="price">
              <h5>$360.00</h5>
            </div>

            <div className="quanity_container">
              <div className="input_container">
                <input
                  type="text"
                  name="quantity"
                  value="1"
                  title="Quantity"
                  onChange={() => null}
                />
              </div>
            </div>

            <div className="total">
              <h5>$360.00</h5>
            </div>
          </div>
        </div>

        <div className="item_container">
          <div className="item_container_table_row_left">
            <div className="image">
              <img src="/src/assets/cart-1.jpg" alt="" />
              <p className="caption">Minimalistic shop for multipurpose use</p>
            </div>
          </div>

          <div className="item_container_table_content_row_right">
            <div className="price">
              <h5>$360.00</h5>
            </div>

            <div className="quanity_container">
              <div className="input_container">
                <input
                  type="text"
                  name="quantity"
                  value="1"
                  title="Quantity"
                  onChange={() => null}
                />
              </div>
            </div>

            <div className="total">
              <h5>$360.00</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="buttons_container">
        <div className="left_button_container">
          <div className="button_update">
            <button type="submit">UPDATE CART</button>
          </div>
        </div>

        <div className="right_button_container">
          <div className="input_box">
            <input type="text" placeholder="Coupon Code" />
          </div>

          <div className="button_apply">
            <button type="submit">APPLY</button>
          </div>

          <div className="button_close_coupon">
            <button type="submit">CLOSE COUPON</button>
          </div>
        </div>
      </div>

      <div className="subtotal_container">
        <h4 className="subtotal">Subtotal</h4>
        <h5>$720.00</h5>
      </div>

      <div className="shipping_container">
        <div className="left">
          <h4>Shipping</h4>
        </div>

        <div className="right">
          <div className="rate_five">
            <label htmlFor="">Flat Rate: $5.00</label>
            <input type="radio" name="" id="" />
          </div>

          <div className="rate_ten">
            <label htmlFor="">Flat Rate: $10.00</label>
            <input type="radio" name="" id="" />
          </div>

          <div className="rate_two">
            <label htmlFor="">Local Delivery: $2.00</label>
            <input type="radio" name="" id="" />
          </div>

          <div className="free_shipping">
            <label htmlFor="">Free Shipping</label>
            <input type="radio" name="" id="" />
          </div>
        </div>
      </div>

      <h6 className="calculate_shipping">
        Calculate Shipping <i className="fa-solid fa-caret-down"></i>
      </h6>

      <div className="country_container">
        <select name="" id="">
          <option value="">Select a Country</option>
          <option value="">India</option>
          <option value="">Dubai</option>
          <option value="">China</option>
        </select>
      </div>

      <div className="state_container">
        <select name="" id="">
          <option value="">Select a State</option>
          <option value="">Dubai</option>
          <option value="">China</option>
        </select>
      </div>

      <div className="pincode_container">
        <input type="text" placeholder="Postcode/Zipcode" />
      </div>

      <div className="button_update_details_container">
        <button type="submit">UPDATE DETAILS</button>
      </div>

      <div className="button_continue_checkout_container">
        <button type="submit" className="continue">
          CONTINUE SHOPPING
        </button>

        <button type="submit" className="proceed">
          PROCEED TO CHECKOUT
        </button>
      </div>
    </>
  );
}

export default ShoppingCart;
