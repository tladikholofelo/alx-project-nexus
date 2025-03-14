import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { setCart } from "@/src/store/cartSlice";
import { useEffect, useState } from "react";
import { FaSearch, FaBell, FaUserAlt, FaBars, FaTimes, FaHome, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  // Redux dispatch to update the cart state
  const dispatch = useDispatch();
  // Select cart items from the Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  // State for toggling mobile menu visibility
  const [menuOpen, setMenuOpen] = useState(false);
  
  // State for toggling side menu visibility (hamburger menu)
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  // useEffect hook to load cart items from localStorage when the component mounts
  useEffect(() => {
    // Ensure component only renders in the browser to avoid hydration issues
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");

      if (storedCart) {
        try {
          // Parse the cart data from localStorage
          const parsedCart = JSON.parse(storedCart);
          // If the parsed data is an array, dispatch it to the Redux store
          if (Array.isArray(parsedCart)) {
            dispatch(setCart(parsedCart));
          }
        } catch (error) {
          console.error("Error parsing stored cart:", error);
        }
      }
    }
  }, [dispatch]);

  // Function to toggle mobile menu visibility
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Function to toggle side menu (hamburger menu) visibility
  const toggleSideMenu = () => setSideMenuOpen(!sideMenuOpen);

  return (
    <>
      <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between max-w-5xl relative">
          {/* Logo Link */}
          <Link href="/" className="text-2xl font-bold text-black-600 hover:text-blue-700 transition duration-300 ease-in-out tracking-tight">
            EcomFlex
          </Link>

          {/* Mobile Menu Icons */}
          <div className="lg:hidden flex items-center gap-4 ml-auto">
            {/* Search Icon */}
            <FaSearch size={24} />

            {/* Notification Icon with a Badge */}
            <button className="relative" aria-label="Notifications">
              <FaBell size={24} />
              <div className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">5</div>
            </button>

            {/* Cart Icon with Item Count Badge */}
            <Link href="/cart" className="relative hover:text-blue-500">
              <FaShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-4 text-sm ml-auto">
            {/* Search Bar */}
            <div className="relative flex items-center gap-4 ml-6">
              <input
                type="text"
                className="pl-12 pr-4 py-2 rounded-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm hidden lg:block"
                placeholder="What are you looking for?"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hidden lg:block" />
            </div>

            {/* User Profile Icon with Notification Badge */}
            <button className="relative" aria-label="User profile">
              <FaUserAlt size={24} />
              <div className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">3</div>
            </button>

            {/* Notifications Bell Icon */}
            <button className="relative hidden lg:block" aria-label="Notifications">
              <FaBell size={24} />
              <div className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">5</div>
            </button>

            {/* Cart Link with Item Count Badge */}
            <Link href="/cart" className="relative hover:text-blue-500 hidden lg:block">
              🛒 Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Subcategory Bar (Hidden on Mobile) */}
      <div className="bg-gray-200 shadow-md sticky top-16 z-40 hidden lg:block">
        <div className="container mx-auto flex justify-between items-center max-w-5xl py-2 text-sm">
          <div className="flex gap-6">
            {/* Links for different categories */}
            <Link href="/shop-now" className="hover:text-blue-500 text-sm">Shop Everything</Link>
            <Link href="/shop-now?category=electronics" className="hover:text-blue-500 text-sm">Electronics</Link>
            <Link href="/shop-now?category=jewelery" className="hover:text-blue-500 text-sm">Jewelery</Link>
            <Link href="/shop-now?category=men's clothing" className="hover:text-blue-500 text-sm">Men's Clothing</Link>
            <Link href="/shop-now?category=women's clothing" className="hover:text-blue-500 text-sm">Women's Clothing</Link>
          </div>
          <div className="flex gap-6">
            {/* Store locator and order tracking links */}
            <Link href="/404-page" className="text-sm hover:text-blue-500">Store Locator</Link>
            <Link href="/404-page" className="text-sm hover:text-blue-500">Order Tracking</Link>
          </div>
        </div>
      </div>

      {/* Bottom Navbar for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 rounded-t-3xl">
        <div className="flex justify-around items-center p-3">
          {/* Home Link */}
          <Link href="/" className="text-center flex flex-col items-center">
            <FaHome size={24} />
            <span className="text-xs">Home</span>
          </Link>

          {/* Categories Button as a Large Circle */}
          <button
            onClick={toggleSideMenu}
            className="w-16 h-16 bg-blue-600 text-white rounded-full flex justify-center items-center shadow-2xl transform transition hover:scale-110 absolute left-1/2 transform -translate-x-1/2 -top-8"
            aria-label="Categories"
          >
            <FaBars size={24} />
          </button>

          {/* Profile Link */}
          <Link href="/profile" className="text-center flex flex-col items-center">
            <FaUserAlt size={24} />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>

      {/* Slide-Out Categories Menu */}
      {sideMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 flex justify-end">
          <div className="w-64 bg-white h-full p-4">
            <div className="flex justify-end">
              <button onClick={toggleSideMenu} aria-label="Close Menu">
                <FaTimes size={24} />
              </button>
            </div>
            <ul className="space-y-4">
              {/* Category links in the side menu */}
              <li><Link href="/shop-now?category=electronics" className="text-sm hover:text-blue-500">Electronics</Link></li>
              <li><Link href="/shop-now?category=jewelery" className="text-sm hover:text-blue-500">Jewelery</Link></li>
              <li><Link href="/shop-now?category=men's clothing" className="text-sm hover:text-blue-500">Men's Clothing</Link></li>
              <li><Link href="/shop-now?category=women's clothing" className="text-sm hover:text-blue-500">Women's Clothing</Link></li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
