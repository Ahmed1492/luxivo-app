import { useEffect, useState } from "react";
import "./AllCategoryProducts.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import { showToast } from "../toast/Toast";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import { SkeletonCard } from "../skeleton/SkeletonCard";

export const AllCategoryProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);
  const dispatch = useDispatch();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://dummyjson.com/products?limit=30");
      const shuffled = [...res.data.products].sort(() => Math.random() - 0.5);
      setAllProducts(shuffled);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (e, product) => {
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
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  useEffect(() => { getAllProducts(); }, []);

  const discounted = (price, pct) => (price - (pct * price) / 100).toFixed(2);

  return (
    <div className="allCategories">
      <div className="allCards spaceX">
        {loading ? (
          <SkeletonCard count={10} />
        ) : (
          allProducts.map((p) => (
            <Link to={`/product/${p.id}`} key={p.id} className="singleCard">
              {/* Category tag */}
              <div className="card-tag">
                {p.category.replace(/-/g, " ").replace(/\b\w/g, m => m.toUpperCase())}
              </div>

              {/* Discount badge */}
              {p.discountPercentage >= 10 && (
                <div className="card-discount-badge">-{Math.round(p.discountPercentage)}%</div>
              )}

              {/* Image */}
              <div className="card-image">
                <img src={p.images[0]} alt={p.title} loading="lazy" />
                {/* Quick add overlay */}
                <div className="card-overlay">
                  <button
                    className={`quick-add-btn ${addedId === p.id ? "added" : ""}`}
                    onClick={(e) => handleAddToCart(e, p)}
                  >
                    <ShoppingCartIcon />
                    {addedId === p.id ? "Added!" : "Quick Add"}
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="card-info">
                <p className="card-brand">{p.brand || "No Brand"}</p>
                <p className="card-title">{p.title}</p>
                <div className="card-rating">
                  <StarIcon />
                  <span>{p.rating}</span>
                </div>
                <div className="card-price">
                  <span className="price-now">${discounted(p.price, p.discountPercentage)}</span>
                  <del className="price-old">${p.price}</del>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
