import React, { useState } from "react";

function Products() {

  return (
    <>
      <div className="featured_product_container">
        <div className="text_container">
          <span>FEATURED PRODUCT</span>
          <p>Bring called seed first of third give itself now ment</p>
        </div>

        <div className="featured_product_tiles">
          <div className="tile">
            <div className="featured_image">
              <img src="src/assets/f-p-1.jpg" alt="" />
              <div className="hidden_buttons">
                <span className="material-symbols-outlined">visibility</span>

                <span className="material-symbols-outlined">favorite</span>

                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
            </div>

            <div className="featured_content_container">
              <div className="title">
                <h4>LATEST MEN'S SNEAKER</h4>
              </div>
              <div className="subtitle">
                <span>$25.00</span>
                <del>$35.00</del>
              </div>
            </div>
          </div>
          <div className="tile">
            <div className="featured_image">
              <img src="src/assets/f-p-2.jpg" alt="" />
              <div className="hidden_buttons">
                <span className="material-symbols-outlined">visibility</span>

                <span className="material-symbols-outlined">favorite</span>

                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
            </div>
            <div className="featured_content_container">
              <div className="title">
                <h4>LATEST MEN'S SNEAKER</h4>
              </div>
              <div className="subtitle">
                <span>$25.00</span>
                <del>$35.00</del>
              </div>
            </div>
          </div>
          <div className="tile">
            <div className="featured_image">
              <img src="src/assets/f-p-3.jpg" alt="" />
              <div className="hidden_buttons">
                <span className="material-symbols-outlined">visibility</span>

                <span className="material-symbols-outlined">favorite</span>

                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
            </div>
            <div className="featured_content_container">
              <div className="title">
                <h4>LATEST MEN'S SNEAKER</h4>
              </div>
              <div className="subtitle">
                <span>$25.00</span>
                <del>$35.00</del>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="offer_container">
        <div className="offer_inner_items">
          <div className="container">
            <div className="offer_content_container">
              <div className="offer_image">
                <img src="src/assets/offer-bg.png" alt="" />
              </div>
              <div className="offer_content">
                <h3>All MEN'S COLLECTION</h3>
                <h2>50% OFF</h2>
                <button type="submit">DISCOVER NOW</button>
                <p>Limited Time Offer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="new_product_container">
        <div className="main_title_container">
          <h2>NEW PRODUCTS</h2>
          <p>Bring called seed first of third give itself now ment</p>
        </div>

        <div className="products_container">
          <div className="left_product_container">
            <h5>COLLECTION OF 2019</h5>
            <h3>MEN'S SUMMER T-SHIRT</h3>
            <img src="src/assets/new-product1.png" alt="" />
            <h4>$120.70</h4>
            <button type="submit">ADD TO CART</button>
          </div>
          <div className="right_product_container">
            <div className="top_product_container">
              <div className="top_left_product">
                <img src="src/assets/n1.jpg" alt="" />
                <div className="hidden_buttons">
                  <span className="material-symbols-outlined">visibility</span>

                  <span className="material-symbols-outlined">favorite</span>

                  <span className="material-symbols-outlined">shopping_cart</span>
                </div>
                <div className="top_product_text_container">
                  <h4>NIKE LATEST SNEAKER</h4>
                  <span>$25.00</span>
                  <del>$35.00</del>
                </div>
              </div>
              <div className="top_right_product">
                <img src="src/assets/n2.jpg" alt="" />
                <div className="hidden_buttons">
                  <span className="material-symbols-outlined">visibility</span>

                  <span className="material-symbols-outlined">favorite</span>

                  <span className="material-symbols-outlined">shopping_cart</span>
                </div>
                <div className="top_product_text_container">
                  <h4>QUARTZ HAND WATCH</h4>
                  <span>$25.00</span>
                  <del>$35.00</del>
                </div>
              </div>
            </div>
            <div className="bottom_product_container">
              <div className="bottom_left_product">
                <img src="src/assets/n3.jpg" alt="" />
                <div className="hidden_buttons">
                  <span className="material-symbols-outlined">visibility</span>

                  <span className="material-symbols-outlined">favorite</span>

                  <span className="material-symbols-outlined">shopping_cart</span>
                </div>
                <div className="bottom_product_text_container">
                  <h4>MEN'S DENIM JEANS</h4>
                  <span>$25.00</span>
                  <del>$35.00</del>
                </div>
              </div>
              <div className="bottom_right_product">
                <img src="src/assets/n4.jpg" alt="" />
                <div className="hidden_buttons">
                  <span className="material-symbols-outlined">visibility</span>

                  <span className="material-symbols-outlined">favorite</span>

                  <span className="material-symbols-outlined">shopping_cart</span>
                </div>
                <div className="bottom_product_text_container">
                  <h4>ADIDAS SPORTS SHOES</h4>
                  <span>$25.00</span>
                  <del>$35.00</del>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="inspired_product_container">
        <div className="inspired_main_title_container">
          <span>INSPIRED PRODUCTS</span>
          <p>Bring called seed first of third give itself now ment</p>
        </div>

        <div className="top_inspired_products_container">
          <div className="first_inspired_product_container">
            <img src="src/assets/i1.jpg" alt="" />
            <div className="hidden_buttons">
              <span className="material-symbols-outlined">visibility</span>

              <span className="material-symbols-outlined">favorite</span>

              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
            <div className="inspired_product_text_container">
              <h4>NIKE LATEST SNEAKER</h4>
              <span>$25.00</span>
              <del>$35.00</del>
            </div>
          </div>
          <div className="second_inspired_product_container">
            <img src="src/assets/i2.jpg" alt="" />
            <div className="hidden_buttons">
              <span className="material-symbols-outlined">visibility</span>

              <span className="material-symbols-outlined">favorite</span>

              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
            <div className="inspired_product_text_container">
              <h4>NIKE LATEST SNEAKER</h4>
              <span>$25.00</span>
              <del>$35.00</del>
            </div>
          </div>
          <div className="third_inspired_product_container">
            <img src="src/assets/i3.jpg" alt="" />
            <div className="hidden_buttons">
              <span className="material-symbols-outlined">visibility</span>

              <span className="material-symbols-outlined">favorite</span>

              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
            <div className="inspired_product_text_container">
              <h4>NIKE LATEST SNEAKER</h4>
              <span>$25.00</span>
              <del>$35.00</del>
            </div>
          </div>
          <div className="fourth_inspired_product_container">
            <img src="src/assets/i4.jpg" alt="" />
            <div className="hidden_buttons">
              <span className="material-symbols-outlined">visibility</span>

              <span className="material-symbols-outlined">favorite</span>

              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
            <div className="inspired_product_text_container">
              <h4>NIKE LATEST SNEAKER</h4>
              <span>$25.00</span>
              <del>$35.00</del>
            </div>
          </div>
        </div>

        <div className="bottom_inspired_products_container">
          <div className="first_inspired_product_container">
            <img src="src/assets/i5.jpg" alt="" />
            <div className="hidden_buttons">
              <span className="material-symbols-outlined">visibility</span>

              <span className="material-symbols-outlined">favorite</span>

              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
            <div className="inspired_product_text_container">
              <h4>NIKE LATEST SNEAKER</h4>
              <span>$25.00</span>
              <del>$35.00</del>
            </div>
          </div>
          <div className="second_inspired_product_container">
            <img src="src/assets/i6.jpg" alt="" />
            <div className="hidden_buttons">
              <span className="material-symbols-outlined">visibility</span>

              <span className="material-symbols-outlined">favorite</span>

              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
            <div className="inspired_product_text_container">
              <h4>NIKE LATEST SNEAKER</h4>
              <span>$25.00</span>
              <del>$35.00</del>
            </div>
          </div>
          <div className="third_inspired_product_container">
            <img src="src/assets/i7.jpg" alt="" />
            <div className="hidden_buttons">
              <span className="material-symbols-outlined">visibility</span>

              <span className="material-symbols-outlined">favorite</span>

              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
            <div className="inspired_product_text_container">
              <h4>NIKE LATEST SNEAKER</h4>
              <span>$25.00</span>
              <del>$35.00</del>
            </div>
          </div>
          <div className="fourth_inspired_product_container">
            <img src="src/assets/i8.jpg" alt="" />
            <div className="hidden_buttons">
              <span className="material-symbols-outlined">visibility</span>

              <span className="material-symbols-outlined">favorite</span>

              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
            <div className="inspired_product_text_container">
              <h4>NIKE LATEST SNEAKER</h4>
              <span>$25.00</span>
              <del>$35.00</del>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
