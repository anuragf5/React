import { useEffect, useState } from "react";

import featuredProductData from "../DummyData/FeaturedProducts";
import topInspiredProductsData from "../DummyData/TopInspiredProducts";
import bottomInspiredProductsData from "../DummyData/BottomInspiredProduct";
import latestBlogData from "../DummyData/LatestBlog";
import { Link } from "react-router-dom";
import productData from "../DummyData/AllProduct";
import allProductData from "../DummyData/AllProductsData.json";

function HomePage() {
  // FILTER PRODUCTS ACCORDING TO CATEGORIES
  const filterFeaturedProductData = productData.filter((item) => {
    return item.category == "featured_product";
  });
  console.log("Filter Featured Products", filterFeaturedProductData);

  const filterTopInspiredProductData = productData.filter((item) => {
    return item.category == "top_inspired_product";
  });
  console.log("Filter Top Inspired Products", filterTopInspiredProductData);

  const filterBottomInspiredProductData = productData.filter((item) => {
    return item.category == "bottom_inspired_product";
  });

  console.log(
    "Filter Bottom Inspired Products",
    filterBottomInspiredProductData
  );

  // DUMMY JSON PRODUCT DATA

  console.log("All products dummy json data", allProductData);

  console.log(
    "Featured product data from dummy json data",
    allProductData[0].featured_product
  );

  console.log(
    "Top Inspired product data from dummy json data",
    allProductData[0].top_inspired_product
  );

  console.log(
    "Bottom Inspired product data from dummy json data",
    allProductData[0].bottom_inspired_product
  );

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

      {/* FEATURED PRODUCT CONTAINER */}
      <div className="featured_product_container">
        <div className="text_container">
          <span>FEATURED PRODUCT</span>
          <p>Bring called seed first of third give itself now ment</p>
        </div>
        <div className="featured_product_tiles">
          {/*                                                       */}
          {/* DISPLAY PRODUCTS ON SCREEN DIRECT FROM SINGLE JS FILE */}
          {/*                                                       */}

          {/* {featuredProductData.map((item) => (
            <div className="tile">
              <div className="featured_image">
                <img src={item.image} alt="" />
                <div className="hidden_buttons">
                  <span className="material-symbols-outlined">visibility</span>

                  <span className="material-symbols-outlined">favorite</span>

                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </div>
              </div>

              <div className="featured_content_container">
                <div className="title">
                  <h4>
                    <Link
                      to={`/productDetails/${item.id}`}
                      style={{
                        textDecoration: "none",
                        color: "#4a4a4a",
                      }}
                    >
                      {item.title}
                    </Link>
                  </h4>
                </div>
                <div className="subtitle">
                  <span>{item.discountedPrice}</span>
                  <del>{item.price}</del>
                </div>
              </div>
            </div>
          ))} */}

          {/*                                                                          */}
          {/* DISPLAY PRODUCTS ON SCREEN DIRECT FROM SINGLE JS FILE ACCORDING TO CATEGORY */}
          {/*                                                                          */}

          {/* {filterFeaturedProductData.map((item) => (
            <div className="tile">
              <div className="featured_image">
                <img src={item.image} alt="" />
                <div className="hidden_buttons">
                  <span className="material-symbols-outlined">visibility</span>

                  <span className="material-symbols-outlined">favorite</span>

                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </div>
              </div>

              <div className="featured_content_container">
                <div className="title">
                  <h4>
                    <Link
                      to={`/productDetails/${item.id}`}
                      style={{
                        textDecoration: "none",
                        color: "#4a4a4a",
                      }}
                    >
                      {item.title}
                    </Link>
                  </h4>
                </div>
                <div className="subtitle">
                  <span>{item.discountedPrice}</span>
                  <del>{item.price}</del>
                </div>
              </div>
            </div>
          ))} */}

          {/*                                                                               */}
          {/* DISPLAY PRODUCTS ON SCREEN DIRECT FROM SINGLE JSON FILE ACCORDING TO CATEGORY */}
          {/*                                                                               */}

          {allProductData[0].featured_product.map((item) => (
            <div className="tile">
              <div className="featured_image">
                <img src={item.image} alt="" />
                <div className="hidden_buttons">
                  <span className="material-symbols-outlined">visibility</span>

                  <span className="material-symbols-outlined">favorite</span>

                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </div>
              </div>

              <div className="featured_content_container">
                <div className="title">
                  <h4>
                    <Link
                      to={`/productDetails/${item.id}`}
                      style={{
                        textDecoration: "none",
                        color: "#4a4a4a",
                      }}
                    >
                      {item.title}
                    </Link>
                  </h4>
                </div>
                <div className="subtitle">
                  <span>{item.discountedPrice}</span>
                  <del>{item.price}</del>
                </div>
              </div>
            </div>
          ))}
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

      {/* NEW PRODUCT CONTAINER */}
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

                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
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

                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
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

                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
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

                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
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

      {/* INSPIRED PRODUCT CONTAINER */}
      <div className="inspired_product_container">
        <div className="inspired_main_title_container">
          <span>INSPIRED PRODUCTS</span>
          <p>Bring called seed first of third give itself now ment</p>
        </div>

        <div className="top_inspired_products_container">
          {/*                                                       */}
          {/* DISPLAY PRODUCTS ON SCREEN DIRECT FROM SINGLE JS FILE */}
          {/*                                                       */}

          {/* {topInspiredProductsData.map((item) => (
            <div className="first_inspired_product_container">
              <img src={item.image} alt="" />
              <div className="hidden_buttons">
                <span className="material-symbols-outlined">visibility</span>

                <span className="material-symbols-outlined">favorite</span>

                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
              <div className="inspired_product_text_container">
                <h4>{item.title}</h4>
                <span>{item.discountedPrice}</span>
                <del>{item.price}</del>
              </div>
            </div>
          ))} */}

          {/*                                                                          */}
          {/* DISPLAY PRODUCTS ON SCREEN DIRECT FROM ONE JS FILE ACCORDING TO CATEGORY */}
          {/*                                                                          */}

          {/* {filterTopInspiredProductData.map((item) => (
            <div className="first_inspired_product_container">
              <img src={item.image} alt="" />
              <div className="hidden_buttons">
                <span className="material-symbols-outlined">visibility</span>

                <span className="material-symbols-outlined">favorite</span>

                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
              <div className="inspired_product_text_container">
                <h4>{item.title}</h4>
                <span>{item.discountedPrice}</span>
                <del>{item.price}</del>
              </div>
            </div>
          ))}
        </div> */}

          {/*                                                                               */}
          {/* DISPLAY PRODUCTS ON SCREEN DIRECT FROM SINGLE JSON FILE ACCORDING TO CATEGORY */}
          {/*                                                                               */}

          {allProductData[0].top_inspired_product.map((item) => (
            <div className="first_inspired_product_container">
              <img src={item.image} alt="" />
              <div className="hidden_buttons">
                <span className="material-symbols-outlined">visibility</span>

                <span className="material-symbols-outlined">favorite</span>

                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
              <div className="inspired_product_text_container">
                <h4>
                  <Link
                    // to={`/productDetails/${item.id}`}
                    style={{
                      textDecoration: "none",
                      color: "#4a4a4a",
                    }}
                  >
                    {item.title}
                  </Link>
                </h4>
                <span>{item.discountedPrice}</span>
                <del>{item.price}</del>
              </div>
            </div>
          ))}
        </div>

        {/*                                                       */}
        {/* DISPLAY PRODUCTS ON SCREEN DIRECT FROM SINGLE JS FILE */}
        {/*                                                       */}

        {/* <div className="bottom_inspired_products_container">
          {bottomInspiredProductsData.map((item) => (
            <div className="first_inspired_product_container">
              <img src={item.image} alt="" />
              <div className="hidden_buttons">
                <span className="material-symbols-outlined">visibility</span>

                <span className="material-symbols-outlined">favorite</span>

                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
              <div className="inspired_product_text_container">
                <h4>{item.title}</h4>
                <span>{item.discountedPrice}</span>
                <del>{item.price}</del>
              </div>
            </div>
          ))}
        </div> */}

        {/*                                                                          */}
        {/* DISPLAY PRODUCTS ON SCREEN DIRECT FROM ONE JS FILE ACCORDING TO CATEGORY */}
        {/*                                                                          */}

        {/* <div className="bottom_inspired_products_container">
          {filterBottomInspiredProductData.map((item) => (
            <div className="first_inspired_product_container">
              <img src={item.image} alt="" />
              <div className="hidden_buttons">
                <span className="material-symbols-outlined">visibility</span>

                <span className="material-symbols-outlined">favorite</span>

                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
              <div className="inspired_product_text_container">
                <h4>{item.title}</h4>
                <span>{item.discountedPrice}</span>
                <del>{item.price}</del>
              </div>
            </div>
          ))}
        </div>
      </div> */}

        {/*                                                                               */}
        {/* DISPLAY PRODUCTS ON SCREEN DIRECT FROM SINGLE JSON FILE ACCORDING TO CATEGORY */}
        {/*                                                                               */}

        <div className="bottom_inspired_products_container">
          {allProductData[0].bottom_inspired_product.map((item) => (
            <div className="first_inspired_product_container">
              <img src={item.image} alt="" />
              <div className="hidden_buttons">
                <span className="material-symbols-outlined">visibility</span>

                <span className="material-symbols-outlined">favorite</span>

                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
              <div className="inspired_product_text_container">
                <h4>{item.title}</h4>
                <span>{item.discountedPrice}</span>
                <del>{item.price}</del>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LATEST BLOG CONTAINER */}
      <div className="latest_blog_container">
        <div className="latest_blog_main_title_container">
          <span>LATEST BLOG</span>
          <p>Bring called seed first of third give itself now ment</p>
        </div>

        <div className="latest_blog_content_container">
          {latestBlogData.map((item) => (
            <div className="first_blog_content_container">
              <div className="first_blog_image_container">
                <img src={item.image} alt="" />
              </div>
              <div className="first_blog_text_container">
                <div className="top_container">
                  <a href="" className="by_admin">
                    {item.admin}
                  </a>
                  <a href="" className="comments">
                    <span className="material-symbols-outlined">comment</span>
                    {item.comments}
                  </a>
                </div>

                <h4>{item.title}</h4>

                <p>{item.subtitle}</p>

                <a href="" className="learn_more">
                  LEARN MORE
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
