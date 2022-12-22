import { useState, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useParams } from "react-router-dom";

function Home() {
  const { userId } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const res = await axios.get("http://localhost:8000/api/v1/product/all");
      setProducts(res.data.products);
    }
    getProducts();
  }, []);

  return (
    <>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        {products &&
          products.map((product, idx) => (
            <ProductCard key={idx} product={product} userId={userId} />
          ))}
      </div>
    </>
  );
}

export default Home;
