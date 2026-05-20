import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const isLogin =
    localStorage.getItem("isAdminLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 text-white shadow-2xl">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LEFT LOGO */}
        <div>
          <h1 className="text-3xl font-extrabold">
            🎓 MMDC Academy
          </h1>
        </div>

        {/* CENTER MENU */}
        <nav className="flex gap-8 text-lg font-semibold">

          <Link
            to="/"
            className="hover:text-yellow-300 duration-300"
          >
            Home
          </Link>
          <Link
            to="/student-portal"
            className="hover:text-yellow-300 duration-300">
           Student Portal
         </Link>

          <Link
            to="/materials"
            className="hover:text-yellow-300 duration-300"
          >
            Helping Material
          </Link>

        </nav>

        {/* RIGHT AUTH */}
        <div className="flex gap-4 items-center">

          {!isLogin ? (
            <Link
              to="/auth"
              className="bg-white text-blue-700 px-4 py-2 rounded-xl font-bold hover:bg-gray-200"
            >
              Admin Login
            </Link>
          ) : (
            <>
              <Link
                to="/admin"
                className="hover:text-yellow-300 font-semibold"
              >
                Admin
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-xl font-bold hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </header>
  );
};

export default Header;