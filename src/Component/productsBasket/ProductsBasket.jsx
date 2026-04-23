import { useSelector, useDispatch } from "react-redux";
import "./ProductsBasket.scss";
import { Link } from "react-router-dom";
import { removeItem } from "../../redux/cartReducer";
import { showToast } from "../toast/Toast";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const ProductsBasket = ({ onClose }) => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const total = products.reduce((s, p) => s + p.price * p.quantity, 0).toFixed(2);

  return (
    <div className="basket-popup">
      {/* Header */}
      <div className="basket-header">
        <div className="basket-title">
          <ShoppingCartOutlinedIcon />
          <span>My Cart</span>
        </div>
        <span className="basket-count">{products.length} {products.length === 1 ? "item" : "items"}</span>
      </div>

      {/* Items */}
      <div className="basket-items">
        {products.length === 0 ? (
          <div className="basket-empty">
            <ShoppingCartOutlinedIcon className="empty-icon" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          products.map((product, i) => (
            <div key={i} className="basket-item">
              <div className="basket-item-img">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="basket-item-info">
                <p className="basket-item-name">{product.title}</p>
                <div className="basket-item-bottom">
                  <span className="basket-item-qty">×{product.quantity}</span>
                  <span className="basket-item-price">${(product.price * product.quantity).toFixed(2)}</span>
                </div>
              </div>
              <button
                className="basket-item-remove"
                onClick={() => {
                  showToast(`Removed: ${product.title.slice(0, 28)}`, "remove");
                  dispatch(removeItem(product.id));
                }}
                title="Remove"
              >
                <DeleteOutlineIcon />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {products.length > 0 && (
        <div className="basket-footer">
          <div className="basket-total">
            <span>Total</span>
            <span className="basket-total-val">${total}</span>
          </div>
          <div className="basket-actions">
            <Link to="/cart" className="basket-btn basket-btn-outline" onClick={onClose}>
              View Cart
            </Link>
            <Link to="/checkout" className="basket-btn basket-btn-primary" onClick={onClose}>
              Checkout <ArrowForwardIcon />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
