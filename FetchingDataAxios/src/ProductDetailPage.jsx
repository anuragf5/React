import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetailPage() {
  const { id } = useParams(); // Get the ID from the URL
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    console.log(response.data);
    
    setProduct(response.data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div className="product_detail_container">
        <div className="product_detail_left_container">
          <img className="image" src={product.thumbnail} />
        </div>

        <div className="product_detail_right_container">
          <h1 className="title">{product.title}</h1>
          <h3 className="price">MRP : ₹ {product.price}</h3>
          <h5 className="rating">Rating : {product.rating}</h5>
          <h6 className="description">{product.description}</h6>
          {/* <p>{product.reviews[0]["comment"]}</p> */}
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
