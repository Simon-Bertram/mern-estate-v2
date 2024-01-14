import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="block text-center py-4">
          <h1 className="font-bold text-sm sm:text-xl flex flext-wrap">
            <span className="text-slate-500">MERN</span>
            <span className="text-slate-800">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 flex items-center px-3 py-2 rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500" />
        </form>
        <nav>
          <ul className="flex gap-4 items-center">
            <Link to="/" className="block text-center py-4">
              <li className="hidden sm:inline hover:underline underline-offset-4 text-slate-700">
                Home
              </li>
            </Link>
            <Link to="/about" className="block text-center py-4">
              <li className="hidden sm:inline hover:underline underline-offset-4 text-slate-700">
                About
              </li>
            </Link>
            <li className=" sm:inline hover:underline underline-offset-4 text-slate-700">
              <Link to="/sign-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 hover:text-green-500 transition duration-150 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
