import React from "react";
import { useParams } from "react-router-dom";
import featuredProductData from "../DummyData/FeaturedProducts";

function ProductDetails() {
  const { id } = useParams();

  // SHOWS ONLY FEATURED PRODUCT DATA WHEN CLICK ON A PARTICULAR PRODUCT
  const product = featuredProductData.filter((item)=>{
    return item.id == id;
  })

  // console.log("All product data ", allProductData);

  console.log("Product display on Product Detail Page", product);

  return (
    <>
      <div className="cart_box">
        <div className="left">
          <h2>Product Details</h2>
          <p>Very us move be blessed multiply night</p>
        </div>
        <div className="right">
          <a href="" className="home">
            Home
          </a>
          <a href="" className="product_checkout">
            Product Details
          </a>
        </div>
      </div>

      <div className="product_image_container">
        <div className="container">
          <div className="left">
            <div className="image">
              <img src={product[0].image} alt="" />
            </div>
          </div>

          <div className="right">
            <div className="product_details">
              <h3 className="product_name">{product[0].title}</h3>

              <h2>{product[0].discountedPrice}</h2>

              <ul className="list">
                <li>
                  <a href="" className="active">
                    <span>Category</span>: Household
                  </a>
                </li>

                <li>
                  <a href="">
                    <span>Availibility</span>: In Stock
                  </a>
                </li>
              </ul>

              <p>
                Mill Oil is an innovative oil filled radiator with the most
                modern technology. If you are looking for something that can
                make your interior look awesome, and at the same time give you
                the pleasant warm feeling during the winter.
              </p>

              <div className="product_count">
                <label htmlFor="">Quantity:</label>
                <input type="number" value={1} />

                <button className="up">
                  <i className="bi bi-chevron-up"></i>
                </button>

                <button className="down">
                  <i className="bi bi-chevron-down"></i>
                </button>
              </div>

              <div className="card_area">
                <button type="submit">ADD TO CART</button>

                <div className="diamond">
                  <i className="fa-regular fa-gem"></i>
                </div>

                <div className="heart">
                  <i className="fa-regular fa-heart"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <ul className="tabs">
            <li>
              <a href="">Description</a>
            </li>
            <li>
              <a href="">Specification</a>
            </li>
            <li>
              <a href="">Comments</a>
            </li>
            <li className="active">
              <a href="" className="active">
                Reviews
              </a>
            </li>
          </ul>

          <div className="content">
            <div className="left">
              <div className="overall_rating">
                <div className="overall_rating_content">
                  <h5>Overall</h5>

                  <h4>4.0</h4>

                  <h6>(03 Reviews)</h6>
                </div>

                <div className="overall_reviews_content">
                  <h3>Based on 3 Reviews</h3>

                  <div className="reviews">
                    <a href="">
                      5 Star
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      01
                    </a>
                  </div>

                  <div className="reviews">
                    <a href="">
                      4 Star
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      01
                    </a>
                  </div>

                  <div className="reviews">
                    <a href="">
                      3 Star
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      01
                    </a>
                  </div>

                  <div className="reviews">
                    <a href="">
                      2 Star
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      01
                    </a>
                  </div>

                  <div className="reviews">
                    <a href="">
                      1 Star
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      01
                    </a>
                  </div>
                </div>
              </div>

              <div className="review_list_container">
                <div className="review_list_item">
                  <div className="media">
                    <div className="image">
                      <img
                        src="https://themewagon.github.io/eiser/img/product/single-product/review-1.png"
                        alt=""
                      />
                    </div>

                    <div className="media_body">
                      <h4>Blake Ruiz</h4>

                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </div>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                  </p>
                </div>

                <div className="review_list_item">
                  <div className="media">
                    <div className="image">
                      <img
                        src="https://themewagon.github.io/eiser/img/product/single-product/review-2.png"
                        alt=""
                      />
                    </div>

                    <div className="media_body">
                      <h4>Blake Ruiz</h4>

                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </div>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                  </p>
                </div>

                <div className="review_list_item">
                  <div className="media">
                    <div className="image">
                      <img
                        src="https://themewagon.github.io/eiser/img/product/single-product/review-3.png"
                        alt=""
                      />
                    </div>

                    <div className="media_body">
                      <h4>Blake Ruiz</h4>

                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </div>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                  </p>
                </div>
              </div>
            </div>

            <div className="right">
              <div className="add_a_review_container">
                <h4>Add a Review</h4>

                <p>Your Rating:</p>

                <a href="">
                  <i className="bi bi-star-fill"></i>
                </a>
                <a href="">
                  <i className="bi bi-star-fill"></i>
                </a>
                <a href="">
                  <i className="bi bi-star-fill"></i>
                </a>
                <a href="">
                  <i className="bi bi-star-fill"></i>
                </a>
                <a href="">
                  <i className="bi bi-star-fill"></i>
                </a>

                <p>Outstanding</p>

                <form action="" className="review_form">
                  <div className="name">
                    <input type="text" placeholder="Your Full Name" />
                  </div>

                  <div className="email">
                    <input type="email" placeholder="Email Address" />
                  </div>

                  <div className="mobile">
                    <input type="tel" placeholder="Phone Number" />
                  </div>

                  <div className="review">
                    <input type="text" placeholder="Review" />
                  </div>

                  <div className="button">
                    <button type="submit">Submit Now</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
