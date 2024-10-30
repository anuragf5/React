import { useState } from "react";
import shopCategoryProductsData from "../DummyData/ShopCategoryProducts";

function ShoppingCategory() {
  const [selectedPriceValue, setSelectedPriceValue] = useState("");
  const [selectedRatingValue, setSelectedRatingValue] = useState("");

  const [sortedPirceData, setSortedPriceData] = useState(
    shopCategoryProductsData
  );

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedPriceValue(value);

    let newSortedPriceData;

    if (value === "price_low") {
      newSortedPriceData = [...shopCategoryProductsData].sort((a, b) => {
        return Number(a.price) - Number(b.price);
      });
      setSelectedRatingValue("default");
    }

    if (value === "price_high") {
      newSortedPriceData = [...shopCategoryProductsData].sort((a, b) => {
        return Number(b.price) - Number(a.price);
      });
      setSelectedRatingValue("default");
    }

    if (value == "default") {
      newSortedPriceData = shopCategoryProductsData;
    }

    setSortedPriceData(newSortedPriceData);
  };

  const handleRatingChange = (event) => {
    const value = event.target.value;
    setSelectedRatingValue(value);

    let newSortedRatingData;

    if (value === "rating_low") {
      newSortedRatingData = [...shopCategoryProductsData].sort((a, b) => {
        return Number(a.rating) - Number(b.rating);
      });
      setSelectedPriceValue("default");
    }
    if (value === "rating_high") {
      newSortedRatingData = [...shopCategoryProductsData].sort((a, b) => {
        return Number(b.rating) - Number(a.rating);
      });
      setSelectedPriceValue("default");
    }
    if (value == "default") {
      newSortedRatingData = shopCategoryProductsData; // Default sorting
    }

    setSortedPriceData(newSortedRatingData); // Update the displayed data
  };

  return (
    <>
      <div className="cart_box">
        <div className="left">
          <h2>Shop Category</h2>
          <p>Very us move be blessed multiply night</p>
        </div>
        <div className="right">
          <a href="#" className="home">
            Home
          </a>
          <a href="#" className="shop">
            Shop
          </a>
          <a href="#" className="women_fashion">
            Women Fashion
          </a>
        </div>
      </div>

      <div className="shop_category_container">
        <div className="shop_category_container_area">
          <div className="left">
            <div className="browse_categories">
              <h3>Browse Categories</h3>

              <div className="browse_category_content">
                <ul>
                  <li>Frozen Fish</li>
                  <li>Dried Fish</li>
                  <li>Fresh Fish</li>
                  <li>Meat Alternatives</li>
                </ul>
              </div>
            </div>

            <div className="product_brand">
              <h3>Product Brand</h3>

              <div className="product_brand_content">
                <ul>
                  <li>Samsung</li>
                  <li>Apple</li>
                  <li>One Plus</li>
                  <li>Asus</li>
                </ul>
              </div>
            </div>

            <div className="color_filter">
              <h3>Color Filter</h3>

              <div className="color_filter_content">
                <ul>
                  <li>Black</li>
                  <li>Black Leather</li>
                  <li>Black with red</li>
                  <li>Gold</li>
                  <li>Spacegrey</li>
                </ul>
              </div>
            </div>

            <div className="price_filter">
              <h3>Price Filter</h3>

              <div className="price_filter_range">
                <input type="range" value={0} />
              </div>

              <div className="price">
                <label htmlFor="amount">Price : </label>
                <input type="text" id="amount" placeholder="$0" />
              </div>
            </div>
          </div>

          <div className="right">
            <div className="product_top_bar">
              <div className="left_product_bar">
                <select
                  name=""
                  id=""
                  value={selectedPriceValue}
                  onChange={handleChange}
                >
                  <option value="default">Sort By</option>
                  <option value="price_low">Price -- Low to High</option>
                  <option value="price_high">Price -- High to Low</option>
                </select>
              </div>

              <div className="right_product_bar">
                <select
                  name=""
                  id=""
                  value={selectedRatingValue}
                  onChange={handleRatingChange}
                >
                  <option value="default">Sort By</option>
                  <option value="rating_low">Rating -- Low to High</option>
                  <option value="rating_high">Rating -- High to Low</option>
                </select>
              </div>
            </div>

            <div className="latest_product_container">
              <div className="top_latest_products_container">
                {sortedPirceData.map((item) => (
                  <div className="first_latest_product_container" key={item.id}>
                    <img
                      src={item.image}
                      alt=""
                      style={{
                        objectFit: "contain",
                      }}
                    />

                    <div className="hidden_buttons">
                      <span className="material-symbols-outlined">
                        visibility
                      </span>

                      <span className="material-symbols-outlined">
                        favorite
                      </span>

                      <span className="material-symbols-outlined">
                        shopping_cart
                      </span>
                    </div>

                    <div className="inspired_product_text_container">
                      <h4>{item.title}</h4>
                      <span style={{ fontWeight: "500", color: "black" }}>
                        ₹ {item.discountedPrice}
                        <del style={{ marginLeft: "10px" }}>₹ {item.price}</del>
                      </span>
                      <p style={{ marginTop: "16px", fontSize: "16px" }}>
                        <span style={{ color: "#FFDF00", fontSize: "16px" }}>
                          <i class="fa-solid fa-star"></i>
                        </span>
                        {item.rating}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCategory;
