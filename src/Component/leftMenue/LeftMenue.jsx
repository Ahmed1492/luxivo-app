import { Link, NavLink, useNavigate } from "react-router-dom";
import "./LeftMenue.scss";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import GridViewIcon from "@mui/icons-material/GridView";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import axios from "axios";

export const LeftMenue = ({ setIsOpenedMenue, isOpenedMenue }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const getAllCategories = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products/category-list");
      setAllCategories(res.data);
    } catch (e) { console.log(e); }
  };

  useEffect(() => { getAllCategories(); }, []);

  const filtered = allCategories.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const formatName = (cat) =>
    cat.replace(/-/g, " ").replace(/\b\w/g, m => m.toUpperCase());

  const handleClose = () => setIsOpenedMenue(false);

  const handleLinkClick = () => {
    handleClose();
    setSearch("");
  };

  return (
    <>
      {/* Backdrop */}
      {isOpenedMenue && (
        <div className="leftMenue-backdrop" onClick={handleClose} />
      )}

      <div className={`leftMenue ${isOpenedMenue ? "open" : ""}`}>
        {/* Header */}
        <div className="lm-header">
          <div className="lm-header-brand">
            <GridViewIcon />
            <span>All Categories</span>
          </div>
          <button className="lm-close" onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>

        {/* Search */}
        <div className="lm-search">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search categories…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="lm-search-clear" onClick={() => setSearch("")}>
              <CloseIcon />
            </button>
          )}
        </div>

        {/* Count */}
        <p className="lm-count">
          {filtered.length} {filtered.length === 1 ? "category" : "categories"}
        </p>

        {/* List */}
        <div className="lm-list">
          {filtered.length === 0 ? (
            <div className="lm-empty">No categories found</div>
          ) : (
            filtered.map((cat, i) => (
              <NavLink
                key={i}
                to={`/category/${cat}`}
                className={({ isActive }) => `lm-item${isActive ? " lm-item-active" : ""}`}
                onClick={handleLinkClick}
              >
                <span className="lm-item-dot" />
                <span className="lm-item-name">{formatName(cat)}</span>
                <ChevronRightIcon className="lm-item-arrow" />
              </NavLink>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="lm-footer">
          <Link to="/" className="lm-all-btn" onClick={handleLinkClick}>
            View All Products
          </Link>
        </div>
      </div>
    </>
  );
};
