import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import axios from "axios";

const ProductDetails = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const { id, userId } = useParams();

  const addToCartHandler = () => {
    async function addToCart() {
      const res = await axios.post(
        `https://ck-ibrat-task-backend.onrender.com/api/v1/user/${userId}/addToCart/${id}`
      );
      if (res.data.success) {
        console.log(res.data);
        navigate(`/cart/${userId}`);
      }
    }
    addToCart();
  };

  useEffect(() => {
    async function getProduct() {
      const res = await axios.get(
        `https://ck-ibrat-task-backend.onrender.com/api/v1/product/${id}`
      );
      if (res.data.success) {
        setProduct(res.data.product);
      }
    }
    getProduct();
  }, [id]);

  return (
    <Fragment>
      {product ? (
        <Fragment>
          <h1>Product details</h1>
          <div className="productDetails">
            <div>
              {product.image && (
                <img src={product.image} alt={`${product.name} image`} />
              )}
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className="detailsBlock-3">
                <h1>{`Rs.${product.price}`}</h1>
                <button
                  disabled={product.stock < 1 ? true : false}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>
              <p>
                Status:{" "}
                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                  {product.stock < 1 ? "Out of stock" : "In stock"}
                </b>
              </p>
            </div>
            <div className="detailsBlock-4">
              Description: <p>{product.description}</p>
            </div>
          </div>
        </Fragment>
      ) : (
        <div>Loading...</div>
      )}
    </Fragment>
  );
};

export default ProductDetails;
