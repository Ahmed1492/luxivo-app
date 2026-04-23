import "./CheckoutGate.scss";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

export const CheckoutGate = ({ onLogin, onRegister, onGuest }) => {
  return (
    <div className="gate-overlay">
      <div className="gate-modal">
        <div className="gate-icon">
          <LockOutlinedIcon />
        </div>
        <h2>Ready to checkout?</h2>
        <p>Sign in for a faster experience, or continue as a guest.</p>

        <div className="gate-options">
          <button className="gate-btn gate-login" onClick={onLogin}>
            <PersonOutlineIcon />
            <div>
              <span>Sign In</span>
              <small>Use your existing account</small>
            </div>
          </button>

          <button className="gate-btn gate-register" onClick={onRegister}>
            <ShoppingBagOutlinedIcon />
            <div>
              <span>Create Account</span>
              <small>Save your details for next time</small>
            </div>
          </button>

          <div className="gate-divider"><span>or</span></div>

          <button className="gate-btn gate-guest" onClick={onGuest}>
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};
