import axios from "axios";
import "./Fragrances.scss";
import { useEffect, useState } from "react";
import { ProductCard } from "../productCard/ProductCard";
import { SkeletonCard } from "../skeleton/SkeletonCard";

export const Fragrances = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("https://dummyjson.com/products/category/fragrances")
      .then(res => {
        const shuffled = [...res.data.products].sort(() => Math.random() - 0.5).slice(0, 5);
        setProducts(shuffled);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="fragrances">
      <div className="allCards spaceX">
        {loading ? <SkeletonCard count={5} /> : products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};
