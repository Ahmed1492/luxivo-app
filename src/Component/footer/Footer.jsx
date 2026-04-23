import "./Footer.scss";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main spaceX">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span>Luxi</span>vo.
          </div>
          <p className="footer-tagline">
            Your one-stop destination for the best deals across every category. Shop smart, save more.
          </p>
          <div className="footer-socials">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer"><FacebookIcon /></a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer"><InstagramIcon /></a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer"><TwitterIcon /></a>
            <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noreferrer"><YouTubeIcon /></a>
          </div>
        </div>

        {/* Shop */}
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/category/smartphones">Smartphones</Link></li>
            <li><Link to="/category/laptops">Laptops</Link></li>
            <li><Link to="/category/fragrances">Fragrances</Link></li>
            <li><Link to="/category/skincare">Skincare</Link></li>
            <li><Link to="/">All Products</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/seller-center">Seller Center</Link></li>
            <li><Link to="/support">Support</Link></li>
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/">Careers</Link></li>
            <li><Link to="/">Press</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="contact-list">
            <li>
              <EmailOutlinedIcon />
              <a href="mailto:support@luxivo.com">support@luxivo.com</a>
            </li>
            <li>
              <PhoneOutlinedIcon />
              <a href="tel:+18005551234">+1 (800) 555-1234</a>
            </li>
            <li>
              <LocationOnOutlinedIcon />
              <span>123 Commerce St, New York, NY</span>
            </li>
          </ul>
          <div className="newsletter">
            <p>Get deals in your inbox</p>
            <div className="newsletter-input">
              <input type="email" placeholder="Your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom spaceX">
        <p>© 2026 Luxivo. All rights reserved by Ahmed Mohamed.</p>
        <div className="footer-legal">
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
          <Link to="/">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};
