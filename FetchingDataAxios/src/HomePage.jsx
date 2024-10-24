import { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import "./App.css";

function HomePage() {
  let [productData, setData] = useState([]);

  let [search, setSearch] = useState("");

  let [sort, setSort] = useState("");

  let [rating, setRating] = useState("");

  const fetch = async () => {
    // const response = await axios.get("https://fakestoreapi.com/products");
    // console.log(response.data);

    const response = await axios.get("https://dummyjson.com/products");
    console.log(response.data.products);
    setData(response.data.products);
  };

  useEffect(() => {
    fetch();
  }, []);

  let filterData = productData.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  let filterSortData = () => {
    if (sort === "asc") {
      return [...filterData].sort((a, b) => a.price - b.price);
    }
    if (sort === "des") {
      return [...filterData].sort((a, b) => b.price - a.price);
    }

    if (rating === "ratingLow") {
      return [...filterData].sort((a, b) => a.rating - b.rating);
    }

    if (rating === "ratingHigh") {
      return [...filterData].sort((a, b) => b.rating - a.rating);
    }
    return filterData;
  };

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
                <i class="fa-solid fa-user"></i>Profile
              </li>
              <li className="profile">
                <i class="fa-solid fa-cart-shopping"></i>Shopping Cart
              </li>
              <li className="profile">
                <i class="fa-solid fa-box"></i>Products
              </li>
              <li className="profile">
                <i class="fa-solid fa-bell"></i>Notifications
              </li>
              <li className="setting">
                <i class="fa-solid fa-gear"></i>Setting
              </li>
            </ul>
          )}
        </div>
        <div className="nav_items">
          <p className="p1" id="gift_card">
            Home
          </p>
          <p className="p2" id="track_order">
            <Link
              to={"/about/"}
              style={{ textDecoration: "none", color: "#2A2A2A" }}
            >
              About us
            </Link>
          </p>
        </div>
      </div>

      <div className="edit_container">
        <input
          className="search"
          type="text"
          placeholder="Search..."
          style={{ padding: "6px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>

        <button onClick={() => setSort("asc", "ratingLow")}>Low to High</button>
        <button onClick={() => setSort("des")}>Hign to Low</button>

        <button onClick={() => setRating("ratingLow")}>Low Rating</button>
        <button onClick={() => setRating("ratingHigh")}>Hign Rating</button>
      </div>

      <div className="item_container">
        {filterSortData().map((item) => (
          <div className="card" style={{ width: "18rem" }}>
            {/* <img src={item.image} className="card-img-top" alt="..." /> */}
            <LazyLoadImage effect="blur" src={item.thumbnail} />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <h6 className="card-price">$ {item.price}</h6>
              <h6 className="card-rating">{item.rating}</h6>
              <p className="card-text" aria-rowcount={2}>
                {item.description}
              </p>
              <p>
                <Link
                  to={`/product_detail_page/${item.id}`}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    backgroundColor: "teal",
                    padding: "6px",
                    borderRadius: "4px",
                  }}
                >
                  View Detail
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
