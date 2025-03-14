import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      <div className="text-center max-w-5xl w-full px-4">
        {/* Bold 404 with a fun design */}
        <h1 className="text-7xl font-extrabold text-blue-600 tracking-tight mb-6">
          Oops! 404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Looks like the page you're looking for is on vacation!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          It might have sold out, taken a break, or simply disappeared in the wild world of the web.
        </p>

        {/* Button Container */}
        <div className="flex justify-center space-x-6 mb-8">
          {/* Go back home button */}
          <Link href="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              Back to Home
            </button>
          </Link>
          {/* Continue shopping button */}
          <Link href="/shop-now">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              Continue Shopping
            </button>
          </Link>
        </div>

        {/* Fun suggestion */}
        <div className="mt-12 text-center text-gray-500">
          <p className="text-sm">
            Need assistance? Our fashion experts are just a click away!
          </p>
          {/* Optional: You can link to your contact/support page */}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
