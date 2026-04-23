import { useParams } from "react-router-dom";
import "./SingleCategory.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { TitleOfCategories } from "../../Component/titleOfCategories/TitleOfCategories";
import { ProductCard } from "../../Component/productCard/ProductCard";
import { SkeletonCard } from "../../Component/skeleton/SkeletonCard";
import { Footer } from "../../Component/footer/Footer";

export const SingleCategory = ({ url }) => {
  const param = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryName = param.name;
  const formattedCategory = categoryName
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());

  useEffect(() => {
    setLoading(true);
    axios.get(url + categoryName)
      .then(res => setAllProducts(res.data.products))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [categoryName, url]);

  return (
    <div className="allProductCategory">
      <TitleOfCategories title={`SEE OUR ${formattedCategory}`} />
      <div className="allCards spaceX category-grid">
        {loading
          ? <SkeletonCard count={8} />
          : allProducts.map(p => <ProductCard key={p.id} product={p} />)
        }
      </div>
      <Footer />
    </div>
  );
};
