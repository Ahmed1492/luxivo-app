import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import { showToast } from "../toast/Toast";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import "./ProductCard.scss";

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const discounted = (price, pct) => (price - (pct * price) / 100).toFixed(2);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      image: product.images[0],
      price: product.price,
      quantity: 1,
    }));
    showToast(`Added: ${product.title.slice(0, 28)}`, "success");
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="pc-tag">
        {product.category.replace(/-/g, " ").replace(/\b\w/g, m => m.toUpperCase())}
      </div>
      {product.discountPercentage >= 8 && (
        <div className="pc-discount">-{Math.round(product.discountPercentage)}%</div>
      )}
      <div className="pc-image">
        <img src={product.images[0]} alt={product.title} loading="lazy" />
        <div className="pc-overlay">
          <button className={`pc-add-btn ${added ? "added" : ""}`} onClick={handleAddToCart}>
            <ShoppingCartIcon />
            {added ? "Added!" : "Quick Add"}
          </button>
        </div>
      </div>
      <div className="pc-info">
        <p className="pc-brand">{product.brand || "No Brand"}</p>
        <p className="pc-title">{product.title}</p>
        <div className="pc-rating">
          <StarIcon /><span>{product.rating}</span>
        </div>
        <div className="pc-price">
          <span className="pc-price-now">${discounted(product.price, product.discountPercentage)}</span>
          <del className="pc-price-old">${product.price}</del>
        </div>
      </div>
    </Link>
  );
};
