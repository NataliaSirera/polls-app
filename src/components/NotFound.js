import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="px-8 flex h-screen">
      <div className="m-auto">
        <div className="flex">
          <h1 className="text-5xl font-bold">404</h1>
          <div className="flex-1 pl-4">
            <div className="border-l pl-4 border-gray-300">
              <p className="text-3xl font-medium mb-2">Page not found</p>
              <p className="mb-2 text-gray-600">
                Please check the URL in the address bar and try again
              </p>
            </div>
            <div className="pl-4">
              <Link to="/">
                <button className="inline-block px-6 py-2.5 mt-4 bg-blue-600 text-white font-medium rounded shadow-md">
                  Go back home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
