import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../../redux/cartReducer";
import { addOrder } from "../../redux/ordersReducer";
import "./Checkout.scss";
import { CheckoutGate } from "../../Component/auth/CheckoutGate";
import { LoginModal } from "../../Component/auth/LoginModal";
import { RegisterModal } from "../../Component/auth/RegisterModal";

const STEPS = ["Shipping", "Payment", "Confirmation"];

export const Checkout = () => {
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({
    fullName: "", email: "", phone: "", address: "", city: "", zip: "", country: "",
  });
  const [payment, setPayment] = useState({
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [gateModal, setGateModal] = useState(null);
  const [guestMode, setGuestMode] = useState(false);
  const [orderId, setOrderId] = useState("");

  const products   = useSelector((state) => state.cart.products);
  const user       = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch   = useDispatch();
  const navigate   = useNavigate();

  // Block checkout until user logs in or explicitly chooses guest
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!isLoggedIn) setGateModal("gate");
  }, []); // intentionally run once on mount only

  const getTotal = () =>
    products.reduce((sum, p) => sum + p.price * p.quantity, 0).toFixed(2);

  const validateShipping = () => {
    const e = {};
    if (!shipping.fullName.trim()) e.fullName = "Required";
    if (!shipping.email.trim()) e.email = "Required";
    if (!shipping.address.trim()) e.address = "Required";
    if (!shipping.city.trim()) e.city = "Required";
    if (!shipping.zip.trim()) e.zip = "Required";
    if (!shipping.country.trim()) e.country = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e = {};
    if (!payment.cardName.trim()) e.cardName = "Required";
    if (!/^\d{16}$/.test(payment.cardNumber.replace(/\s/g, "")))
      e.cardNumber = "Enter a valid 16-digit card number";
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) e.expiry = "Format: MM/YY";
    if (!/^\d{3,4}$/.test(payment.cvv)) e.cvv = "Invalid CVV";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleShippingChange = (e) =>
    setShipping({ ...shipping, [e.target.name]: e.target.value });

  const handlePaymentChange = (e) => {
    let val = e.target.value;
    if (e.target.name === "cardNumber") {
      val = val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    }
    if (e.target.name === "expiry") {
      val = val.replace(/\D/g, "").slice(0, 4);
      if (val.length >= 3) val = val.slice(0, 2) + "/" + val.slice(2);
    }
    if (e.target.name === "cvv") val = val.replace(/\D/g, "").slice(0, 4);
    setPayment({ ...payment, [e.target.name]: val });
  };

  const handleNext = () => {
    if (step === 0 && !validateShipping()) return;
    if (step === 1 && !validatePayment()) return;
    setStep((s) => s + 1);
  };

  const handlePlaceOrder = () => {
    if (step === 1 && !validatePayment()) return;
    const orderId = 'ORD-' + Math.floor(Math.random() * 900000 + 100000);
    const order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      items: products.map(p => ({
        id: p.id,
        title: p.title,
        image: p.image,
        price: p.price,
        quantity: p.quantity,
      })),
      total: getTotal(),
      status: 'Processing',
      shipping,
    };
    dispatch(addOrder(order));
    dispatch(resetCart());
    setOrderId(orderId);
    setStep(2);
  };

  return (
    <div className="spaceX checkout-wrapper">
      {/* Auth gate for guests */}
      {gateModal === "gate" && (
        <CheckoutGate
          onLogin={() => setGateModal("login")}
          onRegister={() => setGateModal("register")}
          onGuest={() => { setGuestMode(true); setGateModal(null); }}
        />
      )}
      {gateModal === "login" && (
        <LoginModal
          onClose={() => { setGuestMode(true); setGateModal(null); }}
          onSwitchToRegister={() => setGateModal("register")}
          onSuccess={() => setGateModal(null)}
        />
      )}
      {gateModal === "register" && (
        <RegisterModal
          onClose={() => { setGuestMode(true); setGateModal(null); }}
          onSwitchToLogin={() => setGateModal("login")}
          onSuccess={() => setGateModal(null)}
        />
      )}
      {/* Stepper */}
      <div className="stepper">
        {STEPS.map((label, i) => (
          <div key={i} className={`step ${i <= step ? "active" : ""} ${i < step ? "done" : ""}`}>
            <div className="step-circle">{i < step ? "✓" : i + 1}</div>
            <span>{label}</span>
            {i < STEPS.length - 1 && <div className="step-line" />}
          </div>
        ))}
      </div>

      {/* Guest / logged-in badge */}
      {!isLoggedIn && guestMode && (
        <div className="guest-notice">
          Checking out as guest —{" "}
          <button onClick={() => setGateModal("login")}>Sign in</button> for faster checkout next time
        </div>
      )}

      <div className="checkout-body">
        {/* Left: Form */}
        <div className="checkout-form-area">
          {step === 0 && (
            <div className="form-section">
              <h2>Shipping Information</h2>
              <div className="form-grid">
                {[
                  { name: "fullName", label: "Full Name", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "phone", label: "Phone (optional)", type: "tel" },
                  { name: "address", label: "Address", type: "text" },
                  { name: "city", label: "City", type: "text" },
                  { name: "zip", label: "ZIP Code", type: "text" },
                  { name: "country", label: "Country", type: "text" },
                ].map(({ name, label, type }) => (
                  <div key={name} className={`form-group ${name === "address" ? "full" : ""}`}>
                    <label>{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={shipping[name]}
                      onChange={handleShippingChange}
                      className={errors[name] ? "error" : ""}
                      placeholder={label}
                    />
                    {errors[name] && <span className="err-msg">{errors[name]}</span>}
                  </div>
                ))}
              </div>
              <button className="next-btn" onClick={handleNext}>
                Continue to Payment →
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="form-section">
              <h2>Payment Details</h2>
              <div className="card-preview">
                <div className="card-chip" />
                <p className="card-number-preview">
                  {payment.cardNumber || "•••• •••• •••• ••••"}
                </p>
                <div className="card-bottom">
                  <span>{payment.cardName || "CARD HOLDER"}</span>
                  <span>{payment.expiry || "MM/YY"}</span>
                </div>
              </div>
              <div className="form-grid">
                {[
                  { name: "cardName", label: "Name on Card", type: "text" },
                  { name: "cardNumber", label: "Card Number", type: "text" },
                  { name: "expiry", label: "Expiry (MM/YY)", type: "text" },
                  { name: "cvv", label: "CVV", type: "password" },
                ].map(({ name, label, type }) => (
                  <div key={name} className={`form-group ${name === "cardName" || name === "cardNumber" ? "full" : ""}`}>
                    <label>{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={payment[name]}
                      onChange={handlePaymentChange}
                      className={errors[name] ? "error" : ""}
                      placeholder={label}
                    />
                    {errors[name] && <span className="err-msg">{errors[name]}</span>}
                  </div>
                ))}
              </div>
              <div className="form-actions">
                <button className="back-btn" onClick={() => setStep(0)}>← Back</button>
                <button className="next-btn" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="confirmation">
              <div className="confirm-icon">✓</div>
              <h2>Order Placed!</h2>
              <p>Thank you{user?.name ? `, ${user.name}` : ""}! Your order has been received.</p>
              <p className="order-id">Order #{orderId}</p>
              <p className="confirm-note">
                A confirmation will be sent to <strong>{shipping.email}</strong>
              </p>
              <button className="next-btn" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        {step < 2 && (
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {products.map((p, i) => (
                <div key={i} className="summary-item">
                  <img src={p.image} alt={p.title} />
                  <div className="summary-item-info">
                    <p>{p.title}</p>
                    <span>Qty: {p.quantity}</span>
                  </div>
                  <p className="summary-item-price">${(p.price * p.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${getTotal()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free">Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${getTotal()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
