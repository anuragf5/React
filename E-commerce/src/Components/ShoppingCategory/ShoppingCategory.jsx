import shopCategoryProductsData from "../DummyData/ShopCategoryProducts";

function ShoppingCategory() {
  return (
    <>
      <div className="cart_box">
        <div className="left">
          <h2>Shop Category</h2>
          <p>Very us move be blessed multiply night</p>
        </div>
        <div className="right">
          <a href="" className="home">
            Home
          </a>
          <a href="" className="shop">
            Shop
          </a>
          <a href="" className="women_fashion">
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
                <input type="range" />
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
                <select name="" id="">
                  <option value="">Default sorting</option>
                  <option value="">Default sorting 01</option>
                  <option value="">Default sorting 02</option>
                </select>
              </div>

              <div className="right_product_bar">
                <select name="" id="">
                  <option value="">Show 12</option>
                  <option value="">Show 13</option>
                  <option value="">Show 14</option>
                </select>
              </div>
            </div>

            <div className="latest_product_container">
              <div className="top_latest_products_container">
                {shopCategoryProductsData.map((item)=>(

                <div className="first_latest_product_container">
                  <img src={item.image} alt="" />

                  <div className="hidden_buttons">
                    <span className="material-symbols-outlined">
                      visibility
                    </span>

                    <span className="material-symbols-outlined">favorite</span>

                    <span className="material-symbols-outlined">
                      shopping_cart
                    </span>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCategory;
