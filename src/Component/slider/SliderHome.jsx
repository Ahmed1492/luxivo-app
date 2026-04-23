import "./SliderHome.scss";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";

const SLIDES = [
  {
    id: 1,
    badge: "New Season",
    title: "Discover the Latest\nSmartphones",
    subtitle: "Cutting-edge tech at unbeatable prices. Shop the newest arrivals.",
    cta: "Shop Smartphones",
    link: "/category/smartphones",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    accent: "#ff5722",
    category: "smartphones",
    tag: "Up to 30% OFF",
  },
  {
    id: 2,
    badge: "Best Sellers",
    title: "Premium Laptops\nFor Every Need",
    subtitle: "From gaming rigs to ultrabooks — find your perfect machine.",
    cta: "Shop Laptops",
    link: "/category/laptops",
    bg: "linear-gradient(135deg, #0d2137 0%, #1b4f72 60%, #2e86c1 100%)",
    accent: "#ffa726",
    category: "laptops",
    tag: "Free Shipping",
  },
  {
    id: 3,
    badge: "Trending Now",
    title: "Luxury Fragrances\nFor Every Occasion",
    subtitle: "Explore our curated collection of world-class scents.",
    cta: "Shop Fragrances",
    link: "/category/fragrances",
    bg: "linear-gradient(135deg, #2d1b4e 0%, #6a1b9a 60%, #ab47bc 100%)",
    accent: "#f48fb1",
    category: "fragrances",
    tag: "Exclusive Deals",
  },
  {
    id: 4,
    badge: "Flash Sale",
    title: "Skincare That\nActually Works",
    subtitle: "Science-backed formulas trusted by millions worldwide.",
    cta: "Shop Skincare",
    link: "/category/skin-care",
    bg: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 60%, #52b788 100%)",
    accent: "#a8edea",
    category: "skin-care",
    tag: "Save 25%",
  },
];

export const SliderHome = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const [slides, setSlides] = useState(SLIDES.map(s => ({ ...s, image: "" })));

  // Fetch one real product image per category
  useEffect(() => {
    SLIDES.forEach((slide, i) => {
      axios.get(`https://dummyjson.com/products/category/${slide.category}?limit=1`)
        .then(res => {
          const img = res.data.products[0]?.images[0];
          if (img) {
            setSlides(prev => prev.map((s, idx) => idx === i ? { ...s, image: img } : s));
          }
        })
        .catch(() => {});
    });
  }, []);

  const goTo = useCallback((idx, dir = "next") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 400);
  }, [animating]);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length, "next"), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length, "prev"), [current, goTo]);

  // Auto-play
  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <div className="hero-slider">
      <div
        className={`hero-slide ${animating ? `exit-${direction}` : "enter"}`}
        style={{ background: slide.bg }}
      >
        {/* Content */}
        <div className="hero-content spaceX">
          <div className="hero-text">
            <div className="hero-badge" style={{ background: slide.accent + "22", color: slide.accent, border: `1px solid ${slide.accent}44` }}>
              {slide.badge}
            </div>
            <h1 className="hero-title">
              {slide.title.split("\n").map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h1>
            <p className="hero-subtitle">{slide.subtitle}</p>
            <div className="hero-actions">
              <Link to={slide.link} className="hero-cta" style={{ background: slide.accent }}>
                {slide.cta} <ArrowForwardIcon />
              </Link>
              <span className="hero-tag" style={{ color: slide.accent }}>
                🏷 {slide.tag}
              </span>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-img-glow" style={{ background: slide.accent + "33" }} />
            {slide.image
              ? <img src={slide.image} alt={slide.title} />
              : <div className="hero-img-placeholder" />
            }
          </div>
        </div>

        {/* Overlay pattern */}
        <div className="hero-pattern" />
      </div>

      {/* Arrows */}
      <button className="slider-arrow slider-prev" onClick={prev}>
        <ArrowBackIosNewIcon />
      </button>
      <button className="slider-arrow slider-next" onClick={next}>
        <ArrowForwardIosIcon />
      </button>

      {/* Dots */}
      <div className="slider-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slider-dot ${i === current ? "active" : ""}`}
            onClick={() => goTo(i, i > current ? "next" : "prev")}
            style={i === current ? { background: slides[i].accent, width: 28 } : {}}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="slider-progress">
        <div
          key={current}
          className="slider-progress-bar"
          style={{ background: slide.accent }}
        />
      </div>
    </div>
  );
};
