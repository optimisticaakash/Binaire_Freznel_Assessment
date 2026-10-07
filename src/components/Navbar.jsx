import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <>
      <header className="bg-[#171d25]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
          <div className="flex items-center gap-10">
            <Link to="/" className="text-3xl font-bold tracking-wide">
              🎬 <span className="text-gray-200">MOVIE</span>
              <span className="text-[#66c0f4]">STORE</span>
            </Link>

            <nav className="flex gap-7 text-base font-semibold">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-[#1a9fff] pb-1 text-[#66c0f4]"
                    : "text-gray-300 hover:text-[#66c0f4]"
                }
              >
                STORE
              </NavLink>

              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-[#1a9fff] pb-1 text-[#66c0f4]"
                    : "text-gray-300 hover:text-[#66c0f4]"
                }
              >
                EXPLORE
              </NavLink>

              <a
                href="#"
                className="text-gray-300 transition hover:text-[#66c0f4]"
              >
                ABOUT
              </a>

              <a
                href="#"
                className="text-gray-300 transition hover:text-[#66c0f4]"
              >
                SUPPORT
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-[#75a113] px-4 py-2 text-sm font-semibold transition hover:bg-[#8bc21a] active:scale-95">
              Install App
            </button>

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  {user.email}
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm text-gray-400 hover:text-white"
              >
                Sign in
              </Link>
            )}

            <span className="text-gray-600">|</span>

            <span className="cursor-pointer text-sm text-gray-400 hover:text-white">
              English ▾
            </span>
          </div>
        </div>
      </header>

      <div className="bg-[#1a2b3d]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <nav className="flex gap-8 text-sm text-gray-200">
            <a href="#" className="hover:text-[#66c0f4]">
              Browse
            </a>

            <a href="#" className="hover:text-[#66c0f4]">
              Recommendations
            </a>

            <a href="#" className="hover:text-[#66c0f4]">
              Genres
            </a>

            <Link to="/explore" className="hover:text-[#66c0f4]">
              New Releases
            </Link>

            <a href="#" className="hover:text-[#66c0f4]">
              Top Rated
            </a>
          </nav>

          <div className="flex focus-within:ring-2 focus-within:ring-[#66c0f4]">
            <input
              type="text"
              aria-label="Search movies"
              placeholder="Search movies"
              className="w-72 bg-[#32465a] px-4 py-2 text-white outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#66c0f4]"
            />

            <button
              className="bg-[#1a9fff] px-5 transition hover:bg-[#66bfff] active:scale-95 focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Search movies"
            >
              🔍
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
