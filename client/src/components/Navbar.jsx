import { Link } from "react-router-dom";
export default function Navbar() {
  //TODO: fetch real user data
  const user = true;
  const cart = [""];
  const isAdmin = true;
  return (
    <header className="fixed top-0 left-0 w-full  backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-gray-500">
      <div className="container mx-auto px-2 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-primary-500 items-center space-x-2 flex"
          >
            Woolpaka
          </Link>
          <nav className="flex flex-wrap items-center gap-4 justify-end">
            {isAdmin && (
              <Link
                to={"/"}
                className="flex relative group border rounded-full px-2 py-1 text-sm gap-1 text-gray-500 hover:text-primary-500 transition duration-300 
							ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
                <span className="hidden sm:inline">Admin Dashboard</span>
              </Link>
            )}
            <Link
              to={"/"}
              className="relative group text-gray-700 hover:text-primary-500 transition duration-300 
							ease-in-out"
            >
              Home
            </Link>
            {user && (
              <Link to={"/cart"} className="relative group flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>

                {cart.length > 0 && (
                  <span
                    className="absolute -top-2 -left-2 bg-primary-500 text-white rounded-full px-2 py-0.5 
							text-xs group-hover:bg-primary-700 transition duration-300 ease-in-out"
                  >
                    {/* {cart.length} */}3
                  </span>
                )}
                <span className="hidden sm:inline">Cart</span>
              </Link>
            )}
            {user ? (
              <button
                to={"/logout"}
                className="border rounded-full px-2 py-1 flex items-center gap-1 cursor-pointer bg-primary-500 hover:bg-primary-700 text-white transition duration-300 
							ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
                <span className="hidden sm:inline">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="border rounded-full px-2 py-1 flex items-center gap-1 cursor-pointer bg-primary-500 hover:bg-primary-700 text-white transition duration-300 
							ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                    />
                  </svg>
                  Sign Up
                </Link>

                <Link
                  to={"/login"}
                  className="border rounded-full px-2 py-1 flex items-center gap-1 cursor-pointer bg-primary-500 hover:bg-primary-700 text-white transition duration-300 
							ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
