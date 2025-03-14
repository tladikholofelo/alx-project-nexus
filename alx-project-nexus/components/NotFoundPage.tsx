import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-extrabold text-blue-500 tracking-tight mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Oops! The page you're looking for could not be found.</h2>
      <p className="text-gray-600 mb-8">
        Maybe it went out of stock? Or perhaps it's just taking a little fashion break.
      </p>
      <div className="flex space-x-4">
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all">
            Go Back Home
          </button>
        </Link>
        <Link href="/shop-now">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-all">
            Continue Shopping
          </button>
        </Link>
      </div>
      <div className="mt-12 text-center text-gray-500">
        <p>Feeling lost? Our style advisors are always here to help!</p>
        {/* You could add a link to a contact page or support here */}
      </div>
    </div>
  );
};

export default NotFoundPage;