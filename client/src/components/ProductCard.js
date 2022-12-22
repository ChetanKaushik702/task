import { Link } from "react-router-dom";

function Product({ product, userId }) {
  return (
    <Link className="productCard" to={`/product/${product._id}/${userId}`}>
      <img src={product.image} alt={product.name} />
      <p>{product.name}</p>
      <span>{`Rs.${product.price}`}</span>
    </Link>
  );
}

export default Product;
