import "./SellerCenter.scss";
import { Link } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Footer } from "../../Component/footer/Footer";

const stats = [
  { icon: <PeopleOutlineIcon />, value: "2M+", label: "Active Buyers" },
  { icon: <StorefrontIcon />,    value: "50K+", label: "Sellers" },
  { icon: <InventoryOutlinedIcon />, value: "5M+", label: "Products Listed" },
  { icon: <PaymentsOutlinedIcon />,  value: "$120M+", label: "Monthly GMV" },
];

const features = [
  {
    icon: <StorefrontIcon />,
    title: "Easy Store Setup",
    desc: "Launch your store in minutes with our guided onboarding. No technical skills needed.",
  },
  {
    icon: <TrendingUpIcon />,
    title: "Powerful Analytics",
    desc: "Track sales, traffic, and conversion rates with real-time dashboards.",
  },
  {
    icon: <PaymentsOutlinedIcon />,
    title: "Fast Payouts",
    desc: "Get paid within 3 business days. Multiple withdrawal methods supported.",
  },
  {
    icon: <BarChartIcon />,
    title: "Marketing Tools",
    desc: "Run promotions, flash sales, and vouchers to boost your visibility.",
  },
  {
    icon: <InventoryOutlinedIcon />,
    title: "Inventory Management",
    desc: "Manage stock levels, variants, and bulk uploads with ease.",
  },
  {
    icon: <PeopleOutlineIcon />,
    title: "Seller Support",
    desc: "Dedicated account managers and 24/7 live chat support for all sellers.",
  },
];

const steps = [
  { num: "01", title: "Create Account", desc: "Sign up for free and verify your identity." },
  { num: "02", title: "Set Up Your Store", desc: "Add your logo, banner, and store description." },
  { num: "03", title: "List Products", desc: "Upload products with photos, prices, and details." },
  { num: "04", title: "Start Selling", desc: "Go live and start receiving orders from day one." },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    features: ["Up to 50 products", "Basic analytics", "Standard support", "5% commission"],
    highlight: false,
  },
  {
    name: "Growth",
    price: "$29",
    period: "/mo",
    features: ["Unlimited products", "Advanced analytics", "Priority support", "3% commission", "Marketing tools"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/mo",
    features: ["Everything in Growth", "Dedicated manager", "Custom integrations", "1.5% commission", "API access"],
    highlight: false,
  },
];

export const SellerCenter = () => {
  return (
    <div className="seller-page">
      {/* Hero */}
      <div className="seller-hero">
        <div className="hero-content">
          <div className="hero-badge"><StorefrontIcon /> Seller Center</div>
          <h1>Grow Your Business<br />with <span>SnapUp</span></h1>
          <p>Join thousands of sellers reaching millions of buyers every day. Start for free, scale without limits.</p>
          <div className="hero-cta">
            <Link to="/register" className="cta-primary">Start Selling Free <ArrowForwardIcon /></Link>
            <a href="#how-it-works" className="cta-secondary">See How It Works</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hc-row">
              <span className="hc-label">Today's Revenue</span>
              <span className="hc-badge green">+12.4%</span>
            </div>
            <p className="hc-value">$4,820.00</p>
            <div className="hc-bars">
              {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                <div key={i} className="hc-bar" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="hc-row mt">
              <span className="hc-label">Orders</span>
              <span className="hc-num">128</span>
            </div>
            <div className="hc-row">
              <span className="hc-label">Conversion</span>
              <span className="hc-num">3.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="seller-stats spaceX">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon">{s.icon}</div>
            <p className="stat-value">{s.value}</p>
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="seller-features spaceX">
        <div className="section-header">
          <h2>Everything You Need to Succeed</h2>
          <p>Powerful tools built for sellers of all sizes</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="how-it-works" id="how-it-works">
        <div className="spaceX">
          <div className="section-header light">
            <h2>How It Works</h2>
            <p>Get started in 4 simple steps</p>
          </div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={i} className="step-card">
                <div className="step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="seller-pricing spaceX">
        <div className="section-header">
          <h2>Simple, Transparent Pricing</h2>
          <p>No hidden fees. Cancel anytime.</p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <div key={i} className={`pricing-card ${plan.highlight ? "highlight" : ""}`}>
              {plan.highlight && <div className="popular-badge">Most Popular</div>}
              <h3>{plan.name}</h3>
              <div className="plan-price">
                <span className="price-val">{plan.price}</span>
                <span className="price-period">{plan.period}</span>
              </div>
              <ul>
                {plan.features.map((f, j) => (
                  <li key={j}><CheckCircleOutlineIcon /> {f}</li>
                ))}
              </ul>
              <button className={`plan-btn ${plan.highlight ? "plan-btn-primary" : ""}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="seller-cta-banner spaceX">
        <h2>Ready to start selling?</h2>
        <p>Join 50,000+ sellers already growing on SnapUp</p>
        <Link to="/register" className="cta-primary">
          Create Your Store <ArrowForwardIcon />
        </Link>
      </div>
      <Footer />
    </div>
  );
};
