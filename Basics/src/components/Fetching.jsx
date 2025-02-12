import { useEffect, useState } from "react";

const FetchingData = () => {
  const [products, setproducts] = useState([]);
  const [search, searchProducts] = useState("");
  const [sort, setSort] = useState("");

  //   useEffect(() => {
  //     fetch("https://fakestoreapi.com/products")
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         console.log(data);
  //         setproducts(data);
  //       });
  //   }, []);

  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    console.log("asass", data.products);
    setproducts(data.products);
  };

  const filterData = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const filterSortData = () => {
    if (sort === "asc") {
      return [...filterData].sort((a, b) => b.price - a.price);
    }

    if (sort === "dsc") {
      return [...filterData].sort((a, b) => a.price - b.price);
    }

    return filterData;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <center>
        <input
          type="text"
          value={search}
          onChange={(e) => searchProducts(e.target.value)}
          style={{ padding: "10px", width: "50%" }}
        />
        <button onClick={() => setSort("asc")}>High</button>
        <button onClick={() => setSort("dsc")}>Low</button>
      </center>

      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {filterSortData().map((items) => (
          <div
            style={{ border: "1px solid red", margin: "10px", padding: "10px" }}
          >
            <img src={items.thumbnail} alt="" />
            <p>{items.title}</p>
            <h3>{items.price}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default FetchingData;
