import axios from "axios";
import "./SingleProduct.scss";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Footer } from "../../Component/footer/Footer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import { showToast } from "../../Component/toast/Toast";

const StarRating = ({ rating }) => {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="star-row">
      {Array(full).fill(0).map((_, i)  => <StarIcon key={`f${i}`} />)}
      {half === 1 && <StarHalfIcon />}
      {Array(empty).fill(0).map((_, i) => <StarBorderIcon key={`e${i}`} />)}
      <span>{rating}</span>
    </div>
  );
};

export const SingleProduct = ({ url }) => {
  const [product, setProduct]           = useState(null);
  const [loading, setLoading]           = useState(true);
  const [mainImage, setMainImage]       = useState("");
  const [activeThumb, setActiveThumb]   = useState(0);
  const [quantity, setQuantity]         = useState(1);
  const [addedToCart, setAddedToCart]   = useState(false);
  const [activeTab, setActiveTab]       = useState("description");

  const { id } = useParams();
  const navigate  = useNavigate();
  const dispatch  = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios.get(url + id)
      .then(res => {
        setProduct(res.data);
        setMainImage(res.data.images[0]);
        setActiveThumb(0);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [id, url]);

  const handleThumb = (src, idx) => { setMainImage(src); setActiveThumb(idx); };

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id, title: product.title,
      image: product.images[0], price: product.price, quantity,
    }));
    showToast(`Added: ${product.title.slice(0, 28)}`, "success");
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleBuyNow = () => {
    dispatch(addToCart({
      id: product.id, title: product.title,
      image: product.images[0], price: product.price, quantity,
    }));
    navigate("/checkout");
  };

  const discountedPrice = product
    ? (product.price - (product.discountPercentage * product.price) / 100).toFixed(2)
    : 0;

  if (loading) {
    return (
      <div className="sp-loading spaceX">
        <div className="sp-skeleton">
          <div className="sp-sk-images shimmer" />
          <div className="sp-sk-info">
            <div className="sp-sk-line shimmer" style={{ width: "70%", height: 28 }} />
            <div className="sp-sk-line shimmer" style={{ width: "40%", height: 18 }} />
            <div className="sp-sk-line shimmer" style={{ width: "90%", height: 14 }} />
            <div className="sp-sk-line shimmer" style={{ width: "90%", height: 14 }} />
            <div className="sp-sk-line shimmer" style={{ width: "60%", height: 14 }} />
            <div className="sp-sk-line shimmer" style={{ width: "30%", height: 48 }} />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="sp-page">
      {/* Breadcrumb */}
      <div className="sp-breadcrumb spaceX">
        <Link to="/">Home</Link>
        <NavigateNextIcon />
        <Link to={`/category/${product.category}`}>
          {product.category.replace(/-/g, " ").replace(/\b\w/g, m => m.toUpperCase())}
        </Link>
        <NavigateNextIcon />
        <span>{product.title}</span>
      </div>

      {/* Main card */}
      <div className="sp-card spaceX">
        {/* Images column */}
        <div className="sp-images">
          <div className="sp-main-img">
            <img src={mainImage} alt={product.title} />
            {product.discountPercentage >= 5 && (
              <div className="sp-discount-badge">
                -{Math.round(product.discountPercentage)}%
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="sp-thumbs">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  className={`sp-thumb ${activeThumb === i ? "active" : ""}`}
                  onClick={() => handleThumb(src, i)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info column */}
        <div className="sp-info">
          {/* Category + brand */}
          <div className="sp-meta">
            <Link to={`/category/${product.category}`} className="sp-category">
              {product.category.replace(/-/g, " ").replace(/\b\w/g, m => m.toUpperCase())}
            </Link>
            {product.brand && <span className="sp-brand">{product.brand}</span>}
          </div>

          <h1 className="sp-title">{product.title}</h1>

          {/* Rating */}
          <div className="sp-rating-row">
            <StarRating rating={product.rating} />
            <span className="sp-stock">
              {product.stock > 0
                ? <><span className="in-stock">●</span> In Stock ({product.stock})</>
                : <><span className="out-stock">●</span> Out of Stock</>
              }
            </span>
          </div>

          {/* Price */}
          <div className="sp-price-box">
            <span className="sp-price-now">${discountedPrice}</span>
            <del className="sp-price-old">${product.price}</del>
            <span className="sp-save">
              Save ${(product.price - discountedPrice).toFixed(2)}
            </span>
          </div>
          <p className="sp-tax-note">Inclusive of all taxes · Free shipping</p>

          {/* Quantity */}
          <div className="sp-qty-row">
            <span className="sp-qty-label">Quantity</span>
            <div className="sp-qty-ctrl">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>
                <RemoveIcon />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}>
                <AddIcon />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="sp-actions">
            <button
              className={`sp-add-btn ${addedToCart ? "added" : ""}`}
              onClick={handleAddToCart}
            >
              {addedToCart
                ? <><CheckCircleOutlineIcon /> Added to Cart!</>
                : <><ShoppingCartIcon /> Add to Cart</>
              }
            </button>
            <button className="sp-buy-btn" onClick={handleBuyNow}>
              <BoltIcon /> Buy Now
            </button>
          </div>

          {/* Trust badges */}
          <div className="sp-badges">
            <div className="sp-badge">
              <LocalShippingOutlinedIcon />
              <div>
                <p>Free Delivery</p>
                <span>On all orders</span>
              </div>
            </div>
            <div className="sp-badge">
              <VerifiedOutlinedIcon />
              <div>
                <p>Genuine Product</p>
                <span>100% authentic</span>
              </div>
            </div>
            <div className="sp-badge">
              <CachedOutlinedIcon />
              <div>
                <p>Easy Returns</p>
                <span>30-day policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sp-tabs spaceX">
        <div className="sp-tab-nav">
          {["description", "details", "reviews"].map(tab => (
            <button
              key={tab}
              className={`sp-tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="sp-tab-content">
          {activeTab === "description" && (
            <p className="sp-desc-text">{product.description}</p>
          )}
          {activeTab === "details" && (
            <div className="sp-details-grid">
              {[
                ["Brand",    product.brand || "N/A"],
                ["Category", product.category],
                ["Rating",   product.rating],
                ["Stock",    product.stock],
                ["SKU",      product.sku || `SKU-${product.id}`],
                ["Weight",   product.weight ? `${product.weight}g` : "N/A"],
              ].map(([k, v]) => (
                <div key={k} className="sp-detail-row">
                  <span className="sp-detail-key">{k}</span>
                  <span className="sp-detail-val">{v}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="sp-reviews">
              <div className="sp-review-summary">
                <div className="sp-review-score">{product.rating}</div>
                <div>
                  <StarRating rating={product.rating} />
                  <p>Based on customer reviews</p>
                </div>
              </div>
              <p className="sp-no-reviews">No written reviews yet. Be the first!</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
