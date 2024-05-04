import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="text-center error-div pt-5">
      <h1 className="display-2 text-white pt-5">404 — Location not found :(</h1>
      <p className="lead text-white">We couldn't find what you were looking for.</p>
      <Link to="/" className="btn btn-outline-light">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
