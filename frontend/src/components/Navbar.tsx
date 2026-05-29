import { useState } from "react";
import { MapPin, Menu, User, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const role = user?.role;

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">

      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-12">

        {/* LOGO */}
        <h1 className="cursor-pointer bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] bg-clip-text text-lg font-bold text-transparent sm:text-xl lg:text-2xl">
          BookMyMoviè
        </h1>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-5 xl:gap-6 text-sm font-medium text-[#6B6B7E] lg:flex">
          <Link
            to="/movies"
            className="transition-colors hover:text-[#1A1A2E]"
          >
            Movies
          </Link>

          {role === "user" && (
            <Link
              to="/mybookings"
              className="transition-colors hover:text-[#1A1A2E]"
            >
              My Bookings
            </Link>
          )}

          {role === "movie-owner" && (
            <Link
              to="/addmovie"
              className="transition-colors hover:text-[#1A1A2E]"
            >
              Add Movie
            </Link>
          )}

          {role === "theatre-owner" && (
            <>
              <Link
                to="/theatres"
                className="transition-colors hover:text-[#1A1A2E]"
              >
                Theatres
              </Link>

              <Link
                to="/addtheatre"
                className="transition-colors hover:text-[#1A1A2E]"
              >
                Add Theatre
              </Link>
            </>
          )}
        </div>

        {/* DESKTOP RIGHT */}
        <div className="hidden items-center gap-3 lg:flex">

          <div className="flex items-center gap-2 rounded-lg border border-white/70 bg-white/80 px-3 py-2 text-sm shadow-sm">
            <MapPin size={14} />
            <span>Hyderabad</span>
          </div>

          <div className="flex max-w-[180px] items-center gap-2 rounded-lg border border-white/70 bg-white/80 px-3 py-2 text-sm shadow-sm">
            <User size={14} />
            <span className="truncate">{user?.username}</span>
          </div>

          <button
            onClick={handleLogout}
            className="cursor-pointer rounded-lg bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] px-4 py-2 text-sm font-medium text-white shadow-md transition hover:opacity-95"
          >
            Logout
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="text-[#1A1A2E] lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t border-white/40 bg-white/90 backdrop-blur-xl lg:hidden">

          <div className="flex flex-col gap-4 px-4 py-5 text-sm text-[#6B6B7E]">

            <Link
              to="/movies"
              onClick={() => setOpen(false)}
              className="transition-colors hover:text-[#1A1A2E]"
            >
              Movies
            </Link>

            {role === "user" && (
              <Link
                to="/mybookings"
                onClick={() => setOpen(false)}
                className="transition-colors hover:text-[#1A1A2E]"
              >
                My Bookings
              </Link>
            )}

            {role === "movie-owner" && (
              <Link
                to="/addmovie"
                onClick={() => setOpen(false)}
                className="transition-colors hover:text-[#1A1A2E]"
              >
                Add Movie
              </Link>
            )}

            {role === "theatre-owner" && (
              <>
                <Link
                  to="/theatres"
                  onClick={() => setOpen(false)}
                  className="transition-colors hover:text-[#1A1A2E]"
                >
                  Theatres
                </Link>

                <Link
                  to="/addtheatre"
                  onClick={() => setOpen(false)}
                  className="transition-colors hover:text-[#1A1A2E]"
                >
                  Add Theatre
                </Link>
              </>
            )}

            <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/70 bg-white px-3 py-2 text-sm shadow-sm">
              <MapPin size={14} />
              <span>Hyderabad</span>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-white/70 bg-white px-3 py-2 text-sm shadow-sm">
              <User size={14} />
              <span className="truncate">{user?.username}</span>
            </div>

            <button
              onClick={handleLogout}
              className="mt-2 rounded-lg bg-gradient-to-r from-[#6D5EF5] to-[#8B5CF6] px-4 py-2.5 text-sm font-medium text-white shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}