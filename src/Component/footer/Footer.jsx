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
            <a href="#" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" aria-label="Twitter"><TwitterIcon /></a>
            <a href="#" aria-label="YouTube"><YouTubeIcon /></a>
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
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
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
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};
