import "./NotFound.scss";
import { Link } from "react-router-dom";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

export const NotFound = () => {
  return (
    <div className="not-found">
      <div className="nf-content">
        <div className="nf-code">404</div>
        <SentimentDissatisfiedIcon className="nf-icon" />
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="nf-btn">Back to Home</Link>
      </div>
    </div>
  );
};
