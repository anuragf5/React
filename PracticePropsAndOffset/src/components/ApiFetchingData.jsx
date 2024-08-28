import { useEffect, useState } from "react";

function ApiFetchingData() {
  let [product, setProducts] = useState([]);
  let [searchValue, setSearch] = useState("");

  let jsonData;

  async function fetchData() {
    const apiData = await fetch("https://dummyjson.com/products");

    jsonData = await apiData.json();

    setProducts(jsonData.products);

    // console.log(jsonData);
  }

  function searchItem() {
    if (searchValue == "") {
      setProducts(jsonData.products);
      return;
    }

    const filterBySearch = product.filter((item) => {
      // console.log(item);

      if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return item;
      }
    });

    setProducts(filterBySearch);
  }

  function submitData(event) {
    event.preventDefault();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="search_box">
          <form action="" onSubmit={submitData}>
            <input
              type="text"
              name=""
              id=""
              placeholder="Search your item"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" onClick={searchItem}>
              Search
            </button>
          </form>
        </div>

        <div className="item_container">
          {product.map((item) => (
            <div className="card" style={{ width: "18rem" }}>
              <img src={item.thumbnail} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <h6 className="card-price">$ {item.price}</h6>
                <p className="card-text" aria-rowcount={"2"}>
                  {item.description}
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ApiFetchingData;
