import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <Link to="/" className="home-link">
         Go back Home
      </Link>
    </div>
  );
}

export default NotFound;