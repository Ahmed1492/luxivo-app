import axios from "axios";
import "./Laptops.scss";
import { useEffect, useState } from "react";
import { ProductCard } from "../productCard/ProductCard";
import { SkeletonCard } from "../skeleton/SkeletonCard";

export const Laptops = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("https://dummyjson.com/products/category/laptops")
      .then(res => {
        const shuffled = [...res.data.products].sort(() => Math.random() - 0.5).slice(0, 5);
        setProducts(shuffled);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="laptops">
      <div className="allCards spaceX">
        {loading ? <SkeletonCard count={5} /> : products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};
