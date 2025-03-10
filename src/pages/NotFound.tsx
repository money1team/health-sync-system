
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-2">
          <div>
            <Link to="/" className="text-blue-500 hover:text-blue-700 underline block">
              Return to Patient Portal
            </Link>
          </div>
          <div>
            <Link to="/staff" className="text-blue-500 hover:text-blue-700 underline block">
              Go to Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
