import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./SearchResults.scss";
import { ProductCard } from "../../Component/productCard/ProductCard";
import { SkeletonCard } from "../../Component/skeleton/SkeletonCard";
import { Footer } from "../../Component/footer/Footer";
import SearchIcon from "@mui/icons-material/Search";

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [total, setTotal]       = useState(0);

  useEffect(() => {
    if (!query.trim()) return;
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=30`)
      .then(res => { setProducts(res.data.products); setTotal(res.data.total); })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="search-page">
      <div className="search-hero spaceX">
        <div className="search-hero-inner">
          <SearchIcon />
          <div>
            <h1>Search results for <span>"{query}"</span></h1>
            {!loading && <p>{total} product{total !== 1 ? "s" : ""} found</p>}
          </div>
        </div>
      </div>

      <div className="search-grid spaceX">
        {loading ? (
          <SkeletonCard count={10} />
        ) : products.length === 0 ? (
          <div className="search-empty">
            <SearchIcon className="empty-icon" />
            <h2>No results for "{query}"</h2>
            <p>Try a different keyword or browse our categories.</p>
          </div>
        ) : (
          products.map(p => <ProductCard key={p.id} product={p} />)
        )}
      </div>

      <Footer />
    </div>
  );
};
