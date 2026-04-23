import "./Navbar.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { LeftMenue } from "../leftMenue/LeftMenue";
import { ProductsBasket } from "../productsBasket/ProductsBasket";
import { useSelector, useDispatch } from "react-redux";
import { LoginModal } from "../auth/LoginModal";
import { RegisterModal } from "../auth/RegisterModal";
import { logout } from "../../redux/authReducer";

export const Navbar = () => {
  const [myCategoreis, setMyCategories] = useState([]);
  const [isOpenedMenue, setIsOpenedMenue] = useState(false);
  const [isOpenedCartProducts, setIsOpenedCartProducts] = useState(false);
  const [authModal, setAuthModal] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state?.cart?.products);
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const getCategories = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products/category-list");
      const count = window.screen.width <= 1486 ? 7 : 9;
      setMyCategories(res.data.slice(0, count));
    } catch (e) { console.log(e); }
  };

  useEffect(() => { getCategories(); }, []);

  // close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal("");
    }
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="navbar">
      {authModal === "login" && (
        <LoginModal onClose={() => setAuthModal(null)} onSwitchToRegister={() => setAuthModal("register")} />
      )}
      {authModal === "register" && (
        <RegisterModal onClose={() => setAuthModal(null)} onSwitchToLogin={() => setAuthModal("login")} />
      )}

      <LeftMenue isOpenedMenue={isOpenedMenue} setIsOpenedMenue={setIsOpenedMenue} />

      {/* Top bar */}
      <div className="navbar-topbar spaceX">
        <div className="topbar-left">
          <Link to="/seller-center" className="topbar-link highlight-link">Seller Center</Link>
          <span className="topbar-divider" />
          <a href="#" className="topbar-link">Download App</a>
          <span className="topbar-divider" />
          <div className="topbar-social">
            <span>Follow us</span>
            <a href="#" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
          </div>
        </div>
        <div className="topbar-right">
          <Link to="/support" className="topbar-link">Support</Link>
          <span className="topbar-divider" />
          {isLoggedIn ? (
            <div className="profile-dropdown" ref={profileRef}>
              <button className="profile-trigger" onClick={() => setProfileOpen(!profileOpen)}>
                <div className="profile-avatar-sm">{initials}</div>
                <span>{user?.name?.split(" ")[0]}</span>
                <KeyboardArrowDownIcon className={`arrow-icon ${profileOpen ? "open" : ""}`} />
              </button>
              {profileOpen && (
                <div className="profile-menu">
                  <div className="profile-menu-header">
                    <div className="pm-avatar">{initials}</div>
                    <div>
                      <p className="pm-name">{user?.name}</p>
                      <p className="pm-email">{user?.email}</p>
                    </div>
                  </div>
                  <div className="profile-menu-items">
                    <Link to="/profile" className="pm-item" onClick={() => setProfileOpen(false)}>
                      <PersonOutlineIcon /> My Profile
                    </Link>
                    <Link to="/cart" className="pm-item" onClick={() => setProfileOpen(false)}>
                      <ShoppingCartIcon /> My Cart
                      {products.length > 0 && <span className="pm-badge">{products.length}</span>}
                    </Link>
                    <button className="pm-item pm-logout" onClick={() => { dispatch(logout()); setProfileOpen(false); }}>
                      <LogoutIcon /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-btns">
              <button className="topbar-link" onClick={() => setAuthModal("register")}>Register</button>
              <span className="topbar-divider" />
              <button className="topbar-link topbar-login" onClick={() => setAuthModal("login")}>Login</button>
            </div>
          )}
        </div>
      </div>

      {/* Main bar */}
      <div className="navbar-main spaceX">
        <div className="navbar-left">
          <button className="menu-btn" onClick={() => setIsOpenedMenue(true)}>
            <MenuIcon />
          </button>
          <Link to="/" className="navbar-logo">
            <span>Snap</span>Up.
          </Link>
        </div>

        <div className="navbar-center">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products, brands and categories…"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <SearchIcon />
            </button>
          </form>
        </div>

        <div className="navbar-right">
          <div className="cart-btn-wrap">
            <button className="cart-btn" onClick={() => setIsOpenedCartProducts(!isOpenedCartProducts)}>
              <ShoppingCartIcon />
              {products.length > 0 && (
                <span className="cart-count">{products.length}</span>
              )}
            </button>
            {isOpenedCartProducts && <ProductsBasket onClose={() => setIsOpenedCartProducts(false)} />}
          </div>
        </div>
      </div>

      {/* Categories bar */}
      <div className="navbar-categories spaceX">
        <ul>
          {myCategoreis.map((category, index) => {
            const formatted = category.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
            return (
              <li key={index}>
                <NavLink
                  to={`category/${category}`}
                  className={({ isActive }) => isActive ? "active" : ""}
                >
                  {formatted}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
