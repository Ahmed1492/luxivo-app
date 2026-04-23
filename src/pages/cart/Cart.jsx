import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "./Cart.scss";
import { removeItem, resetCart, updateQuantity } from "../../redux/cartReducer";
import { showToast } from "../../Component/toast/Toast";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Footer } from "../../Component/footer/Footer";

export const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = products.reduce((s, p) => s + p.price * p.quantity, 0);
  const discount = subtotal * 0.05; // 5% promo discount shown
  const total = (subtotal - discount).toFixed(2);

  if (products.length === 0) {
    return (
      <>
        <div className="empty-cart-page spaceX">
          <div className="empty-cart-box">
            <ShoppingCartOutlinedIcon className="empty-icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet.</p>
            <Link to="/" className="shop-now-btn">Start Shopping</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="cart-page spaceX">
      <div className="cart-heading">
        <h1>Shopping Cart</h1>
        <span>{products.length} {products.length === 1 ? "item" : "items"}</span>
      </div>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items-col">
          {products.map((product) => (
            <div key={product.id} className="cart-row">
              <div className="cart-row-img">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="cart-row-info">
                <Link to={`/product/${product.id}`} className="cart-row-title">
                  {product.title}
                </Link>
                <p className="cart-row-unit">${product.price} / unit</p>
              </div>
              <div className="cart-qty-ctrl">
                <button
                  onClick={() => dispatch(updateQuantity({ id: product.id, quantity: product.quantity - 1 }))}
                  disabled={product.quantity <= 1}
                >
                  <RemoveIcon />
                </button>
                <span>{product.quantity}</span>
                <button
                  onClick={() => dispatch(updateQuantity({ id: product.id, quantity: product.quantity + 1 }))}
                >
                  <AddIcon />
                </button>
              </div>
              <div className="cart-row-total">
                ${(product.price * product.quantity).toFixed(2)}
              </div>
              <button
                className="cart-row-delete"
                onClick={() => {
                  showToast(`Removed: ${product.title.slice(0, 28)}`, "remove");
                  dispatch(removeItem(product.id));
                }}
                title="Remove"
              >
                <DeleteOutlineIcon />
              </button>
            </div>
          ))}

          <div className="cart-actions-bar">
            <Link to="/" className="continue-link">← Continue Shopping</Link>
            <button
              className="clear-btn"
              onClick={() => window.confirm("Clear all items?") && dispatch(resetCart())}
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="cart-summary-col">
          <h2>Order Summary</h2>

          <div className="summary-lines">
            <div className="summary-line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line discount">
              <span>Promo (5%)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <span className="free-tag">Free</span>
            </div>
            <div className="summary-line total-line">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            <LockOutlinedIcon /> Proceed to Checkout
          </button>

          <div className="trust-badges">
            <div className="badge">
              <LocalShippingOutlinedIcon />
              <span>Free shipping on all orders</span>
            </div>
            <div className="badge">
              <LockOutlinedIcon />
              <span>Secure & encrypted checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};
