import "./SkeletonCard.scss";

export const SkeletonCard = ({ count = 5 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="sk-image shimmer" />
          <div className="sk-body">
            <div className="sk-line shimmer" style={{ width: "60%" }} />
            <div className="sk-line shimmer" style={{ width: "90%" }} />
            <div className="sk-line shimmer" style={{ width: "75%" }} />
            <div className="sk-price shimmer" />
          </div>
        </div>
      ))}
    </>
  );
};
