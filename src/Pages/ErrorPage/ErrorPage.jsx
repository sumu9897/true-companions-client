import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold text-indigo-200 mb-4">
          {error?.status || "404"}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {error?.status === 404 ? "Page Not Found" : "Something Went Wrong"}
        </h1>
        <p className="text-gray-500 mb-8">
          {error?.statusText ||
            error?.message ||
            "The page you're looking for doesn't exist or has been moved."}
        </p>
        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;